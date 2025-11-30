// Level configuration
interface LevelConfig {
  enemyHealth: number;
  enemyDamage: number;
  enemyAttackCooldown: number;
  enemyName: string;
  enemyColor: string;
}

const LEVEL_CONFIGS: LevelConfig[] = [
  {
    enemyHealth: 100,
    enemyDamage: 10,
    enemyAttackCooldown: 2500,
    enemyName: "Shadow Warrior",
    enemyColor: "#8B4513",
  }, // Level 1 - Brown
  {
    enemyHealth: 120,
    enemyDamage: 12,
    enemyAttackCooldown: 2200,
    enemyName: "Crimson Blade",
    enemyColor: "#DC143C",
  }, // Level 2 - Crimson
  {
    enemyHealth: 150,
    enemyDamage: 15,
    enemyAttackCooldown: 2000,
    enemyName: "Void Knight",
    enemyColor: "#4B0082",
  }, // Level 3 - Indigo
  {
    enemyHealth: 180,
    enemyDamage: 18,
    enemyAttackCooldown: 1800,
    enemyName: "Frost Wraith",
    enemyColor: "#00CED1",
  }, // Level 4 - Dark Turquoise
  {
    enemyHealth: 200,
    enemyDamage: 20,
    enemyAttackCooldown: 1500,
    enemyName: "Soul Reaper",
    enemyColor: "#FF1493",
  }, // Level 5 - Deep Pink
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

  // Stamina system
  private playerStamina: number = 100;
  private maxStamina: number = 100;
  private staminaRegenRate: number = 25; // per second
  private attackStaminaCost: number = 30;
  private blockStaminaCost: number = 20;

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
  private perfectBlockParticles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
  }> = [];
  private wasCtrlHeld: boolean = false; // Track if Ctrl was already held
  private perfectBlockAttempted: boolean = false; // Track if perfect block was attempted on current attack

  // Enhanced particle effects
  private hitParticles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
    size: number;
  }> = [];
  private blockParticles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
    size: number;
  }> = [];
  private attackTrailParticles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
    size: number;
  }> = [];

  // Visual effects
  private attackEffects: Array<{
    x: number;
    y: number;
    type: "player" | "enemy";
    duration: number;
  }> = [];

  // Damage numbers
  private damageNumbers: Array<{
    x: number;
    y: number;
    value: number;
    type: "player" | "enemy";
    life: number;
    maxLife: number;
    offsetY: number;
  }> = [];

  // Screen shake
  private cameraOffsetX: number = 0;
  private cameraOffsetY: number = 0;
  private shakeIntensity: number = 0;
  private shakeDecay: number = 0.9; // Per frame decay

  // Character animations
  private playerAnimationState: "idle" | "attack" | "block" | "hit" = "idle";
  private playerAnimationTimer: number = 0;
  private enemyAnimationState: "idle" | "attack" | "block" | "hit" = "idle";
  private enemyAnimationTimer: number = 0;
  private lastPlayerHitTime: number = 0;

  // Keyboard state
  private keys: Set<string> = new Set();

  // Game status
  private gameStatus:
    | "playing"
    | "levelComplete"
    | "playerWon"
    | "enemyWon"
    | "upgradeMenu" = "playing";

  // New Game+ system
  private newGamePlusLevel: number = 0;
  private healthUpgrades: number = 0;
  private staminaUpgrades: number = 0;
  private perfectBlockUpgrades: number = 0;
  private attackDamageUpgrades: number = 0;
  private baseMaxHealth: number = 100;
  private baseMaxStamina: number = 100;
  private basePerfectBlockDuration: number = 500; // milliseconds
  private basePlayerDamage: number = 15;
  private selectedUpgrade:
    | "health"
    | "stamina"
    | "perfectBlock"
    | "attackDamage"
    | null = null;

  // Score system
  private score: number = 0;
  private scoreMultiplier: number = 1.0;

  // Statistics tracking
  private stats = {
    totalDamageDealt: 0,
    perfectBlocks: 0,
    attacksBlocked: 0,
    hitsTaken: 0,
    totalAttacks: 0,
  };

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

      // Handle upgrade menu navigation
      if (this.gameStatus === "upgradeMenu") {
        if (e.code === "Digit1" || e.code === "Numpad1") {
          e.preventDefault();
          this.selectedUpgrade = "health";
          this.applyUpgrade("health");
        } else if (e.code === "Digit2" || e.code === "Numpad2") {
          e.preventDefault();
          this.selectedUpgrade = "stamina";
          this.applyUpgrade("stamina");
        } else if (e.code === "Digit3" || e.code === "Numpad3") {
          e.preventDefault();
          this.selectedUpgrade = "perfectBlock";
          this.applyUpgrade("perfectBlock");
        } else if (e.code === "Digit4" || e.code === "Numpad4") {
          e.preventDefault();
          this.selectedUpgrade = "attackDamage";
          this.applyUpgrade("attackDamage");
        }
        return;
      }

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

  private getEnemyMultiplier(ngPlusLevel: number): number {
    if (ngPlusLevel === 0) return 1.0;
    if (ngPlusLevel === 1) return 1.2;
    if (ngPlusLevel === 2) return 1.5;
    if (ngPlusLevel === 3) return 2.0;
    // Linear progression: x2.5, x3.0, x3.5, x4.0...
    return 2.0 + (ngPlusLevel - 3) * 0.5;
  }

  private getCurrentLevelConfig(): LevelConfig {
    const levelIndex = Math.min(
      this.currentLevel - 1,
      LEVEL_CONFIGS.length - 1
    );
    const baseConfig = LEVEL_CONFIGS[levelIndex];
    const multiplier = this.getEnemyMultiplier(this.newGamePlusLevel);

    return {
      ...baseConfig,
      enemyHealth: baseConfig.enemyHealth * multiplier,
      enemyDamage: baseConfig.enemyDamage * multiplier,
      enemyAttackCooldown: baseConfig.enemyAttackCooldown / multiplier, // Divide to make attacks faster
    };
  }

  private applyUpgrade(
    upgradeType: "health" | "stamina" | "perfectBlock" | "attackDamage"
  ): void {
    // Apply flat +20 upgrades
    if (upgradeType === "health") {
      this.healthUpgrades++;
      this.maxHealth = this.baseMaxHealth + this.healthUpgrades * 20;
      this.playerHealth = this.maxHealth; // Full heal on upgrade
    } else if (upgradeType === "stamina") {
      this.staminaUpgrades++;
      this.maxStamina = this.baseMaxStamina + this.staminaUpgrades * 20;
      this.playerStamina = this.maxStamina; // Full stamina on upgrade
    } else if (upgradeType === "perfectBlock") {
      this.perfectBlockUpgrades++;
      // Reduce duration by 20ms per upgrade (minimum 100ms)
      this.perfectBlockDuration = Math.max(
        100,
        this.basePerfectBlockDuration - this.perfectBlockUpgrades * 20
      );
    } else if (upgradeType === "attackDamage") {
      this.attackDamageUpgrades++;
      // Attack damage is applied directly in damage calculation
    }

    // Increment NG+ level
    this.newGamePlusLevel++;

    // Reset game state for new playthrough
    this.currentLevel = 1;
    this.playerHealth = this.maxHealth;
    this.playerStamina = this.maxStamina;
    this.score = 0;
    this.scoreMultiplier = 1.0;
    this.stats = {
      totalDamageDealt: 0,
      perfectBlocks: 0,
      attacksBlocked: 0,
      hitsTaken: 0,
      totalAttacks: 0,
    };
    this.playerAnimationState = "idle";
    this.playerAnimationTimer = 0;
    this.enemyAnimationState = "idle";
    this.enemyAnimationTimer = 0;
    this.lastPlayerHitTime = 0;
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
    this.damageNumbers = [];
    this.perfectBlockActive = false;
    this.perfectBlockParticles = [];
    this.hitParticles = [];
    this.blockParticles = [];
    this.attackTrailParticles = [];
    this.perfectBlockTimer = 0;
    this.perfectBlockAttempted = false;
    this.wasCtrlHeld = false;
    this.gameStatus = "playing";
    this.levelCompleteTimer = 0;
    this.keys.clear();
    this.initializeLevel();
    this.updateSpearPositions();
  }

  private initializeLevel(): void {
    const config = this.getCurrentLevelConfig();
    this.enemyHealth = config.enemyHealth;
    // Don't modify maxHealth here - it's set based on upgrades
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
      // Use widescreen aspect ratio (16:9)
      // Height increased by 25%: 600 * 1.25 = 750
      const targetHeight = 750;
      const targetWidth = targetHeight * (16 / 9); // 16:9 aspect ratio

      // Use container width if available, otherwise use calculated width
      const containerWidth = rect.width;
      const calculatedWidth = Math.min(containerWidth, targetWidth);

      // Maintain aspect ratio
      this.canvas.width = calculatedWidth;
      this.canvas.height = calculatedWidth / (16 / 9);

      // Update positions relative to canvas width
      this.playerX = Math.min(150, this.canvas.width * 0.2);
      this.enemyX = Math.max(this.canvas.width - 150, this.canvas.width * 0.8);
      // Update Y position to center vertically in new canvas height
      this.playerY = this.canvas.height * 0.5;
      this.enemyY = this.canvas.height * 0.5;
      this.updateSpearPositions();
    }
  }

  private handlePlayerAttack(): void {
    if (
      this.gameStatus !== "playing" ||
      this.playerAttackCooldown > 0 ||
      this.playerSpearProgress > 0
    ) {
      return;
    }

    // Check stamina
    if (this.playerStamina < this.attackStaminaCost) {
      return;
    }

    // Consume stamina
    this.playerStamina = Math.max(
      0,
      this.playerStamina - this.attackStaminaCost
    );

    // Set attack animation
    this.playerAnimationState = "attack";
    this.playerAnimationTimer = 400; // Match spear duration

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

    // Check stamina (only consume on initial block, not while holding)
    if (!this.isPlayerBlocking && this.playerStamina < this.blockStaminaCost) {
      return;
    }

    // Consume stamina only on initial block press
    if (!this.isPlayerBlocking) {
      this.playerStamina = Math.max(
        0,
        this.playerStamina - this.blockStaminaCost
      );
      // Set block animation
      this.playerAnimationState = "block";
    }

    this.isPlayerBlocking = true;
  }

  private checkPerfectBlockOnPress(): void {
    // Perfect block triggers when Ctrl is pressed (not held) during the strike window
    if (
      !this.isEnemyAttacking ||
      this.enemyStunTimer > 0 ||
      this.perfectBlockAttempted
    ) {
      return;
    }

    const attackProgress =
      this.enemyAttackDuration / this.enemyAttackTotalDuration;
    // Perfect block window: 85-95% of enemy attack progress (when spear is about to hit)
    if (attackProgress >= 0.85 && attackProgress <= 0.95) {
      // Perfect block!
      this.perfectBlockAttempted = true; // Prevent multiple triggers
      this.perfectBlockActive = true;
      this.perfectBlockTimer = this.perfectBlockDuration;
      this.enemyStunTimer = 2500; // 2.5 seconds stun

      // Update statistics
      this.stats.perfectBlocks++;

      // Add score for perfect block
      const perfectBlockScore = Math.floor(100 * this.scoreMultiplier);
      this.score += perfectBlockScore;

      // Increase score multiplier for perfect blocks
      this.scoreMultiplier = Math.min(3.0, this.scoreMultiplier + 0.2);

      // Screen shake for perfect block
      this.shakeIntensity = 15;

      // Create particles for visual effect
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        this.perfectBlockParticles.push({
          x: this.playerX,
          y: this.playerY,
          vx: Math.cos(angle) * 3,
          vy: Math.sin(angle) * 3,
          life: 1.0,
          color: "#00FFFF",
        });
      }

      // Add spark particles
      for (let i = 0; i < 15; i++) {
        const angle = (Math.PI * 2 * i) / 15 + Math.random() * 0.5;
        this.hitParticles.push({
          x: this.playerX,
          y: this.playerY,
          vx: Math.cos(angle) * (2 + Math.random() * 3),
          vy: Math.sin(angle) * (2 + Math.random() * 3),
          life: 800,
          maxLife: 800,
          color: "#00FFFF",
          size: 2 + Math.random() * 3,
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
      this.enemySpearProgress =
        this.enemyAttackDuration / this.enemyAttackTotalDuration;
      // Spear moves forward during attack (toward player)
      const spearTravelDistance = 200; // pixels
      this.enemySpearX =
        this.enemySpearBaseX - spearTravelDistance * this.enemySpearProgress;

      if (this.enemyAttackDuration >= this.enemyAttackTotalDuration) {
        // Attack animation complete, deal damage
        // Perfect block is checked on keydown, so if we get here it wasn't perfect blocked
        if (!this.isPlayerBlocking) {
          // Unblocked attack
          const config = this.getCurrentLevelConfig();
          const damage = config.enemyDamage;
          this.playerHealth = Math.max(0, this.playerHealth - damage);

          // Update statistics
          this.stats.hitsTaken++;

          // Reset score multiplier on hit
          this.scoreMultiplier = 1.0;

          // Set hit animation
          this.playerAnimationState = "hit";
          this.playerAnimationTimer = 300;
          this.lastPlayerHitTime = Date.now();

          // Screen shake for hit
          this.shakeIntensity = 20;

          // Add damage number
          this.damageNumbers.push({
            x: this.playerX,
            y: this.playerY,
            value: damage,
            type: "enemy",
            life: 1000,
            maxLife: 1000,
            offsetY: 0,
          });

          // Add hit particles
          const enemyColorRgb = this.hexToRgb(config.enemyColor);
          for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12 + (Math.random() - 0.5) * 0.5;
            this.hitParticles.push({
              x: this.playerX,
              y: this.playerY,
              vx: Math.cos(angle) * (1 + Math.random() * 2),
              vy: Math.sin(angle) * (1 + Math.random() * 2),
              life: 600,
              maxLife: 600,
              color: config.enemyColor,
              size: 2 + Math.random() * 3,
            });
          }

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

          // Update statistics
          this.stats.attacksBlocked++;
          this.stats.hitsTaken++; // Still counts as a hit, just reduced

          // Reset score multiplier on hit (even if blocked)
          this.scoreMultiplier = 1.0;

          // Screen shake for blocked hit (less intense)
          this.shakeIntensity = 8;

          // Add damage number (smaller, different color for blocked)
          this.damageNumbers.push({
            x: this.playerX,
            y: this.playerY,
            value: damage,
            type: "enemy",
            life: 1000,
            maxLife: 1000,
            offsetY: 0,
          });

          // Add block particles
          for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.3;
            this.blockParticles.push({
              x: this.playerX - 30, // In front of player
              y: this.playerY + (Math.random() - 0.5) * 40,
              vx: Math.cos(angle) * (0.5 + Math.random() * 1),
              vy: Math.sin(angle) * (0.5 + Math.random() * 1),
              life: 400,
              maxLife: 400,
              color: "#8BB8E8",
              size: 2 + Math.random() * 2,
            });
          }
        }

        this.isEnemyAttacking = false;
        this.enemyAttackDuration = 0;
        this.enemyAttackTimer = 0;
        this.enemySpearProgress = 0;
        // Return to idle after attack
        if (this.enemyAnimationState === "attack") {
          this.enemyAnimationState = "idle";
        }
        this.updateSpearPositions();
      }
    } else if (this.enemyAttackTimer >= this.enemyAttackCooldown) {
      // Start enemy attack
      this.isEnemyAttacking = true;
      this.enemyAttackTimer = 0;
      this.enemyAttackDuration = 0;
      this.enemySpearProgress = 0;
      this.enemyAnimationState = "attack";
      this.enemyAnimationTimer = this.enemyAttackTotalDuration;
      this.perfectBlockAttempted = false; // Reset perfect block attempt flag for new attack
      this.updateSpearPositions();
    }
  }

  private updatePlayerSpear(deltaTime: number): void {
    if (this.playerSpearProgress > 0) {
      this.playerSpearTimer += deltaTime;
      this.playerSpearProgress = Math.min(
        1,
        this.playerSpearTimer / this.playerSpearDuration
      );

      // Spear moves forward during attack (toward enemy)
      const spearTravelDistance = 200; // pixels
      this.playerSpearX =
        this.playerSpearBaseX + spearTravelDistance * this.playerSpearProgress;

      // Deal damage at 60% of animation (when spear connects)
      if (this.playerSpearProgress >= 0.6 && this.playerSpearProgress < 0.61) {
        const config = this.getCurrentLevelConfig();
        const damage = this.basePlayerDamage + this.attackDamageUpgrades * 20;
        this.enemyHealth = Math.max(0, this.enemyHealth - damage);

        // Update statistics
        this.stats.totalDamageDealt += damage;
        this.stats.totalAttacks++;

        // Add score for damage dealt
        const damageScore = Math.floor(damage * 10 * this.scoreMultiplier);
        this.score += damageScore;

        // Set enemy hit animation
        this.enemyAnimationState = "hit";
        this.enemyAnimationTimer = 300;

        // Screen shake for player hit
        this.shakeIntensity = 12;

        // Add damage number
        this.damageNumbers.push({
          x: this.enemyX,
          y: this.enemyY,
          value: damage,
          type: "player",
          life: 1000,
          maxLife: 1000,
          offsetY: 0,
        });

        // Add hit particles
        for (let i = 0; i < 10; i++) {
          const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.5;
          this.hitParticles.push({
            x: this.enemyX,
            y: this.enemyY,
            vx: Math.cos(angle) * (1 + Math.random() * 2),
            vy: Math.sin(angle) * (1 + Math.random() * 2),
            life: 600,
            maxLife: 600,
            color: "#8BB8E8",
            size: 2 + Math.random() * 3,
          });
        }

        // Add attack trail particles
        const trailStartX = this.playerSpearX;
        const trailStartY = this.playerSpearY;
        for (let i = 0; i < 5; i++) {
          this.attackTrailParticles.push({
            x: trailStartX + (Math.random() - 0.5) * 20,
            y: trailStartY + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: 300,
            maxLife: 300,
            color: "#8BB8E8",
            size: 1 + Math.random() * 2,
          });
        }

        // Add attack effect
        this.attackEffects.push({
          x: this.enemyX,
          y: this.enemyY,
          type: "player",
          duration: 200,
        });

        // Check level complete condition
        if (this.enemyHealth <= 0) {
          // Add level completion bonus
          const levelBonus = this.currentLevel * 500;
          this.score += Math.floor(levelBonus * this.scoreMultiplier);

          if (this.currentLevel >= 5) {
            // Victory! Show upgrade menu
            this.gameStatus = "upgradeMenu";
            // Add victory bonus
            this.score += Math.floor(5000 * this.scoreMultiplier);
            this.selectedUpgrade = null; // Reset selection
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
        // Return to idle after attack
        if (this.playerAnimationState === "attack") {
          this.playerAnimationState = "idle";
        }
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

    // Update hit particles
    this.hitParticles = this.hitParticles
      .map((particle) => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - deltaTime,
        vx: particle.vx * 0.98, // Friction
        vy: particle.vy * 0.98,
      }))
      .filter((particle) => particle.life > 0);

    // Update block particles
    this.blockParticles = this.blockParticles
      .map((particle) => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - deltaTime,
        vx: particle.vx * 0.95, // More friction
        vy: particle.vy * 0.95,
      }))
      .filter((particle) => particle.life > 0);

    // Update attack trail particles
    this.attackTrailParticles = this.attackTrailParticles
      .map((particle) => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - deltaTime,
        vx: particle.vx * 0.9, // Fast decay
        vy: particle.vy * 0.9,
      }))
      .filter((particle) => particle.life > 0);
  }

  private updateLevelProgression(deltaTime: number): void {
    if (this.gameStatus === "levelComplete") {
      this.levelCompleteTimer -= deltaTime;
      if (this.levelCompleteTimer <= 0) {
        // Advance to next level
        this.currentLevel++;

        // Partial health regeneration (50% of missing health)
        const missingHealth = this.maxHealth - this.playerHealth;
        const healAmount = missingHealth * 0.5;
        this.playerHealth = Math.min(
          this.maxHealth,
          this.playerHealth + healAmount
        );

        // Score multiplier continues to next level (don't reset)

        this.initializeLevel();
        this.gameStatus = "playing";
        this.levelCompleteTimer = 0;
      }
    }
  }

  private update(deltaTime: number): void {
    // Update cooldowns
    if (this.playerAttackCooldown > 0) {
      this.playerAttackCooldown = Math.max(
        0,
        this.playerAttackCooldown - deltaTime
      );
    }
    if (this.playerBlockCooldown > 0) {
      this.playerBlockCooldown = Math.max(
        0,
        this.playerBlockCooldown - deltaTime
      );
    }

    // Update stamina regeneration (only when not blocking)
    if (!this.isPlayerBlocking && this.playerStamina < this.maxStamina) {
      const regenAmount = (this.staminaRegenRate * deltaTime) / 1000;
      this.playerStamina = Math.min(
        this.maxStamina,
        this.playerStamina + regenAmount
      );
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

    // Update damage numbers
    this.damageNumbers = this.damageNumbers
      .map((num) => ({
        ...num,
        life: num.life - deltaTime,
        offsetY: num.offsetY + deltaTime * 0.1, // Move upward
      }))
      .filter((num) => num.life > 0);

    // Update screen shake
    if (this.shakeIntensity > 0) {
      // Random offset based on intensity
      this.cameraOffsetX = (Math.random() - 0.5) * this.shakeIntensity;
      this.cameraOffsetY = (Math.random() - 0.5) * this.shakeIntensity;

      // Decay intensity
      this.shakeIntensity *= this.shakeDecay;

      // Reset when intensity is very low
      if (this.shakeIntensity < 0.1) {
        this.shakeIntensity = 0;
        this.cameraOffsetX = 0;
        this.cameraOffsetY = 0;
      }
    }

    // Update character animations
    if (this.playerAnimationTimer > 0) {
      this.playerAnimationTimer = Math.max(
        0,
        this.playerAnimationTimer - deltaTime
      );
      if (
        this.playerAnimationTimer <= 0 &&
        this.playerAnimationState !== "idle" &&
        !this.isPlayerBlocking
      ) {
        this.playerAnimationState = "idle";
      }
    }
    if (this.enemyAnimationTimer > 0) {
      this.enemyAnimationTimer = Math.max(
        0,
        this.enemyAnimationTimer - deltaTime
      );
      if (
        this.enemyAnimationTimer <= 0 &&
        this.enemyAnimationState !== "idle"
      ) {
        this.enemyAnimationState = "idle";
      }
    }

    // Update block animation state
    if (this.isPlayerBlocking && this.playerAnimationState !== "block") {
      this.playerAnimationState = "block";
    } else if (
      !this.isPlayerBlocking &&
      this.playerAnimationState === "block" &&
      this.playerAnimationTimer <= 0
    ) {
      this.playerAnimationState = "idle";
    }
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
    this.ctx.arc(
      this.playerX,
      this.playerY,
      shieldRadius * 0.6,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    this.ctx.restore();

    // Draw perfect block particles
    this.perfectBlockParticles.forEach((particle) => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.life;
      this.ctx.fillStyle = particle.color || "#00FFFF";
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Draw hit particles
    this.hitParticles.forEach((particle) => {
      const alpha = particle.life / particle.maxLife;
      this.ctx.save();
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Draw block particles
    this.blockParticles.forEach((particle) => {
      const alpha = particle.life / particle.maxLife;
      this.ctx.save();
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Draw attack trail particles
    this.attackTrailParticles.forEach((particle) => {
      const alpha = particle.life / particle.maxLife;
      this.ctx.save();
      this.ctx.globalAlpha = alpha * 0.7;
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
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
    this.ctx.strokeText(
      "PERFECT BLOCK!",
      this.canvas.width / 2,
      this.canvas.height / 2 - 50
    );
    this.ctx.fillText(
      "PERFECT BLOCK!",
      this.canvas.width / 2,
      this.canvas.height / 2 - 50
    );
    this.ctx.restore();
  }

  private drawPerfectBlockIndicator(): void {
    if (!this.isEnemyAttacking || this.enemyStunTimer > 0) {
      return;
    }

    const attackProgress =
      this.enemyAttackDuration / this.enemyAttackTotalDuration;
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
      this.ctx.fillText(
        "Press Ctrl NOW!",
        this.canvas.width / 2,
        indicatorY - 15
      );
    }
  }

  private render(): void {
    // Apply camera offset for screen shake
    this.ctx.save();
    this.ctx.translate(this.cameraOffsetX, this.cameraOffsetY);

    // Clear canvas
    this.ctx.fillStyle = "#0b2e36";
    this.ctx.fillRect(
      -this.cameraOffsetX,
      -this.cameraOffsetY,
      this.canvas.width,
      this.canvas.height
    );

    // Draw level display
    this.ctx.fillStyle = "#8BB8E8";
    this.ctx.font = "24px serif";
    this.ctx.textAlign = "center";
    let levelText = `Level ${this.currentLevel}`;
    if (this.newGamePlusLevel > 0) {
      levelText += ` | NG+ ${this.newGamePlusLevel}`;
    }
    this.ctx.fillText(levelText, this.canvas.width / 2, 35);

    // Draw score display (only during gameplay)
    if (this.gameStatus === "playing") {
      this.ctx.fillStyle = "#FFD700";
      this.ctx.font = "bold 20px sans-serif";
      this.ctx.textAlign = "right";
      this.ctx.fillText(
        `Score: ${this.score.toLocaleString()}`,
        this.canvas.width - 20,
        35
      );

      // Draw score multiplier if above 1.0
      if (this.scoreMultiplier > 1.0) {
        this.ctx.fillStyle = "#FF6B6B";
        this.ctx.font = "bold 16px sans-serif";
        this.ctx.fillText(
          `x${this.scoreMultiplier.toFixed(1)}`,
          this.canvas.width - 20,
          55
        );
      }
    }

    // Draw health bars
    this.drawHealthBar(
      50,
      60,
      this.playerHealth,
      this.maxHealth,
      "The Chosen One"
    );
    const config = this.getCurrentLevelConfig();
    this.drawHealthBar(
      this.canvas.width - 250,
      60,
      this.enemyHealth,
      config.enemyHealth,
      config.enemyName,
      config.enemyColor
    );

    // Draw stamina bar (only during gameplay)
    if (this.gameStatus === "playing") {
      this.drawStaminaBar(50, 110);
    }

    // Draw player
    this.drawCharacter(
      this.playerX,
      this.playerY,
      this.playerWidth,
      this.playerHeight,
      "#8BB8E8",
      this.playerAnimationState,
      false
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
    const flashAlpha = isStunned ? Math.sin(Date.now() / 100) * 0.5 + 0.5 : 1;
    const enemyColor = config.enemyColor;
    const enemyColorRgb = this.hexToRgb(enemyColor);

    // Use animation state, but override with stunned if needed
    let enemyAnimState = this.enemyAnimationState;
    if (isStunned) {
      enemyAnimState = "hit";
    }

    this.drawCharacter(
      this.enemyX,
      this.enemyY,
      this.enemyWidth,
      this.enemyHeight,
      isStunned
        ? `rgba(${enemyColorRgb.r}, ${enemyColorRgb.g}, ${enemyColorRgb.b}, ${flashAlpha})`
        : enemyColor,
      enemyAnimState,
      true // isEnemy = true
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

    // Draw damage numbers
    this.drawDamageNumbers();

    // Draw game status overlays
    if (this.gameStatus === "levelComplete") {
      this.drawLevelComplete();
    } else if (this.gameStatus === "upgradeMenu") {
      this.drawUpgradeMenu();
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

    // Restore camera transform
    this.ctx.restore();
  }

  private drawLevelComplete(): void {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const config = this.getCurrentLevelConfig();

    // Level complete title
    this.ctx.fillStyle = "#8BB8E8";
    this.ctx.font = "bold 48px serif";
    this.ctx.textAlign = "center";
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 4;
    this.ctx.strokeText(
      `Level ${this.currentLevel} Complete!`,
      this.canvas.width / 2,
      this.canvas.height / 2 - 100
    );
    this.ctx.fillText(
      `Level ${this.currentLevel} Complete!`,
      this.canvas.width / 2,
      this.canvas.height / 2 - 100
    );

    // Enemy defeated
    this.ctx.fillStyle = config.enemyColor;
    this.ctx.font = "bold 32px serif";
    this.ctx.strokeText(
      `${config.enemyName} Defeated!`,
      this.canvas.width / 2,
      this.canvas.height / 2 - 40
    );
    this.ctx.fillText(
      `${config.enemyName} Defeated!`,
      this.canvas.width / 2,
      this.canvas.height / 2 - 40
    );

    // Health regeneration message
    const missingHealth = this.maxHealth - this.playerHealth;
    if (missingHealth > 0) {
      const healAmount = missingHealth * 0.5;
      this.ctx.fillStyle = "#4CAF50";
      this.ctx.font = "20px sans-serif";
      this.ctx.fillText(
        `Health Restored: +${Math.ceil(healAmount)}`,
        this.canvas.width / 2,
        this.canvas.height / 2 + 20
      );
    }

    if (this.currentLevel < 5) {
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "24px sans-serif";
      this.ctx.fillText(
        "Preparing next level...",
        this.canvas.width / 2,
        this.canvas.height / 2 + 80
      );
    } else {
      this.ctx.fillStyle = "#FFD700";
      this.ctx.font = "bold 28px sans-serif";
      this.ctx.fillText(
        "All Levels Complete!",
        this.canvas.width / 2,
        this.canvas.height / 2 + 80
      );
    }
  }

  private drawUpgradeMenu(): void {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const centerX = this.canvas.width / 2;
    const startY = this.canvas.height / 2 - 200;

    // Title
    this.ctx.fillStyle = "#FFD700";
    this.ctx.font = "bold 48px serif";
    this.ctx.textAlign = "center";
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 4;
    this.ctx.strokeText("Victory!", centerX, startY);
    this.ctx.fillText("Victory!", centerX, startY);

    // NG+ level display
    this.ctx.fillStyle = "#8BB8E8";
    this.ctx.font = "bold 32px serif";
    this.ctx.strokeText(
      `New Game+ ${this.newGamePlusLevel + 1}`,
      centerX,
      startY + 60
    );
    this.ctx.fillText(
      `New Game+ ${this.newGamePlusLevel + 1}`,
      centerX,
      startY + 60
    );

    // Instructions
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "24px sans-serif";
    this.ctx.fillText("Choose an upgrade:", centerX, startY + 120);

    // Upgrade options
    const currentAttackDamage =
      this.basePlayerDamage + this.attackDamageUpgrades * 20;
    const options = [
      {
        key: "1",
        name: "Health",
        desc: `+20 Max Health (Current: ${this.maxHealth})`,
        type: "health" as const,
      },
      {
        key: "2",
        name: "Stamina",
        desc: `+20 Max Stamina (Current: ${this.maxStamina})`,
        type: "stamina" as const,
      },
      {
        key: "3",
        name: "Perfect Block",
        desc: `-20ms Perfect Block Duration (Current: ${this.perfectBlockDuration}ms)`,
        type: "perfectBlock" as const,
      },
      {
        key: "4",
        name: "Attack Damage",
        desc: `+20 Attack Damage (Current: ${currentAttackDamage})`,
        type: "attackDamage" as const,
      },
    ];

    const optionStartY = startY + 180;
    const optionSpacing = 70; // Reduced spacing to fit 4 options

    options.forEach((option, index) => {
      const y = optionStartY + index * optionSpacing;
      const isSelected = this.selectedUpgrade === option.type;

      // Highlight selected option
      if (isSelected) {
        this.ctx.fillStyle = "rgba(139, 184, 232, 0.3)";
        this.ctx.fillRect(centerX - 300, y - 30, 600, 50);
      }

      // Key indicator
      this.ctx.fillStyle = "#FFD700";
      this.ctx.font = "bold 28px sans-serif";
      this.ctx.fillText(`[${option.key}]`, centerX - 280, y);

      // Option name
      this.ctx.fillStyle = isSelected ? "#8BB8E8" : "#ffffff";
      this.ctx.font = "bold 24px sans-serif";
      this.ctx.fillText(option.name, centerX - 200, y);

      // Description
      this.ctx.fillStyle = "#cccccc";
      this.ctx.font = "18px sans-serif";
      this.ctx.fillText(option.desc, centerX + 50, y);
    });

    // Current upgrade counts
    this.ctx.fillStyle = "#888888";
    this.ctx.font = "16px sans-serif";
    this.ctx.fillText(
      `Upgrades: Health (${this.healthUpgrades}) | Stamina (${this.staminaUpgrades}) | Perfect Block (${this.perfectBlockUpgrades}) | Attack Damage (${this.attackDamageUpgrades})`,
      centerX,
      startY + 450
    );

    // Enemy difficulty multiplier
    const nextMultiplier = this.getEnemyMultiplier(this.newGamePlusLevel + 1);
    this.ctx.fillStyle = "#FF6B6B";
    this.ctx.font = "bold 20px sans-serif";
    this.ctx.fillText(
      `Enemy Difficulty: x${nextMultiplier.toFixed(1)}`,
      centerX,
      startY + 490
    );
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
    const height = 32;
    const percentage = current / max;
    const barColor = color || "#8BB8E8";

    // Background with inner shadow
    this.ctx.fillStyle = "#1a1a1a";
    this.ctx.fillRect(x, y, width, height);
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    this.ctx.fillRect(x + 1, y + 1, width - 2, height - 2);

    // Health bar with gradient
    const gradient = this.ctx.createLinearGradient(x, y, x + width, y);
    const colorRgb = this.hexToRgb(barColor);

    // Color changes based on health percentage
    if (percentage > 0.6) {
      gradient.addColorStop(0, barColor);
      gradient.addColorStop(
        1,
        `rgb(${Math.max(0, colorRgb.r - 50)}, ${Math.max(
          0,
          colorRgb.g - 50
        )}, ${Math.max(0, colorRgb.b - 50)})`
      );
    } else if (percentage > 0.3) {
      // Yellow-orange for medium health
      gradient.addColorStop(0, "#FFA500");
      gradient.addColorStop(1, "#FF8C00");
    } else {
      // Red for low health
      gradient.addColorStop(0, "#FF4444");
      gradient.addColorStop(1, "#CC0000");
    }

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(x + 2, y + 2, (width - 4) * percentage, height - 4);

    // Low health pulsing effect
    if (percentage < 0.3) {
      const pulse = Math.sin(Date.now() / 300) * 0.2 + 0.8;
      this.ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.2})`;
      this.ctx.fillRect(x + 2, y + 2, (width - 4) * percentage, height - 4);
    }

    // Border with glow for low health
    if (percentage < 0.3) {
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = "#FF0000";
    }
    this.ctx.strokeStyle = barColor;
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, width, height);
    this.ctx.shadowBlur = 0;

    // Label
    this.ctx.fillStyle = barColor;
    this.ctx.font = "bold 16px serif";
    this.ctx.textAlign = "left";
    this.ctx.fillText(label, x, y - 5);

    // Health text
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "bold 14px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `${Math.ceil(current)}/${max}`,
      x + width / 2,
      y + height / 2 + 5
    );
  }

  private drawStaminaBar(x: number, y: number): void {
    const width = 200;
    const height = 22;
    const percentage = this.playerStamina / this.maxStamina;
    const barColor = "#FFD700"; // Gold color for stamina

    // Background with rounded corners effect
    this.ctx.fillStyle = "#1a1a1a";
    this.ctx.fillRect(x, y, width, height);

    // Inner shadow effect
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    this.ctx.fillRect(x + 1, y + 1, width - 2, height - 2);

    // Stamina bar with gradient
    const gradient = this.ctx.createLinearGradient(x, y, x + width, y);
    if (percentage > 0.5) {
      gradient.addColorStop(0, barColor);
      gradient.addColorStop(1, "#FFA500"); // Orange gradient
    } else if (percentage > 0.3) {
      gradient.addColorStop(0, "#FFA500");
      gradient.addColorStop(1, "#FF6B00"); // Darker orange
    } else {
      gradient.addColorStop(0, "#FF6B00");
      gradient.addColorStop(1, "#FF0000"); // Red for low stamina
    }
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(x + 2, y + 2, (width - 4) * percentage, height - 4);

    // Low stamina pulsing effect
    if (percentage < 0.3) {
      const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7;
      this.ctx.fillStyle = `rgba(255, 0, 0, ${pulse * 0.3})`;
      this.ctx.fillRect(x + 2, y + 2, (width - 4) * percentage, height - 4);
    }

    // Border with glow effect for low stamina
    if (percentage < 0.3) {
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = "#FF0000";
    }
    this.ctx.strokeStyle = barColor;
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, width, height);
    this.ctx.shadowBlur = 0;

    // Label
    this.ctx.fillStyle = barColor;
    this.ctx.font = "bold 14px serif";
    this.ctx.textAlign = "left";
    this.ctx.fillText("Stamina", x, y - 5);

    // Stamina text
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "bold 12px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `${Math.ceil(this.playerStamina)}/${this.maxStamina}`,
      x + width / 2,
      y + height / 2 + 4
    );
  }

  private drawCharacter(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    animationState: "idle" | "attack" | "block" | "hit",
    isEnemy: boolean = false
  ): void {
    this.ctx.save();

    // Animation-based transformations
    let scaleX = 1;
    let scaleY = 1;
    let offsetX = 0;
    let offsetY = 0;
    let rotation = 0;

    switch (animationState) {
      case "attack":
        // Lean forward slightly, scale up
        scaleX = 1.1;
        scaleY = 0.95;
        // Enemy attacks toward player (left), player attacks toward enemy (right)
        offsetX = isEnemy ? -10 : 10;
        break;
      case "block":
        // Slightly wider stance
        scaleX = 1.05;
        scaleY = 1.05;
        break;
      case "hit":
        // Knockback effect - enemy knocked right, player knocked left
        offsetX = isEnemy ? 15 : -15;
        rotation = isEnemy ? 0.1 : -0.1; // Slight rotation
        break;
      case "idle":
      default:
        // Subtle idle animation (breathing)
        const idleScale = 1 + Math.sin(Date.now() / 1000) * 0.02;
        scaleX = idleScale;
        scaleY = idleScale;
        break;
    }

    // Flip horizontally for enemy
    if (isEnemy) {
      this.ctx.translate(x, y);
      this.ctx.scale(-1, 1); // Flip horizontally
      this.ctx.translate(-x, -y);
    }

    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.scale(scaleX, scaleY);
    this.ctx.translate(-x + offsetX, -y + offsetY);

    // Character body
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - width / 2, y - height / 2, width, height);

    // Character outline
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x - width / 2, y - height / 2, width, height);

    // Animation-specific visual effects
    if (animationState === "attack") {
      // Glow effect during attack
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = color;
      this.ctx.fillRect(x - width / 2, y - height / 2, width, height);
      this.ctx.shadowBlur = 0;
    } else if (animationState === "block") {
      // Shield effect - position based on enemy/player
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      const shieldX = isEnemy ? x + width / 2 - 5 : x - width / 2 - 5;
      this.ctx.fillRect(shieldX, y - height / 2, 10, height);
    } else if (animationState === "hit") {
      // Flash effect
      const flashAlpha = Math.sin(Date.now() / 50) * 0.5 + 0.5;
      this.ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha * 0.5})`;
      this.ctx.fillRect(x - width / 2, y - height / 2, width, height);
    }

    // Simple face
    this.ctx.fillStyle = "#000000";
    // Eyes - adjust for enemy flip
    let eyeOffsetX = 0;
    if (animationState === "attack") {
      eyeOffsetX = isEnemy ? -3 : 3; // Eyes look forward during attack
    } else if (animationState === "hit") {
      eyeOffsetX = isEnemy ? 2 : -2; // Eyes look back during hit
    }
    this.ctx.fillRect(x - 15 + eyeOffsetX, y - 20, 8, 8);
    this.ctx.fillRect(x + 7 + eyeOffsetX, y - 20, 8, 8);

    // Mouth - different expressions based on state
    if (animationState === "attack") {
      // Open mouth (wider)
      this.ctx.fillRect(x - 10, y + 10, 20, 6);
    } else if (animationState === "hit") {
      // Surprised mouth (smaller)
      this.ctx.fillRect(x - 6, y + 12, 12, 4);
    } else {
      // Normal mouth
      this.ctx.fillRect(x - 8, y + 10, 16, 4);
    }

    this.ctx.restore();
  }

  private drawAttackEffect(
    x: number,
    y: number,
    type: "player" | "enemy"
  ): void {
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

  private drawDamageNumbers(): void {
    this.damageNumbers.forEach((num) => {
      const alpha = num.life / num.maxLife;
      const scale = 1 + (1 - alpha) * 0.5; // Scale up as it fades

      this.ctx.save();
      this.ctx.globalAlpha = alpha;
      this.ctx.translate(num.x, num.y - num.offsetY);
      this.ctx.scale(scale, scale);

      // Color based on type
      if (num.type === "player") {
        this.ctx.fillStyle = "#8BB8E8";
        this.ctx.strokeStyle = "#4A6FA5";
      } else {
        const config = this.getCurrentLevelConfig();
        this.ctx.fillStyle = config.enemyColor;
        const enemyColorRgb = this.hexToRgb(config.enemyColor);
        this.ctx.strokeStyle = `rgb(${Math.max(
          0,
          enemyColorRgb.r - 50
        )}, ${Math.max(0, enemyColorRgb.g - 50)}, ${Math.max(
          0,
          enemyColorRgb.b - 50
        )})`;
      }

      // Draw text with outline
      this.ctx.font = "bold 24px sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.lineWidth = 3;
      this.ctx.strokeText(`-${Math.ceil(num.value)}`, 0, 0);
      this.ctx.fillText(`-${Math.ceil(num.value)}`, 0, 0);

      this.ctx.restore();
    });
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
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Title
    this.ctx.fillStyle = color;
    this.ctx.font = "bold 48px serif";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      text,
      this.canvas.width / 2,
      this.canvas.height / 2 - 200
    );

    // NG+ level display
    if (this.newGamePlusLevel > 0) {
      this.ctx.fillStyle = "#8BB8E8";
      this.ctx.font = "bold 28px serif";
      this.ctx.fillText(
        `New Game+ ${this.newGamePlusLevel}`,
        this.canvas.width / 2,
        this.canvas.height / 2 - 150
      );
    }

    // Score
    this.ctx.fillStyle = "#FFD700";
    this.ctx.font = "bold 32px sans-serif";
    this.ctx.fillText(
      `Final Score: ${this.score.toLocaleString()}`,
      this.canvas.width / 2,
      this.canvas.height / 2 - 100
    );

    // Upgrade summary
    if (
      this.healthUpgrades > 0 ||
      this.staminaUpgrades > 0 ||
      this.perfectBlockUpgrades > 0 ||
      this.attackDamageUpgrades > 0
    ) {
      this.ctx.fillStyle = "#4CAF50";
      this.ctx.font = "bold 20px sans-serif";
      this.ctx.fillText(
        "Upgrades:",
        this.canvas.width / 2,
        this.canvas.height / 2 - 50
      );
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "18px sans-serif";
      const upgradeText = [
        this.healthUpgrades > 0 ? `Health: +${this.healthUpgrades * 20}` : null,
        this.staminaUpgrades > 0
          ? `Stamina: +${this.staminaUpgrades * 20}`
          : null,
        this.perfectBlockUpgrades > 0
          ? `Perfect Block: -${this.perfectBlockUpgrades * 20}ms`
          : null,
        this.attackDamageUpgrades > 0
          ? `Attack Damage: +${this.attackDamageUpgrades * 20}`
          : null,
      ]
        .filter(Boolean)
        .join(" | ");
      this.ctx.fillText(
        upgradeText,
        this.canvas.width / 2,
        this.canvas.height / 2 - 20
      );
    }

    // Statistics panel
    const upgradeOffset =
      this.healthUpgrades > 0 ||
      this.staminaUpgrades > 0 ||
      this.perfectBlockUpgrades > 0 ||
      this.attackDamageUpgrades > 0
        ? 30
        : 0;
    const statsY = this.canvas.height / 2 + upgradeOffset;
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "bold 24px sans-serif";
    this.ctx.fillText("Statistics", this.canvas.width / 2, statsY);

    this.ctx.font = "18px sans-serif";
    const stats = [
      `Damage Dealt: ${this.stats.totalDamageDealt}`,
      `Perfect Blocks: ${this.stats.perfectBlocks}`,
      `Attacks Blocked: ${this.stats.attacksBlocked}`,
      `Hits Taken: ${this.stats.hitsTaken}`,
      `Total Attacks: ${this.stats.totalAttacks}`,
    ];

    stats.forEach((stat, index) => {
      this.ctx.fillText(stat, this.canvas.width / 2, statsY + 35 + index * 25);
    });

    // Restart hint
    this.ctx.fillStyle = "#cccccc";
    this.ctx.font = "20px sans-serif";
    this.ctx.fillText(
      "Press R to restart",
      this.canvas.width / 2,
      this.canvas.height / 2 + 200
    );
  }

  private drawControlsHint(): void {
    const hintWidth = 280;
    const hintHeight = 90;
    const hintX = 15;
    const hintY = this.canvas.height - hintHeight - 15;

    // Background with border
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(hintX, hintY, hintWidth, hintHeight);
    this.ctx.strokeStyle = "#8BB8E8";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(hintX, hintY, hintWidth, hintHeight);

    // Title
    this.ctx.fillStyle = "#8BB8E8";
    this.ctx.font = "bold 16px sans-serif";
    this.ctx.textAlign = "left";
    this.ctx.fillText("Controls", hintX + 10, hintY + 22);

    // Control items
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "14px sans-serif";
    this.ctx.fillText("Space - Attack", hintX + 10, hintY + 45);
    this.ctx.fillText("Ctrl - Block", hintX + 10, hintY + 65);

    // Stamina warning if low
    if (this.playerStamina < 30) {
      this.ctx.fillStyle = "#FF6B6B";
      this.ctx.font = "bold 12px sans-serif";
      this.ctx.fillText("Low Stamina!", hintX + 10, hintY + 82);
    }
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
    // Preserve NG+ level and upgrades - don't reset them
    // Only reset current playthrough state
    this.currentLevel = 1;
    // Apply upgrades to player stats (flat +20 increments)
    this.maxHealth = this.baseMaxHealth + this.healthUpgrades * 20;
    this.maxStamina = this.baseMaxStamina + this.staminaUpgrades * 20;
    this.perfectBlockDuration = Math.max(
      100,
      this.basePerfectBlockDuration - this.perfectBlockUpgrades * 20
    );
    // Attack damage upgrades are applied directly in damage calculation
    this.playerHealth = this.maxHealth;
    this.enemyHealth = 100; // Will be set by initializeLevel()
    this.playerStamina = this.maxStamina;
    this.score = 0;
    this.scoreMultiplier = 1.0;
    this.stats = {
      totalDamageDealt: 0,
      perfectBlocks: 0,
      attacksBlocked: 0,
      hitsTaken: 0,
      totalAttacks: 0,
    };
    this.playerAnimationState = "idle";
    this.playerAnimationTimer = 0;
    this.enemyAnimationState = "idle";
    this.enemyAnimationTimer = 0;
    this.lastPlayerHitTime = 0;
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
    this.damageNumbers = [];
    this.perfectBlockActive = false;
    this.perfectBlockParticles = [];
    this.hitParticles = [];
    this.blockParticles = [];
    this.attackTrailParticles = [];
    this.perfectBlockTimer = 0;
    this.perfectBlockParticles = [];
    this.perfectBlockAttempted = false;
    this.wasCtrlHeld = false;
    this.gameStatus = "playing";
    this.levelCompleteTimer = 0;
    this.selectedUpgrade = null;
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
