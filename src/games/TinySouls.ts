// Level configuration
interface LevelConfig {
  enemyHealth: number;
  enemyDamage: number;
  enemyAttackCooldown: number;
  enemyName: string;
  enemyColor: string;
}

const LEVEL_CONFIGS: LevelConfig[] = [
  { enemyHealth: 100, enemyDamage: 10, enemyAttackCooldown: 2500, enemyName: "Shadow Warrior", enemyColor: "#8B4513" }, // Level 1 - Brown
  { enemyHealth: 120, enemyDamage: 12, enemyAttackCooldown: 2200, enemyName: "Crimson Blade", enemyColor: "#DC143C" }, // Level 2 - Crimson
  { enemyHealth: 150, enemyDamage: 15, enemyAttackCooldown: 2000, enemyName: "Void Knight", enemyColor: "#4B0082" }, // Level 3 - Indigo
  { enemyHealth: 180, enemyDamage: 18, enemyAttackCooldown: 1800, enemyName: "Frost Wraith", enemyColor: "#00CED1" }, // Level 4 - Dark Turquoise
  { enemyHealth: 200, enemyDamage: 20, enemyAttackCooldown: 1500, enemyName: "Soul Reaper", enemyColor: "#FF1493" }, // Level 5 - Deep Pink
];

export class TinySouls {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationFrameId: number | null = null;
  private isRunning: boolean = false;

  // Game state
  private playerHealth: number = 100;
  private enemyHealth: number = 100;
  private maxHealth: number = 100;
  private currentLevel: number = 1;
  private levelCompleteTimer: number = 0;

  // Player state
  private playerX: number = 150;
  private playerY: number = 300;
  private playerWidth: number = 60;
  private playerHeight: number = 80;
  private isPlayerBlocking: boolean = false;
  private playerAttackCooldown: number = 0;
  private playerBlockCooldown: number = 0;
  
  // Player spear animation
  private playerSpearX: number = 0; // Spear position X
  private playerSpearY: number = 0; // Spear position Y
  private playerSpearProgress: number = 0; // 0-1, 0 = idle, 1 = complete
  private playerSpearDuration: number = 400; // milliseconds
  private playerSpearTimer: number = 0;
  private playerSpearBaseX: number = 0; // Base position when idle

  // Enemy state
  private enemyX: number = 0; // Will be set in resize()
  private enemyY: number = 300;
  private enemyWidth: number = 60;
  private enemyHeight: number = 80;
  private enemyAttackTimer: number = 0;
  private enemyAttackCooldown: number = 2000;
  private isEnemyAttacking: boolean = false;
  private enemyAttackDuration: number = 0;
  private enemyStunTimer: number = 0;
  
  // Enemy spear animation
  private enemySpearX: number = 0; // Spear position X
  private enemySpearY: number = 0; // Spear position Y
  private enemySpearProgress: number = 0; // 0-1, 0 = idle, 1 = complete
  private enemyAttackTotalDuration: number = 1000; // milliseconds
  private enemySpearBaseX: number = 0; // Base position when idle
  
  // Perfect block state
  private perfectBlockActive: boolean = false;
  private perfectBlockTimer: number = 0;
  private perfectBlockDuration: number = 500; // milliseconds
  private perfectBlockParticles: Array<{ x: number; y: number; vx: number; vy: number; life: number }> = [];
  private wasCtrlHeld: boolean = false; // Track if Ctrl was already held
  private perfectBlockAttempted: boolean = false; // Track if perfect block was attempted on current attack

  // Visual effects
  private attackEffects: Array<{
    x: number;
    y: number;
    type: "player" | "enemy";
    duration: number;
  }> = [];

  // Keyboard state
  private keys: Set<string> = new Set();

  // Game status
  private gameStatus: "playing" | "levelComplete" | "playerWon" | "enemyWon" = "playing";

  // Event handlers for cleanup
  private resizeHandler: () => void;
  private keydownHandler: (e: KeyboardEvent) => void;
  private keyupHandler: (e: KeyboardEvent) => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not get 2d context from canvas");
    }
    this.ctx = context;

    // Set up event handlers
    this.resizeHandler = () => this.resize();
    this.keydownHandler = (e: KeyboardEvent) => {
      this.keys.add(e.code);
      if (e.code === "Space") {
        e.preventDefault();
        this.handlePlayerAttack();
      }
      if (e.code === "ControlLeft" || e.code === "ControlRight") {
        e.preventDefault();
        // Check if this is a new press (not already held)
        const isNewPress = !this.wasCtrlHeld;
        this.wasCtrlHeld = true;
        this.handlePlayerBlock();
        // Only check for perfect block on initial press, not while holding
        if (isNewPress) {
          this.checkPerfectBlockOnPress();
        }
      }
    };
    this.keyupHandler = (e: KeyboardEvent) => {
      this.keys.delete(e.code);
      if (e.code === "ControlLeft" || e.code === "ControlRight") {
        this.isPlayerBlocking = false;
        this.wasCtrlHeld = false;
      }
    };

    // Set canvas size
    this.resize();
    window.addEventListener("resize", this.resizeHandler);

    // Keyboard event listeners
    window.addEventListener("keydown", this.keydownHandler);
    window.addEventListener("keyup", this.keyupHandler);

    // Initialize level
    this.initializeLevel();
  }

  private getCurrentLevelConfig(): LevelConfig {
    const levelIndex = Math.min(this.currentLevel - 1, LEVEL_CONFIGS.length - 1);
    return LEVEL_CONFIGS[levelIndex];
  }

  private initializeLevel(): void {
    const config = this.getCurrentLevelConfig();
    this.enemyHealth = config.enemyHealth;
    this.maxHealth = config.enemyHealth;
    this.enemyAttackCooldown = config.enemyAttackCooldown;
    this.enemyAttackTotalDuration = config.enemyAttackCooldown * 0.4; // 40% of cooldown is attack duration
    this.enemyAttackTimer = 0;
    this.isEnemyAttacking = false;
    this.enemyAttackDuration = 0;
    this.enemyStunTimer = 0;
    this.enemySpearProgress = 0;
    this.perfectBlockAttempted = false;
    this.wasCtrlHeld = false;
    this.updateSpearPositions();
  }
  
  private updateSpearPositions(): void {
    // Player spear floats to the right of player
    this.playerSpearBaseX = this.playerX + this.playerWidth / 2 + 20;
    this.playerSpearY = this.playerY;
    
    // Enemy spear floats to the left of enemy
    this.enemySpearBaseX = this.enemyX - this.enemyWidth / 2 - 20;
    this.enemySpearY = this.enemyY;
    
    // Update current positions based on attack progress
    if (this.playerSpearProgress === 0) {
      this.playerSpearX = this.playerSpearBaseX;
    }
    if (this.enemySpearProgress === 0) {
      this.enemySpearX = this.enemySpearBaseX;
    }
  }

  private resize(): void {
    const container = this.canvas.parentElement;
    if (container) {
      const rect = container.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = 600;
      
      // Update positions relative to canvas width
      this.playerX = Math.min(150, this.canvas.width * 0.2);
      this.enemyX = Math.max(this.canvas.width - 150, this.canvas.width * 0.8);
      this.updateSpearPositions();
    }
  }

  private handlePlayerAttack(): void {
    if (this.gameStatus !== "playing" || this.playerAttackCooldown > 0 || this.playerSpearProgress > 0) {
      return;
    }

    // Start player spear animation
    this.playerSpearProgress = 0.01; // Start animation
    this.playerSpearTimer = 0;
    this.updateSpearPositions();

    // Deal damage when spear connects (at 60% of animation)
    // This will be handled in update()
  }

  private handlePlayerBlock(): void {
    if (this.gameStatus !== "playing" || this.playerBlockCooldown > 0) {
      return;
    }
    this.isPlayerBlocking = true;
  }

  private checkPerfectBlockOnPress(): void {
    // Perfect block triggers when Ctrl is pressed (not held) during the strike window
    if (!this.isEnemyAttacking || this.enemyStunTimer > 0 || this.perfectBlockAttempted) {
      return;
    }

    const attackProgress = this.enemyAttackDuration / this.enemyAttackTotalDuration;
    // Perfect block window: 85-95% of enemy attack progress (when spear is about to hit)
    if (attackProgress >= 0.85 && attackProgress <= 0.95) {
      // Perfect block!
      this.perfectBlockAttempted = true; // Prevent multiple triggers
      this.perfectBlockActive = true;
      this.perfectBlockTimer = this.perfectBlockDuration;
      this.enemyStunTimer = 2500; // 2.5 seconds stun
      
      // Create particles for visual effect
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        this.perfectBlockParticles.push({
          x: this.playerX,
          y: this.playerY,
          vx: Math.cos(angle) * 3,
          vy: Math.sin(angle) * 3,
          life: 1.0,
        });
      }
      
      // Cancel enemy attack
      this.isEnemyAttacking = false;
      this.enemyAttackDuration = 0;
      this.enemyAttackTimer = 0;
      this.enemySpearProgress = 0;
      this.updateSpearPositions();
    }
  }

  private updateEnemyAttack(deltaTime: number): void {
    if (this.gameStatus !== "playing") {
      return;
    }

    // Update stun timer
    if (this.enemyStunTimer > 0) {
      this.enemyStunTimer = Math.max(0, this.enemyStunTimer - deltaTime);
      return; // Can't attack while stunned
    }

    this.enemyAttackTimer += deltaTime;

    if (this.isEnemyAttacking) {
      this.enemyAttackDuration += deltaTime;
      
      // Update enemy spear position based on progress
      this.enemySpearProgress = this.enemyAttackDuration / this.enemyAttackTotalDuration;
      // Spear moves forward during attack (toward player)
      const spearTravelDistance = 200; // pixels
      this.enemySpearX = this.enemySpearBaseX - (spearTravelDistance * this.enemySpearProgress);

      if (this.enemyAttackDuration >= this.enemyAttackTotalDuration) {
        // Attack animation complete, deal damage
        // Perfect block is checked on keydown, so if we get here it wasn't perfect blocked
        if (!this.isPlayerBlocking) {
          // Unblocked attack
          const config = this.getCurrentLevelConfig();
          const damage = config.enemyDamage;
          this.playerHealth = Math.max(0, this.playerHealth - damage);

          // Add attack effect
          this.attackEffects.push({
            x: this.playerX,
            y: this.playerY,
            type: "enemy",
            duration: 200,
          });

          // Check lose condition
          if (this.playerHealth <= 0) {
            this.gameStatus = "enemyWon";
            // Don't stop immediately - let it render
          }
        } else {
          // Regular block - reduced damage
          const config = this.getCurrentLevelConfig();
          const damage = config.enemyDamage * 0.25; // 25% damage through block
          this.playerHealth = Math.max(0, this.playerHealth - damage);
        }

        this.isEnemyAttacking = false;
        this.enemyAttackDuration = 0;
        this.enemyAttackTimer = 0;
        this.enemySpearProgress = 0;
        this.updateSpearPositions();
      }
    } else if (this.enemyAttackTimer >= this.enemyAttackCooldown) {
      // Start enemy attack
      this.isEnemyAttacking = true;
      this.enemyAttackTimer = 0;
      this.enemyAttackDuration = 0;
      this.enemySpearProgress = 0;
      this.perfectBlockAttempted = false; // Reset perfect block attempt flag for new attack
      this.updateSpearPositions();
    }
  }

  private updatePlayerSpear(deltaTime: number): void {
    if (this.playerSpearProgress > 0) {
      this.playerSpearTimer += deltaTime;
      this.playerSpearProgress = Math.min(1, this.playerSpearTimer / this.playerSpearDuration);

      // Spear moves forward during attack (toward enemy)
      const spearTravelDistance = 200; // pixels
      this.playerSpearX = this.playerSpearBaseX + (spearTravelDistance * this.playerSpearProgress);

      // Deal damage at 60% of animation (when spear connects)
      if (this.playerSpearProgress >= 0.6 && this.playerSpearProgress < 0.61) {
        const config = this.getCurrentLevelConfig();
        const damage = 15;
        this.enemyHealth = Math.max(0, this.enemyHealth - damage);

        // Add attack effect
        this.attackEffects.push({
          x: this.enemyX,
          y: this.enemyY,
          type: "player",
          duration: 200,
        });

        // Check level complete condition
        if (this.enemyHealth <= 0) {
          if (this.currentLevel >= 5) {
            // Victory!
            this.gameStatus = "playerWon";
          } else {
            // Level complete
            this.gameStatus = "levelComplete";
            this.levelCompleteTimer = 2000; // 2 seconds
          }
        }
      }

      // Reset spear animation when complete
      if (this.playerSpearProgress >= 1) {
        this.playerSpearProgress = 0;
        this.playerSpearTimer = 0;
        this.updateSpearPositions();
      }
    }
  }
  
  private updatePerfectBlock(deltaTime: number): void {
    if (this.perfectBlockActive) {
      this.perfectBlockTimer -= deltaTime;
      if (this.perfectBlockTimer <= 0) {
        this.perfectBlockActive = false;
      }
    }
    
    // Update particles
    this.perfectBlockParticles = this.perfectBlockParticles
      .map((particle) => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - deltaTime / 500, // Fade over 500ms
      }))
      .filter((particle) => particle.life > 0);
  }

  private updateLevelProgression(deltaTime: number): void {
    if (this.gameStatus === "levelComplete") {
      this.levelCompleteTimer -= deltaTime;
      if (this.levelCompleteTimer <= 0) {
        // Advance to next level
        this.currentLevel++;
        this.playerHealth = 100; // Full heal
        this.initializeLevel();
        this.gameStatus = "playing";
        this.levelCompleteTimer = 0;
      }
    }
  }

  private update(deltaTime: number): void {
    // Update cooldowns
    if (this.playerAttackCooldown > 0) {
      this.playerAttackCooldown = Math.max(0, this.playerAttackCooldown - deltaTime);
    }
    if (this.playerBlockCooldown > 0) {
      this.playerBlockCooldown = Math.max(0, this.playerBlockCooldown - deltaTime);
    }

    // Update player spear animation
    this.updatePlayerSpear(deltaTime);

    // Update enemy attack
    this.updateEnemyAttack(deltaTime);

    // Update perfect block effects
    this.updatePerfectBlock(deltaTime);

    // Update level progression
    this.updateLevelProgression(deltaTime);

    // Update attack effects
    this.attackEffects = this.attackEffects
      .map((effect) => ({
        ...effect,
        duration: effect.duration - deltaTime,
      }))
      .filter((effect) => effect.duration > 0);
  }

  private drawSpear(
    x: number,
    y: number,
    progress: number,
    color: string,
    isEnemy: boolean
  ): void {
    const spearLength = 60;
    const spearWidth = 3;
    const tipLength = 15;
    
    // Calculate spear color based on progress (for enemy)
    let spearColor = color;
    if (isEnemy && progress > 0) {
      // Use enemy's base color during wind-up, then transition to warning colors
      if (progress < 0.6) {
        // Wind-up: use enemy's base color
        spearColor = color;
      } else {
        // Strike: transition from enemy color -> orange -> red
        const strikeProgress = (progress - 0.6) / 0.4;
        if (strikeProgress < 0.5) {
          spearColor = "#FF8C00"; // Orange
        } else {
          spearColor = "#FF4500"; // Red
        }
      }
    }

    this.ctx.save();
    
    // Draw spear shaft (horizontal)
    this.ctx.fillStyle = spearColor;
    this.ctx.fillRect(x, y - spearWidth / 2, spearLength, spearWidth);
    
    // Draw spear tip
    if (isEnemy) {
      // Enemy spear points left (toward player)
      // Tip point is furthest left, base is at the left end of the shaft
      this.ctx.beginPath();
      this.ctx.moveTo(x - tipLength, y); // Tip point (furthest left)
      this.ctx.lineTo(x, y - spearWidth * 2); // Top base vertex (at shaft)
      this.ctx.lineTo(x, y + spearWidth * 2); // Bottom base vertex (at shaft)
      this.ctx.closePath();
      this.ctx.fill();
    } else {
      // Player spear points right (toward enemy)
      // Tip point is furthest right, base is at the right end of the shaft
      this.ctx.beginPath();
      this.ctx.moveTo(x + spearLength + tipLength, y); // Tip point (furthest right)
      this.ctx.lineTo(x + spearLength, y - spearWidth * 2); // Top base vertex (at shaft)
      this.ctx.lineTo(x + spearLength, y + spearWidth * 2); // Bottom base vertex (at shaft)
      this.ctx.closePath();
      this.ctx.fill();
    }
    
    // Add glow effect if attacking
    if (progress > 0 && progress < 1) {
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = spearColor;
      this.ctx.fillRect(x, y - spearWidth / 2, spearLength, spearWidth);
      this.ctx.shadowBlur = 0;
    }
    
    this.ctx.restore();
  }
  
  private drawPerfectBlockEffect(): void {
    if (!this.perfectBlockActive) {
      return;
    }

    // Draw shield effect around player
    const shieldRadius = 50;
    const alpha = this.perfectBlockTimer / this.perfectBlockDuration;
    
    // Outer glow
    this.ctx.save();
    this.ctx.globalAlpha = alpha * 0.8;
    const gradient = this.ctx.createRadialGradient(
      this.playerX,
      this.playerY,
      0,
      this.playerX,
      this.playerY,
      shieldRadius
    );
    gradient.addColorStop(0, "#00FFFF");
    gradient.addColorStop(0.5, "#0080FF");
    gradient.addColorStop(1, "transparent");
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.playerX, this.playerY, shieldRadius, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Shield ring
    this.ctx.strokeStyle = "#00FFFF";
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.arc(this.playerX, this.playerY, shieldRadius, 0, Math.PI * 2);
    this.ctx.stroke();
    
    // Inner glow
    this.ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.3})`;
    this.ctx.beginPath();
    this.ctx.arc(this.playerX, this.playerY, shieldRadius * 0.6, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.restore();
    
    // Draw particles
    this.perfectBlockParticles.forEach((particle) => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.life;
      this.ctx.fillStyle = "#00FFFF";
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
    
    // Draw "PERFECT BLOCK!" text
    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    this.ctx.fillStyle = "#00FFFF";
    this.ctx.font = "bold 32px serif";
    this.ctx.textAlign = "center";
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 4;
    this.ctx.strokeText("PERFECT BLOCK!", this.canvas.width / 2, this.canvas.height / 2 - 50);
    this.ctx.fillText("PERFECT BLOCK!", this.canvas.width / 2, this.canvas.height / 2 - 50);
    this.ctx.restore();
  }

  private drawPerfectBlockIndicator(): void {
    if (!this.isEnemyAttacking || this.enemyStunTimer > 0) {
      return;
    }

    const attackProgress = this.enemyAttackDuration / this.enemyAttackTotalDuration;
    const perfectBlockWindowStart = 0.85;
    const perfectBlockWindowEnd = 0.95;

    // Draw indicator showing enemy spear position
    const indicatorY = this.playerY - 80;
    const indicatorWidth = 300;
    const indicatorHeight = 12;
    const x = this.canvas.width / 2 - indicatorWidth / 2;

    // Background
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    this.ctx.fillRect(x, indicatorY, indicatorWidth, indicatorHeight);

    // Perfect block zone
    const zoneStart = perfectBlockWindowStart;
    const zoneEnd = perfectBlockWindowEnd;
    const zoneX = x + indicatorWidth * zoneStart;
    const zoneWidth = indicatorWidth * (zoneEnd - zoneStart);

    // Zone glows when in perfect block window
    const inWindow = attackProgress >= zoneStart && attackProgress <= zoneEnd;
    this.ctx.fillStyle = inWindow ? "#00FF00" : "#FFFF00";
    this.ctx.fillRect(zoneX, indicatorY, zoneWidth, indicatorHeight);
    
    if (inWindow) {
      // Pulsing effect
      const pulse = Math.sin(Date.now() / 100) * 0.3 + 0.7;
      this.ctx.globalAlpha = pulse;
      this.ctx.fillRect(zoneX, indicatorY, zoneWidth, indicatorHeight);
      this.ctx.globalAlpha = 1;
    }

    // Current spear position indicator
    const currentX = x + indicatorWidth * attackProgress;
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(currentX - 3, indicatorY - 2, 6, indicatorHeight + 4);

    // Label
    if (inWindow) {
      this.ctx.fillStyle = "#00FF00";
      this.ctx.font = "bold 14px sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Press Ctrl NOW!", this.canvas.width / 2, indicatorY - 15);
    }
  }

  private render(): void {
    // Clear canvas
    this.ctx.fillStyle = "#0b2e36";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw level display
    this.ctx.fillStyle = "#8BB8E8";
    this.ctx.font = "24px serif";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`Level ${this.currentLevel}`, this.canvas.width / 2, 35);

    // Draw health bars
    this.drawHealthBar(50, 60, this.playerHealth, 100, "The Chosen One");
    const config = this.getCurrentLevelConfig();
    this.drawHealthBar(
      this.canvas.width - 250,
      60,
      this.enemyHealth,
      config.enemyHealth,
      config.enemyName,
      config.enemyColor
    );

    // Draw player
    this.drawCharacter(
      this.playerX,
      this.playerY,
      this.playerWidth,
      this.playerHeight,
      "#8BB8E8",
      this.isPlayerBlocking
    );

    // Draw player spear (always visible, floating)
    this.drawSpear(
      this.playerSpearX,
      this.playerSpearY,
      this.playerSpearProgress,
      "#8BB8E8",
      false
    );

    // Draw enemy
    const isStunned = this.enemyStunTimer > 0;
    const flashAlpha = isStunned ? (Math.sin(Date.now() / 100) * 0.5 + 0.5) : 1;
    const enemyColor = config.enemyColor;
    const enemyColorRgb = this.hexToRgb(enemyColor);
    this.drawCharacter(
      this.enemyX,
      this.enemyY,
      this.enemyWidth,
      this.enemyHeight,
      isStunned ? `rgba(${enemyColorRgb.r}, ${enemyColorRgb.g}, ${enemyColorRgb.b}, ${flashAlpha})` : enemyColor,
      this.isEnemyAttacking && !isStunned
    );

    // Draw enemy spear (always visible, floating)
    if (!isStunned) {
      this.drawSpear(
        this.enemySpearX,
        this.enemySpearY,
        this.enemySpearProgress,
        enemyColor,
        true
      );
    }
    
    // Draw perfect block effect
    this.drawPerfectBlockEffect();

    // Draw perfect block indicator
    this.drawPerfectBlockIndicator();

    // Draw attack effects
    this.attackEffects.forEach((effect) => {
      this.drawAttackEffect(effect.x, effect.y, effect.type);
    });

    // Draw game status overlays
    if (this.gameStatus === "levelComplete") {
      this.drawLevelComplete();
    } else if (this.gameStatus === "playerWon") {
      this.drawGameOver("Victory!", "#8BB8E8");
    } else if (this.gameStatus === "enemyWon") {
      const config = this.getCurrentLevelConfig();
      this.drawGameOver(`Defeated by ${config.enemyName}!`, config.enemyColor);
    }

    // Draw controls hint
    if (this.gameStatus === "playing") {
      this.drawControlsHint();
    }
  }

  private drawLevelComplete(): void {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const config = this.getCurrentLevelConfig();
    
    this.ctx.fillStyle = "#8BB8E8";
    this.ctx.font = "48px serif";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `Level ${this.currentLevel} Complete!`,
      this.canvas.width / 2,
      this.canvas.height / 2 - 40
    );

    this.ctx.fillStyle = config.enemyColor;
    this.ctx.font = "32px serif";
    this.ctx.fillText(
      `${config.enemyName} Defeated!`,
      this.canvas.width / 2,
      this.canvas.height / 2 + 20
    );

    if (this.currentLevel < 5) {
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "24px sans-serif";
      this.ctx.fillText(
        "Preparing next level...",
        this.canvas.width / 2,
        this.canvas.height / 2 + 80
      );
    }
  }

  private drawHealthBar(
    x: number,
    y: number,
    current: number,
    max: number,
    label: string,
    color?: string
  ): void {
    const width = 200;
    const height = 30;
    const percentage = current / max;
    const barColor = color || "#8BB8E8";

    // Background
    this.ctx.fillStyle = "#1a1a1a";
    this.ctx.fillRect(x, y, width, height);

    // Health bar
    const gradient = this.ctx.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, barColor);
    const colorRgb = this.hexToRgb(barColor);
    // Darken the second color stop
    gradient.addColorStop(1, `rgb(${Math.max(0, colorRgb.r - 50)}, ${Math.max(0, colorRgb.g - 50)}, ${Math.max(0, colorRgb.b - 50)})`);
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(x, y, width * percentage, height);

    // Border
    this.ctx.strokeStyle = barColor;
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, width, height);

    // Label
    this.ctx.fillStyle = barColor;
    this.ctx.font = "16px serif";
    this.ctx.textAlign = "left";
    this.ctx.fillText(label, x, y - 5);

    // Health text
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "14px sans-serif";
    this.ctx.fillText(
      `${Math.ceil(current)}/${max}`,
      x + width / 2 - 30,
      y + height / 2 + 5
    );
  }

  private drawCharacter(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    isAction: boolean
  ): void {
    // Character body
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - width / 2, y - height / 2, width, height);

    // Character outline
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x - width / 2, y - height / 2, width, height);

    // Action indicator
    if (isAction) {
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      this.ctx.fillRect(x - width / 2, y - height / 2, width, height);
    }

    // Simple face
    this.ctx.fillStyle = "#000000";
    // Eyes
    this.ctx.fillRect(x - 15, y - 20, 8, 8);
    this.ctx.fillRect(x + 7, y - 20, 8, 8);
    // Mouth
    this.ctx.fillRect(x - 8, y + 10, 16, 4);
  }

  private drawAttackEffect(x: number, y: number, type: "player" | "enemy"): void {
    const size = 80;
    const alpha = 0.6;
    if (type === "player") {
      this.ctx.fillStyle = `rgba(139, 184, 232, ${alpha})`;
    } else {
      const config = this.getCurrentLevelConfig();
      const enemyColorRgb = this.hexToRgb(config.enemyColor);
      this.ctx.fillStyle = `rgba(${enemyColorRgb.r}, ${enemyColorRgb.g}, ${enemyColorRgb.b}, ${alpha})`;
    }
    this.ctx.fillRect(x - size / 2, y - size / 2, size, size);
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 212, g: 175, b: 55 }; // Default to gold if parsing fails
  }

  private drawGameOver(text: string, color: string): void {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = color;
    this.ctx.font = "48px serif";
    this.ctx.textAlign = "center";
    this.ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2);

    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "24px sans-serif";
    this.ctx.fillText(
      "Press R to restart",
      this.canvas.width / 2,
      this.canvas.height / 2 + 60
    );
  }

  private drawControlsHint(): void {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(10, this.canvas.height - 80, 300, 70);

    this.ctx.fillStyle = "#8BB8E8";
    this.ctx.font = "14px sans-serif";
    this.ctx.textAlign = "left";
    this.ctx.fillText("Controls:", 20, this.canvas.height - 60);
    this.ctx.fillText("Space - Attack", 20, this.canvas.height - 40);
    this.ctx.fillText("Ctrl - Block", 20, this.canvas.height - 20);
  }

  private gameLoop = (timestamp: number): void => {
    if (!this.isRunning) {
      return;
    }

    const deltaTime = timestamp - (this.lastFrameTime || timestamp);
    this.lastFrameTime = timestamp;

    this.update(deltaTime);
    this.render();

    // Continue game loop even after win/lose to show final state
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };

  private lastFrameTime: number = 0;

  public start(): void {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public restart(): void {
    this.stop();
    this.currentLevel = 1;
    this.playerHealth = 100;
    this.enemyHealth = 100;
    this.isPlayerBlocking = false;
    this.playerAttackCooldown = 0;
    this.playerBlockCooldown = 0;
    this.playerSpearProgress = 0;
    this.playerSpearTimer = 0;
    this.enemyAttackTimer = 0;
    this.isEnemyAttacking = false;
    this.enemyAttackDuration = 0;
    this.enemyStunTimer = 0;
    this.enemySpearProgress = 0;
    this.attackEffects = [];
    this.perfectBlockActive = false;
    this.perfectBlockTimer = 0;
    this.perfectBlockParticles = [];
    this.perfectBlockAttempted = false;
    this.wasCtrlHeld = false;
    this.gameStatus = "playing";
    this.levelCompleteTimer = 0;
    this.keys.clear();
    this.initializeLevel();
    this.updateSpearPositions();
    this.start();
  }

  public cleanup(): void {
    this.stop();
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("keydown", this.keydownHandler);
    window.removeEventListener("keyup", this.keyupHandler);
  }
}
