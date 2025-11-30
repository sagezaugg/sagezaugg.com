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

  // Display dimensions (CSS pixels, not scaled by DPR)
  private displayWidth: number = 0;
  private displayHeight: number = 0;

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
  private playerSpearBaseY: number = 0; // Base position Y when idle

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
  private enemySpearBaseY: number = 0; // Base position Y when idle

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
    | "intro"
    | "playing"
    | "levelComplete"
    | "playerWon"
    | "enemyWon"
    | "upgradeMenu" = "intro";

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
  private touchstartHandler: (e: TouchEvent) => void;
  private touchendHandler: (e: TouchEvent) => void;
  private touchcancelHandler: (e: TouchEvent) => void;
  private clickHandler: (e: MouseEvent) => void;

  // Touch state tracking
  private activeTouches: Map<number, { type: "attack" | "block" }> = new Map();

  // Mobile control button states
  private isAttackButtonPressed: boolean = false;
  private isBlockButtonPressed: boolean = false;

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

      // Handle intro screen - start game on Enter or Space
      if (this.gameStatus === "intro") {
        if (e.code === "Enter" || e.code === "Space") {
          e.preventDefault();
          this.gameStatus = "playing";
        }
        return;
      }

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

    // Touch event handlers
    this.touchstartHandler = (e: TouchEvent) => {
      e.preventDefault();
      this.handleTouchStart(e);
    };
    this.touchendHandler = (e: TouchEvent) => {
      e.preventDefault();
      this.handleTouchEnd(e);
    };
    this.touchcancelHandler = (e: TouchEvent) => {
      e.preventDefault();
      this.handleTouchEnd(e);
    };
    this.clickHandler = (e: MouseEvent) => {
      // Handle intro screen - any click starts the game
      if (this.gameStatus === "intro") {
        e.preventDefault();
        this.gameStatus = "playing";
      }
    };

    // Set canvas size
    this.resize();
    window.addEventListener("resize", this.resizeHandler);

    // Keyboard event listeners
    window.addEventListener("keydown", this.keydownHandler);
    window.addEventListener("keyup", this.keyupHandler);

    // Touch event listeners
    this.canvas.addEventListener("touchstart", this.touchstartHandler, {
      passive: false,
    });
    this.canvas.addEventListener("touchend", this.touchendHandler, {
      passive: false,
    });
    this.canvas.addEventListener("touchcancel", this.touchcancelHandler, {
      passive: false,
    });

    // Click event listener for intro screen
    this.canvas.addEventListener("click", this.clickHandler);

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
    // Preserve intro status if already set, otherwise set to playing
    if (this.gameStatus !== "intro") {
      this.gameStatus = "playing";
    }
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
    if (this.isMobile()) {
      // Portrait mode: spears positioned to the sides
      // Player spear floats to the right of player
      this.playerSpearBaseX = this.playerX + this.playerWidth / 2 + 20;
      this.playerSpearBaseY = this.playerY;
      this.playerSpearY = this.playerSpearBaseY;
      // Enemy spear floats to the left of enemy
      this.enemySpearBaseX = this.enemyX - this.enemyWidth / 2 - 20;
      this.enemySpearBaseY = this.enemyY;
      this.enemySpearY = this.enemySpearBaseY;
    } else {
      // Landscape mode: original positioning
      // Player spear floats to the right of player
      this.playerSpearBaseX = this.playerX + this.playerWidth / 2 + 20;
      this.playerSpearBaseY = this.playerY;
      this.playerSpearY = this.playerSpearBaseY;
      // Enemy spear floats to the left of enemy
      this.enemySpearBaseX = this.enemyX - this.enemyWidth / 2 - 20;
      this.enemySpearBaseY = this.enemyY;
      this.enemySpearY = this.enemySpearBaseY;
    }

    // Update current positions based on attack progress
    if (this.playerSpearProgress === 0) {
      this.playerSpearX = this.playerSpearBaseX;
    }
    if (this.enemySpearProgress === 0) {
      this.enemySpearX = this.enemySpearBaseX;
    }
  }

  private isMobile(): boolean {
    // Check viewport width, not canvas width (which changes based on mode)
    return window.innerWidth < 768;
  }

  private getFontSize(baseSize: number): string {
    const scale = this.isMobile() ? Math.max(0.7, this.displayWidth / 768) : 1;
    return `${Math.round(baseSize * scale)}px`;
  }

  private resize(): void {
    const container = this.canvas.parentElement;
    if (container) {
      const rect = container.getBoundingClientRect();
      const isMobile = rect.width < 768;
      const dpr = window.devicePixelRatio || 1;

      let displayWidth: number;
      let displayHeight: number;

      if (isMobile) {
        // Portrait mode for mobile (9:16 aspect ratio)
        // Account for padding (p-4 = 16px on each side = 32px total)
        const containerWidth = rect.width - 32;
        // Use more of the viewport height for mobile (80% instead of 70%)
        const maxHeight = window.innerHeight * 0.8;

        // Calculate portrait dimensions - taller than wide
        // Try to use full container width, but constrain by max height
        const heightFromWidth = containerWidth * (16 / 9);
        if (heightFromWidth <= maxHeight) {
          // Container width fits within max height
          displayWidth = containerWidth;
          displayHeight = heightFromWidth;
        } else {
          // Constrain by height
          displayHeight = maxHeight;
          displayWidth = displayHeight * (9 / 16);
        }
      } else {
        // Landscape mode for desktop (16:9 aspect ratio)
        // Account for padding (p-4 = 16px on each side = 32px total)
        const containerWidth = rect.width - 32;

        // Use full container width for maximum size
        displayWidth = containerWidth;
        displayHeight = displayWidth / (16 / 9);

        // Ensure minimum reasonable size
        const minWidth = 600;
        if (displayWidth < minWidth) {
          displayWidth = minWidth;
          displayHeight = displayWidth / (16 / 9);
        }
      }

      // Store display dimensions for UI positioning
      this.displayWidth = displayWidth;
      this.displayHeight = displayHeight;

      // Set the actual size in memory (scaled by device pixel ratio)
      this.canvas.width = displayWidth * dpr;
      this.canvas.height = displayHeight * dpr;

      // Set the display size (CSS pixels)
      this.canvas.style.width = `${displayWidth}px`;
      this.canvas.style.height = `${displayHeight}px`;

      // Reset the transform matrix and scale the context to account for device pixel ratio
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);

      // Update positions relative to display size (not scaled size)
      if (isMobile) {
        // Portrait mode: characters positioned vertically
        this.playerX = displayWidth * 0.5;
        this.enemyX = displayWidth * 0.5;
        // Position characters vertically - player higher, enemy lower
        // Leave room for health bars at top (around 150px) and controls at bottom
        this.playerY = displayHeight * 0.4;
        this.enemyY = displayHeight * 0.7;
      } else {
        // Landscape mode: characters positioned horizontally
        this.playerX = Math.min(150, displayWidth * 0.2);
        this.enemyX = Math.max(displayWidth - 150, displayWidth * 0.8);
        // Update Y position to center vertically in new canvas height
        this.playerY = displayHeight * 0.5;
        this.enemyY = displayHeight * 0.5;
      }
      this.updateSpearPositions();
    }
  }

  public handlePlayerAttack(): void {
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

    // Reset perfect block attempt flag when player attacks
    // This ensures perfect blocks work correctly after attacking
    this.perfectBlockAttempted = false;

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

  public handlePlayerBlock(): void {
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

  public checkPerfectBlockOnPress(): void {
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
      const spearTravelDistance = this.isMobile() ? 150 : 200; // pixels
      if (this.isMobile()) {
        // Portrait mode: spear moves upward toward player
        this.enemySpearX = this.enemySpearBaseX;
        this.enemySpearY =
          this.enemySpearBaseY - spearTravelDistance * this.enemySpearProgress;
      } else {
        // Landscape mode: spear moves horizontally
        this.enemySpearX =
          this.enemySpearBaseX - spearTravelDistance * this.enemySpearProgress;
        this.enemySpearY = this.enemySpearBaseY;
      }

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
      const spearTravelDistance = this.isMobile() ? 150 : 200; // pixels
      if (this.isMobile()) {
        // Portrait mode: spear moves downward toward enemy
        this.playerSpearX = this.playerSpearBaseX;
        this.playerSpearY =
          this.playerSpearBaseY +
          spearTravelDistance * this.playerSpearProgress;
      } else {
        // Landscape mode: spear moves horizontally
        this.playerSpearX =
          this.playerSpearBaseX +
          spearTravelDistance * this.playerSpearProgress;
        this.playerSpearY = this.playerSpearBaseY;
      }

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
    const spearLength = this.isMobile() ? 50 : 60;
    const spearWidth = this.isMobile() ? 2.5 : 3;
    const tipLength = this.isMobile() ? 12 : 15;
    const isPortrait = this.isMobile();

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

    if (isPortrait) {
      // Portrait mode: draw spear vertically
      // Draw spear shaft (vertical)
      this.ctx.fillStyle = spearColor;
      this.ctx.fillRect(x - spearWidth / 2, y, spearWidth, spearLength);

      // Draw spear tip
      if (isEnemy) {
        // Enemy spear points up (toward player)
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - tipLength); // Tip point (furthest up)
        this.ctx.lineTo(x - spearWidth * 2, y); // Left base vertex (at shaft)
        this.ctx.lineTo(x + spearWidth * 2, y); // Right base vertex (at shaft)
        this.ctx.closePath();
        this.ctx.fill();
      } else {
        // Player spear points down (toward enemy)
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + spearLength + tipLength); // Tip point (furthest down)
        this.ctx.lineTo(x - spearWidth * 2, y + spearLength); // Left base vertex (at shaft)
        this.ctx.lineTo(x + spearWidth * 2, y + spearLength); // Right base vertex (at shaft)
        this.ctx.closePath();
        this.ctx.fill();
      }
    } else {
      // Landscape mode: draw spear horizontally
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
    }

    // Add glow effect if attacking
    if (progress > 0 && progress < 1) {
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = spearColor;
      if (isPortrait) {
        this.ctx.fillRect(x - spearWidth / 2, y, spearWidth, spearLength);
      } else {
        this.ctx.fillRect(x, y - spearWidth / 2, spearLength, spearWidth);
      }
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
    this.ctx.font = `bold ${this.getFontSize(32)} serif`;
    this.ctx.textAlign = "center";
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = this.isMobile() ? 2 : 4;
    const perfectBlockY = this.isMobile()
      ? this.displayHeight / 2 - 30
      : this.displayHeight / 2 - 50;
    this.ctx.strokeText("PERFECT BLOCK!", this.displayWidth / 2, perfectBlockY);
    this.ctx.fillText("PERFECT BLOCK!", this.displayWidth / 2, perfectBlockY);
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
    const indicatorY = this.isMobile()
      ? (this.playerY + this.enemyY) / 2 - 10
      : this.playerY - 80;
    const indicatorWidth = this.isMobile()
      ? Math.min(280, this.displayWidth - 40)
      : 300;
    const indicatorHeight = this.isMobile() ? 10 : 12;
    const x = this.displayWidth / 2 - indicatorWidth / 2;

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
      this.ctx.font = `bold ${this.getFontSize(14)} sans-serif`;
      this.ctx.textAlign = "center";
      const labelText = this.isMobile() ? "BLOCK NOW!" : "Press Ctrl NOW!";
      this.ctx.fillText(labelText, this.displayWidth / 2, indicatorY - 15);
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
      this.displayWidth,
      this.displayHeight
    );

    // Skip game rendering during intro
    if (this.gameStatus !== "intro") {
      // Draw level display
      this.ctx.fillStyle = "#8BB8E8";
      this.ctx.font = `${this.getFontSize(24)} serif`;
      this.ctx.textAlign = "center";
      let levelText = `Level ${this.currentLevel}`;
      if (this.newGamePlusLevel > 0) {
        levelText += ` | NG+ ${this.newGamePlusLevel}`;
      }
      const levelY = this.isMobile() ? 25 : 35;
      this.ctx.fillText(levelText, this.displayWidth / 2, levelY);

      // Draw score display (only during gameplay)
      if (this.gameStatus === "playing") {
        this.ctx.fillStyle = "#FFD700";
        this.ctx.font = `bold ${this.getFontSize(20)} sans-serif`;
        this.ctx.textAlign = "right";
        const scoreX = this.isMobile()
          ? this.displayWidth - 10
          : this.displayWidth - 20;
        const scoreY = this.isMobile() ? 25 : 35;
        this.ctx.fillText(
          `Score: ${this.score.toLocaleString()}`,
          scoreX,
          scoreY
        );

        // Draw score multiplier if above 1.0
        if (this.scoreMultiplier > 1.0) {
          this.ctx.fillStyle = "#FF6B6B";
          this.ctx.font = `bold ${this.getFontSize(16)} sans-serif`;
          this.ctx.fillText(
            `x${this.scoreMultiplier.toFixed(1)}`,
            scoreX,
            scoreY + (this.isMobile() ? 18 : 20)
          );
        }
      }

      // Draw health bars
      const config = this.getCurrentLevelConfig();

      if (this.isMobile()) {
        // Portrait mode: stack health bars vertically, centered
        const healthBarWidth = Math.min(180, this.displayWidth - 40);
        const centerX = this.displayWidth / 2;

        // Player health bar at top
        const playerHealthBarX = centerX - healthBarWidth / 2;
        const playerHealthBarY = 50;
        this.drawHealthBar(
          playerHealthBarX,
          playerHealthBarY,
          this.playerHealth,
          this.maxHealth,
          "The Chosen One",
          undefined,
          healthBarWidth
        );

        // Stamina bar under player health bar (only during gameplay)
        if (this.gameStatus === "playing") {
          // Position stamina bar right under the player health bar
          const healthBarHeight = 32;
          const staminaBarY = playerHealthBarY + healthBarHeight + 10;
          this.drawStaminaBar(playerHealthBarX, staminaBarY, healthBarWidth);
        }

        // Enemy health bar below enemy character
        const enemyHealthBarY = this.enemyY + this.enemyHeight / 2 + 30;
        this.drawHealthBar(
          playerHealthBarX,
          enemyHealthBarY,
          this.enemyHealth,
          config.enemyHealth,
          config.enemyName,
          config.enemyColor,
          healthBarWidth
        );
      } else {
        // Landscape mode: side by side
        const healthBarX = 50;
        const healthBarY = 60;
        const healthBarWidth = 200;
        this.drawHealthBar(
          healthBarX,
          healthBarY,
          this.playerHealth,
          this.maxHealth,
          "The Chosen One",
          undefined,
          healthBarWidth
        );
        const enemyHealthBarX = this.displayWidth - 250;
        this.drawHealthBar(
          enemyHealthBarX,
          healthBarY,
          this.enemyHealth,
          config.enemyHealth,
          config.enemyName,
          config.enemyColor,
          healthBarWidth
        );

        // Draw stamina bar (only during gameplay)
        if (this.gameStatus === "playing") {
          const staminaBarY = 110;
          this.drawStaminaBar(healthBarX, staminaBarY, healthBarWidth);
        }
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
    }

    // Draw game status overlays
    if (this.gameStatus === "intro") {
      this.drawIntro();
    } else if (this.gameStatus === "levelComplete") {
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

    // Draw mobile controls (on top of everything)
    this.drawMobileControls();

    // Restore camera transform
    this.ctx.restore();
  }

  private drawIntro(): void {
    // Dark background overlay
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);

    const centerX = this.displayWidth / 2;

    // Calculate total content height to center vertically
    // Title: ~60px (mobile) / ~80px (desktop)
    // Description: ~30px (mobile) / ~50px (desktop)
    // Controls header: ~25px (mobile) / ~50px (desktop)
    // Controls: 3-4 items * ~20-30px
    // Tips: 4 items * ~18-28px
    // Start prompt: ~20px (mobile) / ~40px (desktop)

    // Start from a calculated top position to center content
    let currentY = this.isMobile() ? 60 : this.displayHeight * 0.15;

    // Title
    this.ctx.fillStyle = "#D4AF37"; // Gold
    this.ctx.font = `bold ${this.getFontSize(this.isMobile() ? 40 : 48)} serif`;
    this.ctx.textAlign = "center";
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = this.isMobile() ? 2 : 4;
    this.ctx.strokeText("Tiny Souls", centerX, currentY);
    this.ctx.fillText("Tiny Souls", centerX, currentY);
    currentY += this.isMobile() ? 35 : 60;

    // Description
    this.ctx.fillStyle = "#8BB8E8"; // Light blue
    this.ctx.font = `${this.getFontSize(this.isMobile() ? 14 : 18)} sans-serif`;
    const description = this.isMobile()
      ? "A challenging combat game where timing and strategy matter."
      : "A challenging combat game where timing and strategy matter.";

    // Split description into lines if needed for mobile
    if (this.isMobile()) {
      const words = description.split(" ");
      let line = "";
      const maxWidth = this.displayWidth - 40;
      words.forEach((word) => {
        const testLine = line + (line ? " " : "") + word;
        const metrics = this.ctx.measureText(testLine);
        if (metrics.width > maxWidth && line) {
          this.ctx.fillText(line, centerX, currentY);
          currentY += 20;
          line = word;
        } else {
          line = testLine;
        }
      });
      if (line) {
        this.ctx.fillText(line, centerX, currentY);
        currentY += 30;
      }
    } else {
      this.ctx.fillText(description, centerX, currentY);
      currentY += 50;
    }

    // Controls section
    this.ctx.fillStyle = "#D4AF37"; // Gold
    this.ctx.font = `bold ${this.getFontSize(this.isMobile() ? 20 : 24)} serif`;
    this.ctx.fillText("Controls:", centerX, currentY);
    currentY += this.isMobile() ? 25 : 40;

    this.ctx.fillStyle = "#8BB8E8"; // Light blue
    this.ctx.font = `${this.getFontSize(this.isMobile() ? 14 : 16)} sans-serif`;
    this.ctx.textAlign = "center";

    // Show mobile controls for mobile, PC controls for desktop
    const controls = this.isMobile()
      ? [
          "Tap ATTACK button - Attack",
          "Tap BLOCK button - Block",
          "Tap both - Perfect Block",
        ]
      : [
          "Space - Attack",
          "Ctrl - Block",
          "Ctrl + Space - Perfect Block (timed)",
          "R - Restart",
        ];

    controls.forEach((control) => {
      this.ctx.fillText(control, centerX, currentY);
      currentY += this.isMobile() ? 20 : 25;
    });

    currentY += this.isMobile() ? 15 : 25;

    // Tips section
    this.ctx.fillStyle = "#2D5A7A"; // Teal
    this.ctx.font = `${this.getFontSize(this.isMobile() ? 12 : 14)} sans-serif`;
    const tips = this.isMobile()
      ? [
          "• Manage stamina - attacks/blocks consume it",
          "• Perfect blocks stun & restore stamina",
          "• Defeat enemies to progress",
          "• Choose upgrades between levels",
        ]
      : [
          "• Manage your stamina - attacks and blocks consume it",
          "• Perfect blocks stun enemies and restore stamina",
          "• Defeat enemies to progress through levels",
          "• Choose upgrades between levels",
        ];

    tips.forEach((tip) => {
      this.ctx.fillText(tip, centerX, currentY);
      currentY += this.isMobile() ? 18 : 22;
    });

    // Start prompt - ensure it's visible
    currentY += this.isMobile() ? 20 : 30;
    // Make sure prompt doesn't go below screen
    const maxY = this.displayHeight - (this.isMobile() ? 30 : 50);
    if (currentY > maxY) {
      currentY = maxY;
    }

    this.ctx.fillStyle = "#D4AF37"; // Gold
    this.ctx.font = `bold ${this.getFontSize(this.isMobile() ? 18 : 20)} serif`;
    const startText = this.isMobile()
      ? "Tap anywhere to start"
      : "Press Enter, Space, or Click to Start";
    this.ctx.fillText(startText, centerX, currentY);
  }

  private drawLevelComplete(): void {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
    this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);

    const config = this.getCurrentLevelConfig();

    // Level complete title
    this.ctx.fillStyle = "#8BB8E8";
    this.ctx.font = `bold ${this.getFontSize(48)} serif`;
    this.ctx.textAlign = "center";
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = this.isMobile() ? 2 : 4;
    const titleY = this.isMobile()
      ? this.displayHeight / 2 - 60
      : this.displayHeight / 2 - 100;
    this.ctx.strokeText(
      `Level ${this.currentLevel} Complete!`,
      this.displayWidth / 2,
      titleY
    );
    this.ctx.fillText(
      `Level ${this.currentLevel} Complete!`,
      this.displayWidth / 2,
      titleY
    );

    // Enemy defeated
    this.ctx.fillStyle = config.enemyColor;
    this.ctx.font = `bold ${this.getFontSize(32)} serif`;
    const defeatedY = this.isMobile()
      ? this.displayHeight / 2 - 20
      : this.displayHeight / 2 - 40;
    this.ctx.strokeText(
      `${config.enemyName} Defeated!`,
      this.displayWidth / 2,
      defeatedY
    );
    this.ctx.fillText(
      `${config.enemyName} Defeated!`,
      this.displayWidth / 2,
      defeatedY
    );

    // Health regeneration message
    const missingHealth = this.maxHealth - this.playerHealth;
    if (missingHealth > 0) {
      const healAmount = missingHealth * 0.5;
      this.ctx.fillStyle = "#4CAF50";
      this.ctx.font = `${this.getFontSize(20)} sans-serif`;
      this.ctx.fillText(
        `Health Restored: +${Math.ceil(healAmount)}`,
        this.displayWidth / 2,
        this.displayHeight / 2 + (this.isMobile() ? 10 : 20)
      );
    }

    if (this.currentLevel < 5) {
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = `${this.getFontSize(24)} sans-serif`;
      this.ctx.fillText(
        "Preparing next level...",
        this.displayWidth / 2,
        this.displayHeight / 2 + (this.isMobile() ? 50 : 80)
      );
    } else {
      this.ctx.fillStyle = "#FFD700";
      this.ctx.font = `bold ${this.getFontSize(28)} sans-serif`;
      this.ctx.fillText(
        "All Levels Complete!",
        this.displayWidth / 2,
        this.displayHeight / 2 + (this.isMobile() ? 50 : 80)
      );
    }
  }

  private drawUpgradeMenu(): void {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);

    const centerX = this.displayWidth / 2;
    const startY = this.displayHeight / 2 - 200;

    // Title
    this.ctx.fillStyle = "#FFD700";
    this.ctx.font = `bold ${this.getFontSize(48)} serif`;
    this.ctx.textAlign = "center";
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = this.isMobile() ? 2 : 4;
    const victoryStartY = this.isMobile()
      ? this.displayHeight / 2 - 120
      : startY;
    this.ctx.strokeText("Victory!", centerX, victoryStartY);
    this.ctx.fillText("Victory!", centerX, victoryStartY);

    // NG+ level display
    this.ctx.fillStyle = "#8BB8E8";
    this.ctx.font = `bold ${this.getFontSize(32)} serif`;
    const ngPlusY = this.isMobile() ? victoryStartY + 40 : victoryStartY + 60;
    this.ctx.strokeText(
      `New Game+ ${this.newGamePlusLevel + 1}`,
      centerX,
      ngPlusY
    );
    this.ctx.fillText(
      `New Game+ ${this.newGamePlusLevel + 1}`,
      centerX,
      ngPlusY
    );

    // Instructions
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = `${this.getFontSize(24)} sans-serif`;
    const instructionsY = this.isMobile()
      ? victoryStartY + 80
      : victoryStartY + 120;
    const instructionText = this.isMobile()
      ? "Tap an upgrade:"
      : "Choose an upgrade:";
    this.ctx.fillText(instructionText, centerX, instructionsY);

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

    const optionStartY = this.isMobile() ? instructionsY + 40 : startY + 180;
    const optionSpacing = this.isMobile() ? 55 : 70;
    const optionWidth = this.isMobile() ? this.displayWidth - 40 : 600;
    const optionLeft = this.isMobile() ? 20 : centerX - 300;

    options.forEach((option, index) => {
      const y = optionStartY + index * optionSpacing;
      const isSelected = this.selectedUpgrade === option.type;

      // Check if this option is being touched (for visual feedback)
      const isTouched =
        this.upgradeMenuTouchY !== null &&
        this.upgradeMenuTouchY >= y - 35 &&
        this.upgradeMenuTouchY <= y + 25;

      // Highlight selected or touched option
      if (isSelected || isTouched) {
        this.ctx.fillStyle = isTouched
          ? "rgba(139, 184, 232, 0.5)"
          : "rgba(139, 184, 232, 0.3)";
        this.ctx.fillRect(optionLeft, y - 30, optionWidth, 50);
      }

      // Key indicator (hide on mobile or make smaller)
      if (!this.isMobile()) {
        this.ctx.fillStyle = "#FFD700";
        this.ctx.font = `bold ${this.getFontSize(28)} sans-serif`;
        this.ctx.fillText(`[${option.key}]`, optionLeft + 20, y);
      }

      // Option name
      this.ctx.fillStyle = isSelected ? "#8BB8E8" : "#ffffff";
      this.ctx.font = `bold ${this.getFontSize(24)} sans-serif`;
      const nameX = this.isMobile() ? optionLeft + 10 : optionLeft + 120;
      this.ctx.fillText(option.name, nameX, y);

      // Description
      this.ctx.fillStyle = "#cccccc";
      this.ctx.font = `${this.getFontSize(18)} sans-serif`;
      const descX = this.isMobile() ? optionLeft + 10 : centerX + 50;
      const descY = this.isMobile() ? y + 20 : y;
      this.ctx.fillText(option.desc, descX, descY);
    });

    // Current upgrade counts
    this.ctx.fillStyle = "#888888";
    this.ctx.font = `${this.getFontSize(16)} sans-serif`;
    const upgradeCountsY = this.isMobile()
      ? optionStartY + 4 * optionSpacing + 30
      : startY + 450;
    const upgradeText = this.isMobile()
      ? `Upgrades: H(${this.healthUpgrades}) S(${this.staminaUpgrades}) PB(${this.perfectBlockUpgrades}) AD(${this.attackDamageUpgrades})`
      : `Upgrades: Health (${this.healthUpgrades}) | Stamina (${this.staminaUpgrades}) | Perfect Block (${this.perfectBlockUpgrades}) | Attack Damage (${this.attackDamageUpgrades})`;
    this.ctx.fillText(upgradeText, centerX, upgradeCountsY);

    // Enemy difficulty multiplier
    const nextMultiplier = this.getEnemyMultiplier(this.newGamePlusLevel + 1);
    this.ctx.fillStyle = "#FF6B6B";
    this.ctx.font = `bold ${this.getFontSize(20)} sans-serif`;
    this.ctx.fillText(
      `Enemy Difficulty: x${nextMultiplier.toFixed(1)}`,
      centerX,
      upgradeCountsY + (this.isMobile() ? 25 : 40)
    );
  }

  private drawHealthBar(
    x: number,
    y: number,
    current: number,
    max: number,
    label: string,
    color?: string,
    width: number = 200
  ): void {
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
    this.ctx.font = `bold ${this.getFontSize(16)} serif`;
    this.ctx.textAlign = "left";
    this.ctx.fillText(label, x, y - 5);

    // Health text
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = `bold ${this.getFontSize(14)} sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `${Math.ceil(current)}/${max}`,
      x + width / 2,
      y + height / 2 + 5
    );
  }

  private drawStaminaBar(x: number, y: number, width: number = 200): void {
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
    this.ctx.font = `bold ${this.getFontSize(14)} serif`;
    this.ctx.textAlign = "left";
    this.ctx.fillText("Stamina", x, y - 5);

    // Stamina text
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = `bold ${this.getFontSize(12)} sans-serif`;
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
      this.ctx.font = `bold ${this.getFontSize(24)} sans-serif`;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.lineWidth = this.isMobile() ? 2 : 3;
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
    this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);

    // Title
    this.ctx.fillStyle = color;
    this.ctx.font = `bold ${this.getFontSize(48)} serif`;
    this.ctx.textAlign = "center";
    const titleY = this.isMobile()
      ? this.displayHeight / 2 - 120
      : this.displayHeight / 2 - 200;
    this.ctx.fillText(text, this.displayWidth / 2, titleY);

    // NG+ level display
    if (this.newGamePlusLevel > 0) {
      this.ctx.fillStyle = "#8BB8E8";
      this.ctx.font = `bold ${this.getFontSize(28)} serif`;
      this.ctx.fillText(
        `New Game+ ${this.newGamePlusLevel}`,
        this.displayWidth / 2,
        titleY + (this.isMobile() ? 35 : 50)
      );
    }

    // Score
    this.ctx.fillStyle = "#FFD700";
    this.ctx.font = `bold ${this.getFontSize(32)} sans-serif`;
    this.ctx.fillText(
      `Final Score: ${this.score.toLocaleString()}`,
      this.displayWidth / 2,
      titleY + (this.isMobile() ? 70 : 100)
    );

    // Upgrade summary
    if (
      this.healthUpgrades > 0 ||
      this.staminaUpgrades > 0 ||
      this.perfectBlockUpgrades > 0 ||
      this.attackDamageUpgrades > 0
    ) {
      this.ctx.fillStyle = "#4CAF50";
      this.ctx.font = `bold ${this.getFontSize(20)} sans-serif`;
      const upgradeLabelY = this.isMobile()
        ? titleY + 100
        : this.canvas.height / 2 - 50;
      this.ctx.fillText("Upgrades:", this.displayWidth / 2, upgradeLabelY);
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = `${this.getFontSize(18)} sans-serif`;
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
        .join(this.isMobile() ? " | " : " | ");
      this.ctx.fillText(
        upgradeText,
        this.displayWidth / 2,
        upgradeLabelY + (this.isMobile() ? 25 : 30)
      );
    }

    // Statistics panel
    const upgradeOffset =
      this.healthUpgrades > 0 ||
      this.staminaUpgrades > 0 ||
      this.perfectBlockUpgrades > 0 ||
      this.attackDamageUpgrades > 0
        ? this.isMobile()
          ? 20
          : 30
        : 0;
    const statsY = titleY + (this.isMobile() ? 150 : 200) + upgradeOffset;
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = `bold ${this.getFontSize(24)} sans-serif`;
    this.ctx.fillText("Statistics", this.displayWidth / 2, statsY);

    this.ctx.font = `${this.getFontSize(18)} sans-serif`;
    const stats = [
      `Damage Dealt: ${this.stats.totalDamageDealt}`,
      `Perfect Blocks: ${this.stats.perfectBlocks}`,
      `Attacks Blocked: ${this.stats.attacksBlocked}`,
      `Hits Taken: ${this.stats.hitsTaken}`,
      `Total Attacks: ${this.stats.totalAttacks}`,
    ];

    const statSpacing = this.isMobile() ? 20 : 25;
    stats.forEach((stat, index) => {
      this.ctx.fillText(
        stat,
        this.displayWidth / 2,
        statsY + 30 + index * statSpacing
      );
    });

    // Restart hint
    this.ctx.fillStyle = "#cccccc";
    this.ctx.font = `${this.getFontSize(20)} sans-serif`;
    const restartHintY = this.isMobile()
      ? statsY + stats.length * statSpacing + 20
      : this.displayHeight / 2 + 200;
    const restartText = this.isMobile()
      ? "Tap Restart button"
      : "Press R to restart";
    this.ctx.fillText(restartText, this.displayWidth / 2, restartHintY);
  }

  private drawControlsHint(): void {
    // Hide controls hint on mobile (we have on-screen buttons)
    if (this.isMobile()) {
      return;
    }
    const hintWidth = 280;
    const hintHeight = 90;
    const hintX = 15;
    const hintY = this.displayHeight - hintHeight - 15;

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

  private drawMobileControls(): void {
    // Only draw on mobile during gameplay
    if (!this.isMobile() || this.gameStatus !== "playing") {
      return;
    }

    const buttonSize = 80;
    const padding = 20;
    const buttonY = this.displayHeight - buttonSize - padding;

    // Block Button - Left
    const blockButtonX = padding;
    this.drawMobileButton(
      blockButtonX,
      buttonY,
      buttonSize,
      "BLOCK",
      this.isBlockButtonPressed
    );

    // Attack Button - Right
    const attackButtonX = this.displayWidth - buttonSize - padding;
    this.drawMobileButton(
      attackButtonX,
      buttonY,
      buttonSize,
      "ATTACK",
      this.isAttackButtonPressed
    );
  }

  private drawMobileButton(
    x: number,
    y: number,
    size: number,
    label: string,
    isPressed: boolean
  ): void {
    this.ctx.save();

    // Button background with 30% transparency (70% opacity)
    const bgColor = isPressed
      ? label === "ATTACK"
        ? "rgba(212, 175, 55, 0.7)" // Gold when pressed, 30% transparent
        : "rgba(139, 184, 232, 0.7)" // Light blue when pressed, 30% transparent
      : "rgba(45, 90, 122, 0.7)"; // Teal when not pressed, 30% transparent

    const borderColor = isPressed
      ? label === "ATTACK"
        ? "rgba(139, 184, 232, 0.85)" // Light blue border, slightly more opaque
        : "rgba(212, 175, 55, 0.85)" // Gold border, slightly more opaque
      : "rgba(139, 184, 232, 0.85)"; // Light blue border, slightly more opaque

    // Shadow effect
    this.ctx.shadowBlur = isPressed ? 20 : 10;
    this.ctx.shadowColor = borderColor;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;

    // Draw circle
    this.ctx.beginPath();
    this.ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = bgColor;
    this.ctx.fill();
    this.ctx.strokeStyle = borderColor;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Reset shadow
    this.ctx.shadowBlur = 0;

    // Button label
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = `bold ${this.getFontSize(14)} sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(label, x + size / 2, y + size / 2);

    this.ctx.restore();
  }

  // Helper method to check if a point is within a button
  private isPointInButton(
    x: number,
    y: number,
    buttonX: number,
    buttonY: number,
    buttonSize: number
  ): boolean {
    const centerX = buttonX + buttonSize / 2;
    const centerY = buttonY + buttonSize / 2;
    const distance = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    );
    return distance <= buttonSize / 2;
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
    this.isAttackButtonPressed = false;
    this.isBlockButtonPressed = false;
    this.initializeLevel();
    this.updateSpearPositions();
    this.start();
  }

  public handleTouchStart(e: TouchEvent): void {
    const rect = this.canvas.getBoundingClientRect();

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      // Handle intro screen - any touch starts the game
      if (this.gameStatus === "intro") {
        e.preventDefault();
        this.gameStatus = "playing";
        return;
      }

      // Check if touch is in upgrade menu area
      if (this.gameStatus === "upgradeMenu") {
        this.setUpgradeMenuTouchY(y);
        this.handleUpgradeMenuTouch(x, y);
        continue;
      }

      // On mobile, check if touch is on a button
      if (this.isMobile() && this.gameStatus === "playing") {
        const buttonSize = 80;
        const padding = 20;
        const buttonY = this.displayHeight - buttonSize - padding;
        const blockButtonX = padding;
        const attackButtonX = this.displayWidth - buttonSize - padding;

        // Check if touch is on block button
        if (this.isPointInButton(x, y, blockButtonX, buttonY, buttonSize)) {
          e.preventDefault();
          this.isBlockButtonPressed = true;
          this.activeTouches.set(touch.identifier, { type: "block" });
          const isNewPress = !this.wasCtrlHeld;
          this.wasCtrlHeld = true;
          this.handlePlayerBlock();
          if (isNewPress) {
            this.checkPerfectBlockOnPress();
          }
          continue;
        }

        // Check if touch is on attack button
        if (this.isPointInButton(x, y, attackButtonX, buttonY, buttonSize)) {
          e.preventDefault();
          this.isAttackButtonPressed = true;
          this.activeTouches.set(touch.identifier, { type: "attack" });
          this.handlePlayerAttack();
          continue;
        }

        // If touch is not on a button, ignore it (don't use left/right split)
        continue;
      }

      // Desktop/fallback: Determine touch type based on position
      // Left side = block, right side = attack
      const touchType = x < this.displayWidth / 2 ? "block" : "attack";

      this.activeTouches.set(touch.identifier, { type: touchType });

      if (touchType === "attack") {
        this.handlePlayerAttack();
      } else if (touchType === "block") {
        const isNewPress = !this.wasCtrlHeld;
        this.wasCtrlHeld = true;
        this.handlePlayerBlock();
        if (isNewPress) {
          this.checkPerfectBlockOnPress();
        }
      }
    }
  }

  public handleTouchEnd(e: TouchEvent): void {
    // Clear upgrade menu touch feedback
    if (this.gameStatus === "upgradeMenu") {
      this.setUpgradeMenuTouchY(null);
    }

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      const touchData = this.activeTouches.get(touch.identifier);

      if (touchData?.type === "block") {
        this.isPlayerBlocking = false;
        this.wasCtrlHeld = false;
        this.isBlockButtonPressed = false;
      } else if (touchData?.type === "attack") {
        this.isAttackButtonPressed = false;
      }

      this.activeTouches.delete(touch.identifier);
    }
  }

  private handleUpgradeMenuTouch(x: number, y: number): void {
    const centerX = this.displayWidth / 2;
    const startY = this.displayHeight / 2 - 200;

    // Calculate layout values matching drawUpgradeMenu()
    const victoryStartY = this.isMobile()
      ? this.displayHeight / 2 - 120
      : startY;
    const instructionsY = this.isMobile()
      ? victoryStartY + 80
      : victoryStartY + 120;
    const optionStartY = this.isMobile() ? instructionsY + 40 : startY + 180;
    const optionSpacing = this.isMobile() ? 55 : 70;
    const optionWidth = this.isMobile() ? this.displayWidth - 40 : 600;
    const optionLeft = this.isMobile() ? 20 : centerX - 300;
    const optionRight = optionLeft + optionWidth;

    // Check which upgrade option was touched (larger touch area for mobile)
    for (let i = 0; i < 4; i++) {
      const optionY = optionStartY + i * optionSpacing;
      const optionTop = optionY - 35; // Increased touch area
      const optionBottom = optionY + 25;

      if (
        y >= optionTop &&
        y <= optionBottom &&
        x >= optionLeft &&
        x <= optionRight
      ) {
        const upgradeTypes: Array<
          "health" | "stamina" | "perfectBlock" | "attackDamage"
        > = ["health", "stamina", "perfectBlock", "attackDamage"];
        this.selectedUpgrade = upgradeTypes[i];
        this.applyUpgrade(upgradeTypes[i]);
        return;
      }
    }
  }

  // Track touch position for visual feedback in upgrade menu
  private upgradeMenuTouchY: number | null = null;

  public setUpgradeMenuTouchY(y: number | null): void {
    this.upgradeMenuTouchY = y;
  }

  public cleanup(): void {
    this.stop();
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("keydown", this.keydownHandler);
    window.removeEventListener("keyup", this.keyupHandler);
    this.canvas.removeEventListener("touchstart", this.touchstartHandler);
    this.canvas.removeEventListener("touchend", this.touchendHandler);
    this.canvas.removeEventListener("touchcancel", this.touchcancelHandler);
    this.canvas.removeEventListener("click", this.clickHandler);
  }
}
