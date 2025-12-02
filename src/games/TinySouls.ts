// ============================================================================
// CONSTANTS AND CONFIGURATION
// ============================================================================

import { AudioManager } from "./audioService";

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
  },
  {
    enemyHealth: 120,
    enemyDamage: 12,
    enemyAttackCooldown: 2200,
    enemyName: "Crimson Blade",
    enemyColor: "#DC143C",
  },
  {
    enemyHealth: 150,
    enemyDamage: 15,
    enemyAttackCooldown: 2000,
    enemyName: "Void Knight",
    enemyColor: "#4B0082",
  },
  {
    enemyHealth: 180,
    enemyDamage: 18,
    enemyAttackCooldown: 1800,
    enemyName: "Frost Wraith",
    enemyColor: "#00CED1",
  },
  {
    enemyHealth: 200,
    enemyDamage: 20,
    enemyAttackCooldown: 1500,
    enemyName: "Soul Reaper",
    enemyColor: "#FF1493",
  },
];

const GAME_CONSTANTS = {
  UPGRADE_INCREMENT: 20,
  STAMINA: {
    REGEN_RATE: 25,
    ATTACK_COST: 30,
    BLOCK_COST: 20,
    BASE_MAX: 100,
    BLOCK_DRAIN_RATE: 20, // Stamina drained per second while holding block
  },
  COOLDOWN: {
    ATTACK: 200, // ms cooldown after attack
    BLOCK: 100, // ms cooldown after starting block
  },
  HEALTH: {
    BASE_MAX: 100,
  },
  ANIMATION: {
    PLAYER_SPEAR_DURATION: 400,
    ENEMY_ATTACK_RATIO: 0.4,
    HIT_DURATION: 300,
    DAMAGE_CONNECT_POINT: 0.95,
    DAMAGE_CONNECT_THRESHOLD: 0.05,
  },
  PERFECT_BLOCK: {
    WINDOW_START: 0.85,
    WINDOW_END: 0.95,
    BASE_DURATION: 500,
    MIN_DURATION: 100,
    UPGRADE_REDUCTION: 20,
    STUN_DURATION: 2500,
    SCORE_BASE: 100,
    MULTIPLIER_INCREASE: 0.2,
  },
  DAMAGE: {
    BASE_PLAYER: 15,
    UPGRADE_INCREMENT: 20,
    BLOCK_REDUCTION: 0.25,
    SCORE_MULTIPLIER: 10,
  },
  SCORE: {
    LEVEL_BONUS_MULTIPLIER: 500,
    VICTORY_BONUS: 5000,
    MAX_MULTIPLIER: 3.0,
  },
  GOLD: {
    BASE_PER_LEVEL: 10,
    VICTORY_BONUS_MULTIPLIER: 0,
    NG_PLUS_BONUS_BASE: 50,
  },
  UPGRADE_COSTS: {
    HEALTH: 100,
    STAMINA: 100,
    PERFECT_BLOCK: 150,
    ATTACK_DAMAGE: 120,
    STAMINA_REGEN: 200,
    ATTACK_SPEED: 180,
    BLOCK_EFFICIENCY: 150,
    PERFECT_BLOCK_WINDOW: 250,
    GOLD_FIND: 300,
    STARTING_HEALTH: 100,
  },
  LEVEL: {
    COMPLETE_TIMER: 2000,
    HEALTH_REGEN_RATIO: 0.5,
    MAX_LEVEL: 5,
  },
  DEATH_SCREEN: {
    EXPLOSION_DURATION: 2000, // Duration of explosion animation before showing "YOU DIED"
    FADE_IN_DURATION: 1000,
    HOLD_DURATION: 1500,
    FADE_OUT_DURATION: 1000,
    TOTAL_DURATION: 5500, // explosion + fade in + hold + fade out (2000 + 1000 + 1500 + 1000)
  },
  ENEMY_DEATH: {
    EXPLOSION_DURATION: 2000, // Duration of explosion animation before showing victory screen
  },
  ENEMY_VANQUISHED_SCREEN: {
    FADE_IN_DURATION: 1000,
    HOLD_DURATION: 1500,
    FADE_OUT_DURATION: 1000,
    TOTAL_DURATION: 3500, // fade in + hold + fade out
  },
  LEVEL5_VICTORY_SCREEN: {
    FADE_IN_DURATION: 1000,
    HOLD_DURATION: 2000,
    FADE_OUT_DURATION: 1000,
    TOTAL_DURATION: 4000, // fade in + hold + fade out
  },
  SPEAR: {
    MOBILE_TRAVEL_DISTANCE: 150,
    DESKTOP_TRAVEL_DISTANCE: 200,
    MOBILE_LENGTH: 50,
    DESKTOP_LENGTH: 60,
    MOBILE_WIDTH: 2.5,
    DESKTOP_WIDTH: 3,
    MOBILE_TIP_LENGTH: 12,
    DESKTOP_TIP_LENGTH: 15,
    OFFSET_FROM_CHARACTER: 20,
    COLOR_TRANSITION_START: 0.6,
    COLOR_TRANSITION_RANGE: 0.4,
    COLOR_ORANGE_TO_RED_THRESHOLD: 0.5,
  },
  CHARACTER: {
    WIDTH: 90,
    HEIGHT: 120,
    MOBILE_PLAYER_Y_RATIO: 0.4,
    MOBILE_ENEMY_Y_RATIO: 0.7,
    DESKTOP_X_RATIO: 0.23,
    DESKTOP_ENEMY_X_RATIO: 0.77,
  },
  SCREEN_SHAKE: {
    DECAY: 0.9,
    MIN_INTENSITY: 0.1,
    PERFECT_BLOCK_INTENSITY: 15,
    HIT_INTENSITY: 20,
    BLOCKED_HIT_INTENSITY: 8,
    PLAYER_HIT_INTENSITY: 12,
  },
  PARTICLES: {
    PERFECT_BLOCK_COUNT: 20,
    PERFECT_BLOCK_SPEED: 3,
    PERFECT_BLOCK_SPARK_COUNT: 15,
    PERFECT_BLOCK_SPARK_LIFE: 800,
    HIT_COUNT: 12,
    HIT_LIFE: 600,
    BLOCK_COUNT: 8,
    BLOCK_LIFE: 400,
    ATTACK_TRAIL_COUNT: 5,
    ATTACK_TRAIL_LIFE: 300,
    PERFECT_BLOCK_FADE_TIME: 500,
    HIT_FRICTION: 0.98,
    BLOCK_FRICTION: 0.95,
    TRAIL_FRICTION: 0.9,
    DEATH_EXPLOSION_COUNT: 40,
    DEATH_EXPLOSION_LIFE: 2000,
    DEATH_EXPLOSION_SPEED: 3,
    DEATH_EXPLOSION_FRICTION: 0.98,
  },
  UI: {
    MOBILE_BREAKPOINT: 768,
    MOBILE_FONT_SCALE_MIN: 0.7,
    CONTAINER_PADDING: 32,
    MOBILE_HEIGHT_RATIO: 0.8,
    DESKTOP_MIN_WIDTH: 600,
    MOBILE_ASPECT_RATIO: 16 / 9,
    DESKTOP_ASPECT_RATIO: 16 / 9,
  },
  NG_PLUS: {
    MULTIPLIERS: [1.0, 1.2, 1.5, 2.0],
    LINEAR_START: 3,
    LINEAR_INCREMENT: 0.5,
  },
};

const COLORS = {
  PLAYER: "#8BB8E8",
  PLAYER_STROKE: "#4A6FA5",
  ENEMY_WARNING_ORANGE: "#FF8C00",
  ENEMY_WARNING_RED: "#FF4500",
  PERFECT_BLOCK: "#00FFFF",
  PERFECT_BLOCK_GRADIENT: "#0080FF",
  GOLD: "#D4AF37",
  STAMINA: "#FFD700",
  STAMINA_ORANGE: "#FFA500",
  STAMINA_DARK_ORANGE: "#FF6B00",
  HEALTH_MEDIUM_START: "#FFA500",
  HEALTH_MEDIUM_END: "#FF8C00",
  HEALTH_LOW_START: "#FF4444",
  HEALTH_LOW_END: "#CC0000",
  BACKGROUND: "#0b2e36",
  TEXT_GOLD: "#D4AF37",
  TEXT_LIGHT_BLUE: "#8BB8E8",
  TEXT_TEAL: "#2D5A7A",
  TEXT_WHITE: "#ffffff",
  TEXT_GRAY: "#cccccc",
  TEXT_DARK_GRAY: "#888888",
  SUCCESS: "#4CAF50",
  ERROR: "#FF6B6B",
  BLACK: "#000000",
  SHADOW: "#1a1a1a",
};

const UI_CONSTANTS = {
  HEALTH_BAR: {
    HEIGHT: 32,
    STAMINA_HEIGHT: 22,
    MOBILE_WIDTH: 180,
    DESKTOP_WIDTH: 200,
    MOBILE_X_OFFSET: 50,
    DESKTOP_X_OFFSET: 50,
    DESKTOP_Y_OFFSET: 60,
    STAMINA_Y_OFFSET: 110,
    SPACING: 10,
  },
  MOBILE_BUTTON: {
    SIZE: 80,
    PADDING: 20,
  },
  CONTROLS_HINT: {
    WIDTH: 280,
    HEIGHT: 90,
    X: 15,
    LOW_STAMINA_THRESHOLD: 30,
  },
  PERFECT_BLOCK_INDICATOR: {
    MOBILE_WIDTH: 280,
    DESKTOP_WIDTH: 300,
    MOBILE_HEIGHT: 10,
    DESKTOP_HEIGHT: 12,
    MARKER_WIDTH: 6,
    MARKER_HEIGHT_OFFSET: 4,
  },
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type AnimationState = "idle" | "attack" | "block" | "hit";
type GameStatus =
  | "startScreen"
  | "intro"
  | "controls"
  | "playing"
  | "levelComplete"
  | "playerWon"
  | "enemyWon"
  | "upgradeMenu"
  | "deathScreen"
  | "enemyDeath"
  | "enemyVanquished"
  | "level5Victory"
  | "upgradesShop";
type UpgradeType = "health" | "stamina" | "perfectBlock" | "attackDamage";
type PermanentUpgradeType =
  | "health"
  | "stamina"
  | "perfectBlock"
  | "attackDamage"
  | "staminaRegen"
  | "attackSpeed"
  | "blockEfficiency"
  | "perfectBlockWindow"
  | "goldFind"
  | "startingHealth";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface SimpleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface AttackEffect {
  x: number;
  y: number;
  type: "player" | "enemy";
  duration: number;
}

interface DamageNumber {
  x: number;
  y: number;
  value: number;
  type: "player" | "enemy";
  life: number;
  maxLife: number;
  offsetY: number;
}

interface PlayerState {
  health: number;
  maxHealth: number;
  stamina: number;
  maxStamina: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isBlocking: boolean;
  attackCooldown: number;
  blockCooldown: number;
  animation: { state: AnimationState; timer: number };
  spear: {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    progress: number;
    timer: number;
    damageDealt: boolean; // Track if damage was dealt this attack
    targetDistance: number; // Calculated distance to target when attack starts
  };
  lastHitTime: number;
}

interface EnemyState {
  health: number;
  maxHealth: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  attackTimer: number;
  attackCooldown: number;
  isAttacking: boolean;
  attackDuration: number;
  attackTotalDuration: number;
  stunTimer: number;
  animation: { state: AnimationState; timer: number };
  spear: {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    progress: number;
    damageDealt: boolean; // Track if damage was dealt this attack
    targetDistance: number; // Calculated distance to target when attack starts
  };
}

interface PerfectBlockState {
  active: boolean;
  timer: number;
  duration: number;
  attempted: boolean;
  wasCtrlHeld: boolean;
  particles: SimpleParticle[];
}

interface ParticleSystems {
  hit: Particle[];
  block: Particle[];
  perfectBlock: SimpleParticle[];
  attackTrail: Particle[];
  deathExplosion: Particle[];
  enemyDeathExplosion: Particle[];
}

interface GameUI {
  damageNumbers: DamageNumber[];
  attackEffects: AttackEffect[];
  screenShake: {
    offsetX: number;
    offsetY: number;
    intensity: number;
  };
}

interface UpgradeState {
  newGamePlusLevel: number;
  gold: number;
  health: number;
  stamina: number;
  perfectBlock: number;
  attackDamage: number;
  staminaRegen: number;
  attackSpeed: number;
  blockEfficiency: number;
  perfectBlockWindow: number;
  goldFind: number;
  startingHealth: number;
  selected: UpgradeType | null;
  baseMaxHealth: number;
  baseMaxStamina: number;
  basePerfectBlockDuration: number;
  basePlayerDamage: number;
  baseStaminaRegenRate: number;
  baseAttackCooldown: number;
  baseBlockReduction: number;
  basePerfectBlockWindowStart: number;
  basePerfectBlockWindowEnd: number;
}

interface GameStats {
  totalDamageDealt: number;
  perfectBlocks: number;
  attacksBlocked: number;
  hitsTaken: number;
  totalAttacks: number;
}

// ============================================================================
// MAIN GAME CLASS
// ============================================================================

export class TinySouls {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationFrameId: number | null = null;
  private isRunning: boolean = false;
  private lastFrameTime: number = 0;

  // Display dimensions (CSS pixels, not scaled by DPR)
  private displayWidth: number = 0;
  private displayHeight: number = 0;

  // Game state
  private currentLevel: number = 1;
  private levelCompleteTimer: number = 0;
  private deathScreenTimer: number = 0;
  private deathScreenWaitingForInput: boolean = false;
  private enemyDeathTimer: number = 0;
  private enemyVanquishedTimer: number = 0;
  private level5VictoryTimer: number = 0;
  private gameStatus: GameStatus = "startScreen";
  private lastGoldEarned: number = 0;
  private lastNgPlusGoldEarned: number = 0;

  // Grouped state objects
  private player: PlayerState = {
    health: GAME_CONSTANTS.HEALTH.BASE_MAX,
    maxHealth: GAME_CONSTANTS.HEALTH.BASE_MAX,
    stamina: GAME_CONSTANTS.STAMINA.BASE_MAX,
    maxStamina: GAME_CONSTANTS.STAMINA.BASE_MAX,
    position: { x: 150, y: 300 },
    size: {
      width: GAME_CONSTANTS.CHARACTER.WIDTH,
      height: GAME_CONSTANTS.CHARACTER.HEIGHT,
    },
    isBlocking: false,
    attackCooldown: 0,
    blockCooldown: 0,
    animation: { state: "idle", timer: 0 },
    spear: {
      x: 0,
      y: 0,
      baseX: 0,
      baseY: 0,
      progress: 0,
      timer: 0,
      damageDealt: false,
      targetDistance: 0,
    },
    lastHitTime: 0,
  };

  private enemy: EnemyState = {
    health: 100,
    maxHealth: 100,
    position: { x: 0, y: 300 },
    size: {
      width: GAME_CONSTANTS.CHARACTER.WIDTH,
      height: GAME_CONSTANTS.CHARACTER.HEIGHT,
    },
    attackTimer: 0,
    attackCooldown: 2000,
    isAttacking: false,
    attackDuration: 0,
    attackTotalDuration: 1000,
    stunTimer: 0,
    animation: { state: "idle", timer: 0 },
    spear: {
      x: 0,
      y: 0,
      baseX: 0,
      baseY: 0,
      progress: 0,
      damageDealt: false,
      targetDistance: 0,
    },
  };

  private perfectBlock: PerfectBlockState = {
    active: false,
    timer: 0,
    duration: GAME_CONSTANTS.PERFECT_BLOCK.BASE_DURATION,
    attempted: false,
    wasCtrlHeld: false,
    particles: [],
  };

  private particles: ParticleSystems = {
    hit: [],
    block: [],
    perfectBlock: [],
    attackTrail: [],
    deathExplosion: [],
    enemyDeathExplosion: [],
  };

  private ui: GameUI = {
    damageNumbers: [],
    attackEffects: [],
    screenShake: {
      offsetX: 0,
      offsetY: 0,
      intensity: 0,
    },
  };

  private upgrades: UpgradeState = {
    newGamePlusLevel: 0,
    gold: 0,
    health: 0,
    stamina: 0,
    perfectBlock: 0,
    attackDamage: 0,
    staminaRegen: 0,
    attackSpeed: 0,
    blockEfficiency: 0,
    perfectBlockWindow: 0,
    goldFind: 0,
    startingHealth: 0,
    selected: null,
    baseMaxHealth: GAME_CONSTANTS.HEALTH.BASE_MAX,
    baseMaxStamina: GAME_CONSTANTS.STAMINA.BASE_MAX,
    basePerfectBlockDuration: GAME_CONSTANTS.PERFECT_BLOCK.BASE_DURATION,
    basePlayerDamage: GAME_CONSTANTS.DAMAGE.BASE_PLAYER,
    baseStaminaRegenRate: GAME_CONSTANTS.STAMINA.REGEN_RATE,
    baseAttackCooldown: GAME_CONSTANTS.COOLDOWN.ATTACK,
    baseBlockReduction: GAME_CONSTANTS.DAMAGE.BLOCK_REDUCTION,
    basePerfectBlockWindowStart: GAME_CONSTANTS.PERFECT_BLOCK.WINDOW_START,
    basePerfectBlockWindowEnd: GAME_CONSTANTS.PERFECT_BLOCK.WINDOW_END,
  };

  private score: { value: number; multiplier: number } = {
    value: 0,
    multiplier: 1.0,
  };

  private stats: GameStats = {
    totalDamageDealt: 0,
    perfectBlocks: 0,
    attacksBlocked: 0,
    hitsTaken: 0,
    totalAttacks: 0,
  };

  // Input state
  private keys: Set<string> = new Set();
  private activeTouches: Map<number, { type: "attack" | "block" }> = new Map();
  private isAttackButtonPressed: boolean = false;
  private isBlockButtonPressed: boolean = false;
  private upgradeMenuTouchY: number | null = null;
  private wasSpaceHeld: boolean = false;
  private upgradesShopScrollStartY: number | null = null;

  // Event handlers for cleanup
  private resizeHandler: () => void;
  private keydownHandler: (e: KeyboardEvent) => void;
  private keyupHandler: (e: KeyboardEvent) => void;
  private touchstartHandler: (e: TouchEvent) => void;
  private touchendHandler: (e: TouchEvent) => void;
  private touchcancelHandler: (e: TouchEvent) => void;
  private touchmoveHandler: (e: TouchEvent) => void;
  private clickHandler: (e: MouseEvent) => void;
  private mousemoveHandler: (e: MouseEvent) => void;
  private wheelHandler: (e: WheelEvent) => void;

  // Cached values for performance
  private rgbCache: Map<string, { r: number; g: number; b: number }> =
    new Map();
  private cachedCurrentTime: number = 0;
  private cachedLevelConfig: LevelConfig | null = null;
  private cachedIsMobile: boolean = false;

  // Audio manager
  private audioManager: AudioManager;

  // Logo and intro screen state
  private logoImage: HTMLImageElement | null = null;
  private backgroundImage: HTMLImageElement | null = null;

  // Player sprite images
  private playerIdleImage: HTMLImageElement | null = null;
  private playerAttackImage: HTMLImageElement | null = null;
  private playerBlockImage: HTMLImageElement | null = null;
  private playerHitImage: HTMLImageElement | null = null;

  private logoFadeProgress: number = 0;
  private logoFadeDuration: number = 1500;
  private logoFadeStartTime: number = 0;
  private buttonFadeProgress: number = 0;
  private buttonFadeDuration: number = 500;
  private buttonFadeStartTime: number = 0;
  private fadeOutProgress: number = 0;
  private fadeOutDuration: number = 500;
  private fadeOutStartTime: number = 0;
  private pendingTransition: GameStatus | null = null;
  private buttonPressState: {
    start: boolean;
    controls: boolean;
    upgrades: boolean;
    back: boolean;
  } = {
    start: false,
    controls: false,
    upgrades: false,
    back: false,
  };
  private upgradesShopScrollOffset: number = 0;

  // Fog effect for title screen
  private fogParticles: Array<{
    x: number;
    y: number;
    radius: number;
    speed: number;
    opacity: number;
    baseOpacity: number;
  }> = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not get 2d context from canvas");
    }
    this.ctx = context;

    // Initialize audio manager
    this.audioManager = new AudioManager();

    // Set up event handlers
    this.resizeHandler = () => this.resize();
    this.keydownHandler = (e: KeyboardEvent) => {
      this.keys.add(e.code);

      // Start, intro and controls screens use buttons, not keyboard shortcuts
      if (
        this.gameStatus === "startScreen" ||
        this.gameStatus === "intro" ||
        this.gameStatus === "controls"
      ) {
        return;
      }

      // Upgrade menu now uses click/touch instead of keyboard

      if (this.gameStatus === "levelComplete") {
        if (e.code === "Space") {
          e.preventDefault();
          this.continueFromLevelComplete();
        }
        return;
      }

      if (e.code === "KeyR") {
        e.preventDefault();
        this.restart();
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        // Only attack on initial press, not on key repeat
        if (!this.wasSpaceHeld) {
          this.wasSpaceHeld = true;
          this.handlePlayerAttack();
        }
      }
      if (e.code === "ControlLeft" || e.code === "ControlRight") {
        e.preventDefault();
        const isNewPress = !this.perfectBlock.wasCtrlHeld;
        this.perfectBlock.wasCtrlHeld = true;
        this.handlePlayerBlock();
        if (isNewPress) {
          this.checkPerfectBlockOnPress();
        }
      }
    };
    this.keyupHandler = (e: KeyboardEvent) => {
      this.keys.delete(e.code);
      if (e.code === "ControlLeft" || e.code === "ControlRight") {
        this.player.isBlocking = false;
        this.perfectBlock.wasCtrlHeld = false;
      }
      if (e.code === "Space") {
        this.wasSpaceHeld = false;
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
    this.touchmoveHandler = (e: TouchEvent) => {
      this.handleTouchMove(e);
    };
    this.clickHandler = (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Handle start screen - any click goes to intro
      if (this.gameStatus === "startScreen") {
        e.preventDefault();
        const oldStatus = this.gameStatus;
        this.gameStatus = "intro";
        this.handleGameStatusChange(oldStatus, this.gameStatus);
        return;
      }

      // Handle intro screen buttons
      if (this.gameStatus === "intro") {
        e.preventDefault();
        if (this.handleIntroButtonClick(x, y)) {
          return;
        }
      }

      // Handle controls screen back button
      if (this.gameStatus === "controls") {
        e.preventDefault();
        if (this.handleControlsButtonClick(x, y)) {
          return;
        }
      }

      // Handle death screen - click to return to title screen
      if (
        this.gameStatus === "deathScreen" &&
        this.deathScreenWaitingForInput
      ) {
        e.preventDefault();
        const oldStatus = this.gameStatus;
        // Save game data before returning to intro
        this.saveGameData();
        // Return to intro screen so player can access upgrades menu
        this.gameStatus = "intro";
        this.deathScreenWaitingForInput = false;
        this.handleGameStatusChange(oldStatus, this.gameStatus);
        return;
      }
      // Handle level complete screen - any click continues
      if (this.gameStatus === "levelComplete") {
        e.preventDefault();
        this.continueFromLevelComplete();
        return;
      }
      // Handle upgrade menu - click to select upgrade
      if (this.gameStatus === "upgradeMenu") {
        this.handleUpgradeMenuClick(x, y);
        return;
      }
      // Handle upgrades shop - click to purchase upgrades
      if (this.gameStatus === "upgradesShop") {
        e.preventDefault();
        this.handleUpgradesShopClick(x, y);
        return;
      }
    };

    // Set canvas size
    this.resize();
    window.addEventListener("resize", this.resizeHandler);

    // Load logo image
    this.loadLogo();
    // Load background image
    this.loadBackground();
    // Load player sprites
    this.loadPlayerSprites();

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
    this.canvas.addEventListener("touchmove", this.touchmoveHandler, {
      passive: false,
    });

    // Click event listener
    this.canvas.addEventListener("click", this.clickHandler);

    // Mouse move handler for hover feedback on upgrade menu and button press states
    this.mousemoveHandler = (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (this.gameStatus === "upgradeMenu") {
        this.setUpgradeMenuTouchY(y);
      } else {
        this.setUpgradeMenuTouchY(null);
      }

      // Handle button press states for intro screen
      if (this.gameStatus === "intro") {
        this.updateIntroButtonPressStates(x, y);
      } else {
        this.buttonPressState.start = false;
        this.buttonPressState.controls = false;
        this.buttonPressState.upgrades = false;
      }

      // Handle button press state for upgrades shop
      if (this.gameStatus === "upgradesShop") {
        this.updateUpgradesShopButtonPressState(x, y);
      } else {
        this.buttonPressState.back = false;
      }
    };
    this.canvas.addEventListener("mousemove", this.mousemoveHandler);
    this.canvas.addEventListener("mouseleave", () => {
      this.setUpgradeMenuTouchY(null);
    });

    // Wheel event handler for scrolling in upgrades shop
    this.wheelHandler = (e: WheelEvent) => {
      if (this.gameStatus === "upgradesShop") {
        e.preventDefault();
        const scrollSpeed = 3;
        const maxVisible = this.isMobile() ? 8 : 10;
        const maxScroll = Math.max(0, 10 - maxVisible);
        this.upgradesShopScrollOffset = Math.max(
          0,
          Math.min(
            maxScroll,
            this.upgradesShopScrollOffset -
              (e.deltaY > 0 ? scrollSpeed : -scrollSpeed)
          )
        );
      }
    };
    this.canvas.addEventListener("wheel", this.wheelHandler, {
      passive: false,
    });

    // Initialize level
    this.initializeLevel();

    // Load saved game data
    this.loadGameData();
  }

  // ============================================================================
  // SAVE/LOAD SYSTEM
  // ============================================================================

  private saveGameData(): void {
    try {
      const saveData = {
        gold: this.upgrades.gold,
        upgrades: {
          health: this.upgrades.health,
          stamina: this.upgrades.stamina,
          perfectBlock: this.upgrades.perfectBlock,
          attackDamage: this.upgrades.attackDamage,
          staminaRegen: this.upgrades.staminaRegen,
          attackSpeed: this.upgrades.attackSpeed,
          blockEfficiency: this.upgrades.blockEfficiency,
          perfectBlockWindow: this.upgrades.perfectBlockWindow,
          goldFind: this.upgrades.goldFind,
          startingHealth: this.upgrades.startingHealth,
        },
        newGamePlusLevel: this.upgrades.newGamePlusLevel,
      };
      localStorage.setItem("tinySouls_save", JSON.stringify(saveData));
    } catch (error) {
      console.warn("Failed to save game data:", error);
    }
  }

  private loadGameData(): void {
    try {
      const savedData = localStorage.getItem("tinySouls_save");
      if (savedData) {
        const data = JSON.parse(savedData);
        if (data.gold !== undefined) {
          this.upgrades.gold = data.gold;
        }
        if (data.newGamePlusLevel !== undefined) {
          this.upgrades.newGamePlusLevel = data.newGamePlusLevel;
        }
        if (data.upgrades) {
          this.upgrades.health = data.upgrades.health || 0;
          this.upgrades.stamina = data.upgrades.stamina || 0;
          this.upgrades.perfectBlock = data.upgrades.perfectBlock || 0;
          this.upgrades.attackDamage = data.upgrades.attackDamage || 0;
          this.upgrades.staminaRegen = data.upgrades.staminaRegen || 0;
          this.upgrades.attackSpeed = data.upgrades.attackSpeed || 0;
          this.upgrades.blockEfficiency = data.upgrades.blockEfficiency || 0;
          this.upgrades.perfectBlockWindow =
            data.upgrades.perfectBlockWindow || 0;
          this.upgrades.goldFind = data.upgrades.goldFind || 0;
          this.upgrades.startingHealth = data.upgrades.startingHealth || 0;
        }
        // Apply loaded upgrades to player stats
        this.applyAllPermanentUpgrades();
      }
    } catch (error) {
      console.warn("Failed to load game data:", error);
    }
  }

  private applyAllPermanentUpgrades(): void {
    // Apply health upgrade
    this.player.maxHealth =
      this.upgrades.baseMaxHealth +
      this.upgrades.health * GAME_CONSTANTS.UPGRADE_INCREMENT +
      this.upgrades.startingHealth * 10;
    this.player.health = Math.min(this.player.health, this.player.maxHealth);

    // Apply stamina upgrade
    this.player.maxStamina =
      this.upgrades.baseMaxStamina +
      this.upgrades.stamina * GAME_CONSTANTS.UPGRADE_INCREMENT;
    this.player.stamina = Math.min(this.player.stamina, this.player.maxStamina);

    // Apply perfect block duration
    this.perfectBlock.duration = Math.max(
      GAME_CONSTANTS.PERFECT_BLOCK.MIN_DURATION,
      this.upgrades.basePerfectBlockDuration -
        this.upgrades.perfectBlock *
          GAME_CONSTANTS.PERFECT_BLOCK.UPGRADE_REDUCTION
    );

    // Perfect block window upgrades are applied when checking perfect blocks
    // (handled in checkPerfectBlockOnPress)
  }

  private awardGold(): void {
    const baseGold = 10 * this.currentLevel;
    const ngPlusMultiplier = Math.pow(1.5, this.upgrades.newGamePlusLevel);
    const goldFindMultiplier = 1 + this.upgrades.goldFind * 0.1;
    const totalGold = Math.floor(
      baseGold * ngPlusMultiplier * goldFindMultiplier
    );
    this.lastGoldEarned = totalGold;
    this.upgrades.gold += totalGold;
    this.saveGameData();
  }

  // ============================================================================
  // HELPER METHODS
  // ============================================================================

  /**
   * Handle game status changes and trigger appropriate audio
   */
  private handleGameStatusChange(
    oldStatus: GameStatus,
    newStatus: GameStatus
  ): void {
    // Play intro music when transitioning from startScreen to intro
    // (This happens after user interaction, so autoplay should work)
    if (newStatus === "intro" && oldStatus === "startScreen") {
      this.audioManager.playMusic("game-intro.mp3").catch(() => {
        // Silently handle if file doesn't exist or fails to play
      });
      // Initialize logo fade animation when transitioning to intro
      if (this.logoImage && this.logoFadeStartTime === 0) {
        this.logoFadeStartTime = performance.now();
        this.logoFadeProgress = 0;
        this.buttonFadeProgress = 0;
        this.buttonFadeStartTime = 0;
      }
      // Initialize fog particles for title screen
      this.initializeFog();
    }

    // Reinitialize fog when returning to intro from other screens
    if (
      newStatus === "intro" &&
      oldStatus !== "startScreen" &&
      oldStatus !== "intro"
    ) {
      this.initializeFog();
    }

    // Start combat music when entering playing state at 50% volume
    if (newStatus === "playing" && oldStatus !== "playing") {
      this.audioManager.playMusic("combat-music.mp3", 0.3);
    }

    // Stop combat music when leaving playing state
    if (oldStatus === "playing" && newStatus !== "playing") {
      this.audioManager.stopMusic();
    }

    // Reset scroll offset when entering upgrades shop
    if (newStatus === "upgradesShop" && oldStatus !== "upgradesShop") {
      this.upgradesShopScrollOffset = 0;
    }

    // Play death screen sound
    if (newStatus === "deathScreen" && oldStatus !== "deathScreen") {
      this.audioManager.playSound("player-death.mp3");
    }

    // Play enemy death sound
    if (newStatus === "enemyDeath" && oldStatus !== "enemyDeath") {
      this.audioManager.playSound("player-death.mp3"); // Using same sound for enemy death
    }

    // Play "You Died" sound
    if (newStatus === "enemyWon" && oldStatus !== "enemyWon") {
      this.audioManager.playSound("you-died.mp3");
    }

    // Play "Enemy Vanquished" sound
    if (newStatus === "enemyVanquished" && oldStatus !== "enemyVanquished") {
      this.audioManager.playSound("enemy-vanquished.mp3");
    }

    // Play "You Win" sound
    if (newStatus === "level5Victory" && oldStatus !== "level5Victory") {
      this.audioManager.playSound("you-win.mp3");
    }
  }

  private initializeFog(): void {
    this.fogParticles = [];
    const particleCount = this.isMobile() ? 35 : 55;

    for (let i = 0; i < particleCount; i++) {
      this.fogParticles.push({
        x: Math.random() * this.displayWidth,
        y: Math.random() * this.displayHeight,
        radius:
          this.getMobileValue(80, 120) +
          Math.random() * this.getMobileValue(40, 80),
        speed: 0.02 + Math.random() * 0.03,
        opacity: 0.15 + Math.random() * 0.15,
        baseOpacity: 0.15 + Math.random() * 0.15,
      });
    }
  }

  private updateFog(deltaTime: number): void {
    const time = this.cachedCurrentTime;

    for (let i = 0; i < this.fogParticles.length; i++) {
      const particle = this.fogParticles[i];

      // Move fog particles horizontally with slight vertical drift
      particle.x += particle.speed * deltaTime;
      particle.y += Math.sin(time / 2000 + i) * 0.01 * deltaTime;

      // Wrap around horizontally
      if (particle.x > this.displayWidth + particle.radius) {
        particle.x = -particle.radius;
        particle.y = Math.random() * this.displayHeight;
      }

      // Subtle pulsing opacity effect
      particle.opacity =
        particle.baseOpacity + Math.sin(time / 3000 + i) * 0.05;
    }
  }

  private drawFog(): void {
    this.ctx.save();

    for (const particle of this.fogParticles) {
      // Create radial gradient for fog particle
      const gradient = this.ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius
      );

      // Use colors that match the game's aesthetic (teal/blue mist)
      const fogColor = `rgba(139, 184, 232, ${particle.opacity})`; // Light blue with opacity
      gradient.addColorStop(0, fogColor);
      gradient.addColorStop(
        0.5,
        `rgba(139, 184, 232, ${particle.opacity * 0.5})`
      );
      gradient.addColorStop(1, `rgba(139, 184, 232, 0)`);

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  private getMobileValue<T>(mobile: T, desktop: T): T {
    return this.isMobile() ? mobile : desktop;
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    if (this.rgbCache.has(hex)) {
      return this.rgbCache.get(hex)!;
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const rgb = result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 212, g: 175, b: 55 }; // Default to gold if parsing fails
    this.rgbCache.set(hex, rgb);
    return rgb;
  }

  private drawTextWithStroke(
    text: string,
    x: number,
    y: number,
    fillColor: string,
    fontSize: number,
    strokeColor: string = COLORS.BLACK,
    strokeWidth: number = this.isMobile() ? 2 : 4
  ): void {
    this.ctx.save();
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.font = `bold ${this.getFontSize(fontSize)} serif`;
    this.ctx.textAlign = "center";
    this.ctx.lineWidth = strokeWidth;
    this.ctx.strokeText(text, x, y);
    this.ctx.fillText(text, x, y);
    this.ctx.restore();
  }

  private createParticles(
    x: number,
    y: number,
    count: number,
    color: string,
    speed: number,
    life: number,
    sizeVariation: number = 3
  ): Particle[] {
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life,
        maxLife: life,
        color,
        size: 2 + Math.random() * sizeVariation,
      });
    }
    return particles;
  }

  private updateParticles(
    particles: Particle[],
    deltaTime: number,
    friction: number = 1.0
  ): Particle[] {
    return particles
      .map((p) => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - deltaTime,
        vx: p.vx * friction,
        vy: p.vy * friction,
      }))
      .filter((p) => p.life > 0);
  }

  private updateSimpleParticles(
    particles: SimpleParticle[],
    deltaTime: number,
    fadeTime: number
  ): SimpleParticle[] {
    return particles
      .map((p) => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - deltaTime / fadeTime,
      }))
      .filter((p) => p.life > 0);
  }

  private drawParticles(particles: Particle[]): void {
    particles.forEach((particle) => {
      const alpha = particle.life / particle.maxLife;
      this.ctx.save();
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  private drawSimpleParticles(particles: SimpleParticle[]): void {
    particles.forEach((particle) => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.life;
      this.ctx.fillStyle = particle.color || COLORS.PERFECT_BLOCK;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  // ============================================================================
  // GAME LOGIC METHODS
  // ============================================================================

  private getEnemyMultiplier(ngPlusLevel: number): number {
    const multipliers = GAME_CONSTANTS.NG_PLUS.MULTIPLIERS;
    if (ngPlusLevel < multipliers.length) {
      return multipliers[ngPlusLevel];
    }
    const baseMultiplier = multipliers[multipliers.length - 1];
    const linearStart = GAME_CONSTANTS.NG_PLUS.LINEAR_START;
    return (
      baseMultiplier +
      (ngPlusLevel - linearStart) * GAME_CONSTANTS.NG_PLUS.LINEAR_INCREMENT
    );
  }

  private getPlayerDamage(): number {
    return (
      this.upgrades.basePlayerDamage +
      this.upgrades.attackDamage * GAME_CONSTANTS.DAMAGE.UPGRADE_INCREMENT
    );
  }

  private formatUpgradeText(): string {
    const upgradeText = [
      this.upgrades.health > 0
        ? `Health: +${this.upgrades.health * GAME_CONSTANTS.UPGRADE_INCREMENT}`
        : null,
      this.upgrades.stamina > 0
        ? `Stamina: +${
            this.upgrades.stamina * GAME_CONSTANTS.UPGRADE_INCREMENT
          }`
        : null,
      this.upgrades.perfectBlock > 0
        ? `Perfect Block: -${
            this.upgrades.perfectBlock *
            GAME_CONSTANTS.PERFECT_BLOCK.UPGRADE_REDUCTION
          }ms`
        : null,
      this.upgrades.attackDamage > 0
        ? `Attack Damage: +${
            this.upgrades.attackDamage * GAME_CONSTANTS.DAMAGE.UPGRADE_INCREMENT
          }`
        : null,
    ]
      .filter(Boolean)
      .join(this.isMobile() ? " | " : " | ");
    return upgradeText;
  }

  private getCurrentLevelConfig(): LevelConfig {
    const levelIndex = Math.min(
      this.currentLevel - 1,
      LEVEL_CONFIGS.length - 1
    );
    const baseConfig = LEVEL_CONFIGS[levelIndex];
    const multiplier = this.getEnemyMultiplier(this.upgrades.newGamePlusLevel);

    return {
      ...baseConfig,
      enemyHealth: baseConfig.enemyHealth * multiplier,
      enemyDamage: baseConfig.enemyDamage * multiplier,
      enemyAttackCooldown: baseConfig.enemyAttackCooldown / multiplier,
    };
  }

  private resetGameState(preserveUpgrades: boolean = false): void {
    this.currentLevel = 1;
    this.levelCompleteTimer = 0;
    this.deathScreenTimer = 0;
    this.enemyVanquishedTimer = 0;
    this.level5VictoryTimer = 0;
    this.lastGoldEarned = 0;
    this.lastNgPlusGoldEarned = 0;

    // Reset player state
    if (!preserveUpgrades) {
      this.player.maxHealth =
        this.upgrades.baseMaxHealth +
        this.upgrades.health * GAME_CONSTANTS.UPGRADE_INCREMENT;
      this.player.maxStamina =
        this.upgrades.baseMaxStamina +
        this.upgrades.stamina * GAME_CONSTANTS.UPGRADE_INCREMENT;
    }
    this.player.health = this.player.maxHealth;
    this.player.stamina = this.player.maxStamina;
    this.player.isBlocking = false;
    this.player.attackCooldown = 0;
    this.player.blockCooldown = 0;
    this.player.animation = { state: "idle", timer: 0 };
    this.player.spear = {
      x: 0,
      y: 0,
      baseX: 0,
      baseY: 0,
      progress: 0,
      timer: 0,
      damageDealt: false,
      targetDistance: 0,
    };
    this.player.lastHitTime = 0;

    // Reset enemy state
    this.enemy.attackTimer = 0;
    this.enemy.isAttacking = false;
    this.enemy.attackDuration = 0;
    this.enemy.stunTimer = 0;
    this.enemy.animation = { state: "idle", timer: 0 };
    this.enemy.spear = {
      x: 0,
      y: 0,
      baseX: 0,
      baseY: 0,
      progress: 0,
      damageDealt: false,
      targetDistance: 0,
    };

    // Reset perfect block
    this.perfectBlock.active = false;
    this.perfectBlock.timer = 0;
    this.perfectBlock.attempted = false;
    this.perfectBlock.wasCtrlHeld = false;
    this.perfectBlock.particles = [];

    // Reset particles
    this.particles.hit = [];
    this.particles.block = [];
    this.particles.attackTrail = [];
    this.particles.deathExplosion = [];
    this.particles.enemyDeathExplosion = [];

    // Reset UI
    this.ui.damageNumbers = [];
    this.ui.attackEffects = [];
    this.ui.screenShake = { offsetX: 0, offsetY: 0, intensity: 0 };

    // Reset score
    this.score.value = 0;
    this.score.multiplier = 1.0;

    // Reset stats
    this.stats = {
      totalDamageDealt: 0,
      perfectBlocks: 0,
      attacksBlocked: 0,
      hitsTaken: 0,
      totalAttacks: 0,
    };

    // Reset input
    this.keys.clear();
    this.activeTouches.clear();
    this.isAttackButtonPressed = false;
    this.isBlockButtonPressed = false;
    this.wasSpaceHeld = false;
  }

  private applyUpgrade(upgradeType: UpgradeType): void {
    const increment = GAME_CONSTANTS.UPGRADE_INCREMENT;

    if (upgradeType === "health") {
      this.upgrades.health++;
      this.player.maxHealth =
        this.upgrades.baseMaxHealth + this.upgrades.health * increment;
      this.player.health = this.player.maxHealth;
    } else if (upgradeType === "stamina") {
      this.upgrades.stamina++;
      this.player.maxStamina =
        this.upgrades.baseMaxStamina + this.upgrades.stamina * increment;
      this.player.stamina = this.player.maxStamina;
    } else if (upgradeType === "perfectBlock") {
      this.upgrades.perfectBlock++;
      this.perfectBlock.duration = Math.max(
        GAME_CONSTANTS.PERFECT_BLOCK.MIN_DURATION,
        this.upgrades.basePerfectBlockDuration -
          this.upgrades.perfectBlock *
            GAME_CONSTANTS.PERFECT_BLOCK.UPGRADE_REDUCTION
      );
    } else if (upgradeType === "attackDamage") {
      this.upgrades.attackDamage++;
    }

    this.upgrades.newGamePlusLevel++;
    this.resetGameState(true);
    if (this.gameStatus !== "intro") {
      const oldStatus = this.gameStatus;
      this.gameStatus = "playing";
      this.handleGameStatusChange(oldStatus, this.gameStatus);
    }
    this.initializeLevel();
    this.updateSpearPositions();
  }

  private continueFromLevelComplete(): void {
    this.currentLevel++;
    const missingHealth = this.player.maxHealth - this.player.health;
    const healAmount = missingHealth * GAME_CONSTANTS.LEVEL.HEALTH_REGEN_RATIO;
    this.player.health = Math.min(
      this.player.maxHealth,
      this.player.health + healAmount
    );
    // Reset stamina to max when level changes
    this.player.stamina = this.player.maxStamina;
    this.initializeLevel();
    const oldStatus = this.gameStatus;
    this.gameStatus = "playing";
    this.handleGameStatusChange(oldStatus, this.gameStatus);
    this.levelCompleteTimer = 0;
  }

  private loadLogo(): void {
    const img = new Image();
    img.onload = () => {
      this.logoImage = img;
      // Initialize fade start time if game is running and on intro screen
      if (
        this.isRunning &&
        this.gameStatus === "intro" &&
        this.logoFadeStartTime === 0
      ) {
        this.logoFadeStartTime = performance.now();
        // Intro sound is played when transitioning from startScreen to intro
        // (after user interaction, so autoplay works)
      }
    };
    img.onerror = () => {
      console.warn("Failed to load logo image");
      this.logoImage = null;
    };
    img.src = "/assets/games/tiny-souls-logo.png";
  }

  private loadBackground(): void {
    const img = new Image();
    img.onload = () => {
      this.backgroundImage = img;
    };
    img.onerror = () => {
      console.warn("Failed to load background image");
      this.backgroundImage = null;
    };
    img.src = "/assets/games/tiny-souls/images/background.png";
  }

  private loadPlayerSprites(): void {
    // Load idle sprite
    const idleImg = new Image();
    idleImg.onload = () => {
      this.playerIdleImage = idleImg;
    };
    idleImg.onerror = () => {
      console.warn("Failed to load player idle sprite");
      this.playerIdleImage = null;
    };
    idleImg.src = "/assets/games/tiny-souls/images/player.png";

    // Load attack sprite
    const attackImg = new Image();
    attackImg.onload = () => {
      this.playerAttackImage = attackImg;
    };
    attackImg.onerror = () => {
      console.warn("Failed to load player attack sprite");
      this.playerAttackImage = null;
    };
    attackImg.src = "/assets/games/tiny-souls/images/player_attack.png";

    // Load block sprite
    const blockImg = new Image();
    blockImg.onload = () => {
      this.playerBlockImage = blockImg;
    };
    blockImg.onerror = () => {
      console.warn("Failed to load player block sprite");
      this.playerBlockImage = null;
    };
    blockImg.src = "/assets/games/tiny-souls/images/player_block.png";

    // Load hit sprite
    const hitImg = new Image();
    hitImg.onload = () => {
      this.playerHitImage = hitImg;
    };
    hitImg.onerror = () => {
      console.warn("Failed to load player hit sprite");
      this.playerHitImage = null;
    };
    hitImg.src = "/assets/games/tiny-souls/images/player_hit.png";
  }

  private initializeLevel(): void {
    const config = this.getCurrentLevelConfig();
    this.enemy.health = config.enemyHealth;
    this.enemy.maxHealth = config.enemyHealth;
    this.enemy.attackCooldown = config.enemyAttackCooldown;
    this.enemy.attackTotalDuration =
      config.enemyAttackCooldown * GAME_CONSTANTS.ANIMATION.ENEMY_ATTACK_RATIO;
    this.enemy.attackTimer = 0;
    this.enemy.isAttacking = false;
    this.enemy.attackDuration = 0;
    this.enemy.stunTimer = 0;
    this.enemy.spear.progress = 0;
    this.enemy.spear.damageDealt = false;
    this.enemy.spear.targetDistance = 0;
    this.perfectBlock.attempted = false;
    this.perfectBlock.wasCtrlHeld = false;
    // Apply all permanent upgrades when initializing level
    this.applyAllPermanentUpgrades();
    this.updateSpearPositions();
  }

  private updateSpearPositions(): void {
    const offset = GAME_CONSTANTS.SPEAR.OFFSET_FROM_CHARACTER;
    // Player spear starts from right edge (player faces right)
    const playerBaseX =
      this.player.position.x + this.player.size.width / 2 + offset;
    const playerBaseY = this.player.position.y;
    // Enemy spear: x is the base connection point (where spear connects to character)
    // The rectangle now extends LEFT from x (toward player)
    // Enemy attacks toward player (left), so their front edge is their LEFT side in world coords
    // Front edge is at: position.x - width/2
    // Set base at front edge, subtract offset to move it slightly left (forward toward player)
    const enemyFrontEdge = this.enemy.position.x - this.enemy.size.width / 2;
    const enemyBaseX = enemyFrontEdge - offset;
    const enemyBaseY = this.enemy.position.y;

    this.player.spear.baseX = playerBaseX;
    this.player.spear.baseY = playerBaseY;
    this.enemy.spear.baseX = enemyBaseX;
    this.enemy.spear.baseY = enemyBaseY;

    if (this.player.spear.progress === 0) {
      this.player.spear.x = playerBaseX;
      this.player.spear.y = playerBaseY;
    }
    if (this.enemy.spear.progress === 0) {
      this.enemy.spear.x = enemyBaseX;
      this.enemy.spear.y = enemyBaseY;
    }
  }

  private isMobile(): boolean {
    return window.innerWidth < GAME_CONSTANTS.UI.MOBILE_BREAKPOINT;
  }

  private getFontSize(baseSize: number): string {
    const scale = this.isMobile()
      ? Math.max(
          GAME_CONSTANTS.UI.MOBILE_FONT_SCALE_MIN,
          this.displayWidth / GAME_CONSTANTS.UI.MOBILE_BREAKPOINT
        )
      : 1;
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
        const containerWidth = rect.width - GAME_CONSTANTS.UI.CONTAINER_PADDING;
        const maxHeight =
          window.innerHeight * GAME_CONSTANTS.UI.MOBILE_HEIGHT_RATIO;
        const heightFromWidth =
          containerWidth * GAME_CONSTANTS.UI.MOBILE_ASPECT_RATIO;
        if (heightFromWidth <= maxHeight) {
          displayWidth = containerWidth;
          displayHeight = heightFromWidth;
        } else {
          displayHeight = maxHeight;
          displayWidth = displayHeight / GAME_CONSTANTS.UI.MOBILE_ASPECT_RATIO;
        }
      } else {
        const containerWidth = rect.width - GAME_CONSTANTS.UI.CONTAINER_PADDING;
        displayWidth = containerWidth;
        displayHeight = displayWidth / GAME_CONSTANTS.UI.DESKTOP_ASPECT_RATIO;
        if (displayWidth < GAME_CONSTANTS.UI.DESKTOP_MIN_WIDTH) {
          displayWidth = GAME_CONSTANTS.UI.DESKTOP_MIN_WIDTH;
          displayHeight = displayWidth / GAME_CONSTANTS.UI.DESKTOP_ASPECT_RATIO;
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
        this.player.position.x = displayWidth * 0.5;
        this.enemy.position.x = displayWidth * 0.5;
        this.player.position.y =
          displayHeight * GAME_CONSTANTS.CHARACTER.MOBILE_PLAYER_Y_RATIO;
        this.enemy.position.y =
          displayHeight * GAME_CONSTANTS.CHARACTER.MOBILE_ENEMY_Y_RATIO;
        // Reset to original size for mobile
        this.player.size.width = GAME_CONSTANTS.CHARACTER.WIDTH;
        this.player.size.height = GAME_CONSTANTS.CHARACTER.HEIGHT;
        this.enemy.size.width = GAME_CONSTANTS.CHARACTER.WIDTH;
        this.enemy.size.height = GAME_CONSTANTS.CHARACTER.HEIGHT;
      } else {
        this.player.position.x = Math.min(
          150,
          displayWidth * GAME_CONSTANTS.CHARACTER.DESKTOP_X_RATIO
        );
        this.enemy.position.x = Math.max(
          displayWidth - 150,
          displayWidth * GAME_CONSTANTS.CHARACTER.DESKTOP_ENEMY_X_RATIO
        );
        // Position between 2/3 and 3/4 (midpoint)
        const desktopYRatio = (2 / 3 + 3 / 4) / 2;
        this.player.position.y = displayHeight * desktopYRatio;
        this.enemy.position.y = displayHeight * desktopYRatio;
        // Make sprites 56.25% larger for desktop (1.25 * 1.25 = 1.5625)
        this.player.size.width = GAME_CONSTANTS.CHARACTER.WIDTH * 1.5625;
        this.player.size.height = GAME_CONSTANTS.CHARACTER.HEIGHT * 1.5625;
        this.enemy.size.width = GAME_CONSTANTS.CHARACTER.WIDTH * 1.5625;
        this.enemy.size.height = GAME_CONSTANTS.CHARACTER.HEIGHT * 1.5625;
      }
      this.updateSpearPositions();

      // Reinitialize fog if on intro screen (to match new dimensions)
      if (this.gameStatus === "intro") {
        this.initializeFog();
      }
    }
  }

  public handlePlayerAttack(): void {
    if (
      this.gameStatus !== "playing" ||
      this.player.attackCooldown > 0 ||
      this.player.spear.progress > 0
    ) {
      return;
    }

    if (this.player.stamina < GAME_CONSTANTS.STAMINA.ATTACK_COST) {
      return;
    }

    this.player.stamina = Math.max(
      0,
      this.player.stamina - GAME_CONSTANTS.STAMINA.ATTACK_COST
    );
    this.perfectBlock.attempted = false;
    this.updateSpearPositions();

    // Calculate distance from player spear base to enemy's left edge (where spear should hit)
    const enemyTargetX = this.enemy.position.x - this.enemy.size.width / 2;
    const enemyTargetY = this.enemy.position.y;
    const dx = enemyTargetX - this.player.spear.baseX;
    const dy = enemyTargetY - this.player.spear.baseY;
    this.player.spear.targetDistance = Math.sqrt(dx * dx + dy * dy);

    this.player.animation.state = "attack";
    this.player.animation.timer =
      GAME_CONSTANTS.ANIMATION.PLAYER_SPEAR_DURATION;
    this.player.spear.progress = 0.01;
    this.player.spear.timer = 0;
    this.player.spear.damageDealt = false;
    // Apply attack speed upgrade (reduces cooldown by 10% per level)
    const attackSpeedMultiplier = Math.max(
      0.1,
      1 - this.upgrades.attackSpeed * 0.1
    );
    this.player.attackCooldown =
      this.upgrades.baseAttackCooldown * attackSpeedMultiplier;

    // Play attack sound
    this.audioManager.playSound("attack.mp3");
  }

  public handlePlayerBlock(): void {
    if (this.gameStatus !== "playing" || this.player.blockCooldown > 0) {
      return;
    }

    if (
      !this.player.isBlocking &&
      this.player.stamina < GAME_CONSTANTS.STAMINA.BLOCK_COST
    ) {
      return;
    }

    if (!this.player.isBlocking) {
      this.player.stamina = Math.max(
        0,
        this.player.stamina - GAME_CONSTANTS.STAMINA.BLOCK_COST
      );
      this.player.animation.state = "block";
      this.player.blockCooldown = GAME_CONSTANTS.COOLDOWN.BLOCK;
      // Play block sound when starting to block
      this.audioManager.playSound("block.mp3");
    }

    this.player.isBlocking = true;
  }

  public checkPerfectBlockOnPress(): void {
    if (
      !this.enemy.isAttacking ||
      this.enemy.stunTimer > 0 ||
      this.perfectBlock.attempted
    ) {
      return;
    }

    const attackProgress =
      this.enemy.attackDuration / this.enemy.attackTotalDuration;
    const perfectBlockWindow = this.getPerfectBlockWindow();
    const windowStart = perfectBlockWindow.start;
    const windowEnd = perfectBlockWindow.end;

    if (attackProgress >= windowStart && attackProgress <= windowEnd) {
      this.perfectBlock.attempted = true;
      this.perfectBlock.active = true;
      this.perfectBlock.timer = this.perfectBlock.duration;
      this.enemy.stunTimer = GAME_CONSTANTS.PERFECT_BLOCK.STUN_DURATION;

      // Play perfect block sound
      this.audioManager.playSound("perfect-block.mp3");

      // Restore stamina as promised in intro screen
      const staminaRestore = Math.min(
        GAME_CONSTANTS.STAMINA.ATTACK_COST + GAME_CONSTANTS.STAMINA.BLOCK_COST,
        this.player.maxStamina - this.player.stamina
      );
      this.player.stamina += staminaRestore;

      this.stats.perfectBlocks++;
      const perfectBlockScore = Math.floor(
        GAME_CONSTANTS.PERFECT_BLOCK.SCORE_BASE * this.score.multiplier
      );
      this.score.value += perfectBlockScore;
      this.score.multiplier = Math.min(
        GAME_CONSTANTS.SCORE.MAX_MULTIPLIER,
        this.score.multiplier + GAME_CONSTANTS.PERFECT_BLOCK.MULTIPLIER_INCREASE
      );

      this.ui.screenShake.intensity =
        GAME_CONSTANTS.SCREEN_SHAKE.PERFECT_BLOCK_INTENSITY;

      // Create perfect block particles
      const particleCount = GAME_CONSTANTS.PARTICLES.PERFECT_BLOCK_COUNT;
      const speed = GAME_CONSTANTS.PARTICLES.PERFECT_BLOCK_SPEED;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        this.perfectBlock.particles.push({
          x: this.player.position.x,
          y: this.player.position.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          color: COLORS.PERFECT_BLOCK,
        });
      }

      // Add spark particles
      const sparkCount = GAME_CONSTANTS.PARTICLES.PERFECT_BLOCK_SPARK_COUNT;
      const sparkLife = GAME_CONSTANTS.PARTICLES.PERFECT_BLOCK_SPARK_LIFE;
      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + Math.random() * 0.5;
        this.particles.hit.push({
          x: this.player.position.x,
          y: this.player.position.y,
          vx: Math.cos(angle) * (2 + Math.random() * 3),
          vy: Math.sin(angle) * (2 + Math.random() * 3),
          life: sparkLife,
          maxLife: sparkLife,
          color: COLORS.PERFECT_BLOCK,
          size: 2 + Math.random() * 3,
        });
      }

      this.enemy.isAttacking = false;
      this.enemy.attackDuration = 0;
      this.enemy.attackTimer = 0;
      this.enemy.spear.progress = 0;
      this.enemy.spear.damageDealt = false;
      this.enemy.spear.targetDistance = 0;
      this.updateSpearPositions();
    }
  }

  private createHitParticles(
    x: number,
    y: number,
    color: string,
    count: number = GAME_CONSTANTS.PARTICLES.HIT_COUNT
  ): void {
    const particles = this.createParticles(
      x,
      y,
      count,
      color,
      1.5, // Average speed
      GAME_CONSTANTS.PARTICLES.HIT_LIFE,
      3
    );
    // Add random variation to velocities
    particles.forEach((p) => {
      p.vx += (Math.random() - 0.5) * 1;
      p.vy += (Math.random() - 0.5) * 1;
    });
    this.particles.hit.push(...particles);
  }

  private createDeathExplosion(): void {
    const centerX = this.player.position.x + this.player.size.width / 2;
    const centerY = this.player.position.y + this.player.size.height / 2;
    const count = GAME_CONSTANTS.PARTICLES.DEATH_EXPLOSION_COUNT;
    const life = GAME_CONSTANTS.PARTICLES.DEATH_EXPLOSION_LIFE;
    const speed = GAME_CONSTANTS.PARTICLES.DEATH_EXPLOSION_SPEED;

    // Clear any existing death explosion particles
    this.particles.deathExplosion = [];

    // Create explosion particles with varied colors (blue/cyan to represent the player)
    const colors = [
      "#8BB8E8",
      "#00FFFF",
      "#0080FF",
      "#4A90E2",
      "#87CEEB",
      "#B0E0E6",
    ];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
      const particleSpeed = speed * (0.7 + Math.random() * 0.6); // Vary speed
      const color = colors[Math.floor(Math.random() * colors.length)];

      this.particles.deathExplosion.push({
        x: centerX + (Math.random() - 0.5) * 10,
        y: centerY + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * particleSpeed,
        vy: Math.sin(angle) * particleSpeed,
        life,
        maxLife: life,
        color,
        size: 4 + Math.random() * 6, // Varied particle sizes (larger for visibility)
      });
    }
  }

  private createEnemyDeathExplosion(): void {
    const config = this.cachedLevelConfig!;
    const centerX = this.enemy.position.x + this.enemy.size.width / 2;
    const centerY = this.enemy.position.y + this.enemy.size.height / 2;
    const count = GAME_CONSTANTS.PARTICLES.DEATH_EXPLOSION_COUNT;
    const life = GAME_CONSTANTS.PARTICLES.DEATH_EXPLOSION_LIFE;
    const speed = GAME_CONSTANTS.PARTICLES.DEATH_EXPLOSION_SPEED;

    // Clear any existing enemy death explosion particles
    this.particles.enemyDeathExplosion = [];

    // Create explosion particles with enemy's color theme
    // Use the enemy color and create variations
    const enemyColorRgb = this.hexToRgb(config.enemyColor);
    const colors = [
      config.enemyColor,
      `rgb(${Math.min(255, enemyColorRgb.r + 30)}, ${Math.min(
        255,
        enemyColorRgb.g + 30
      )}, ${Math.min(255, enemyColorRgb.b + 30)})`,
      `rgb(${Math.max(0, enemyColorRgb.r - 30)}, ${Math.max(
        0,
        enemyColorRgb.g - 30
      )}, ${Math.max(0, enemyColorRgb.b - 30)})`,
      `rgba(${enemyColorRgb.r}, ${enemyColorRgb.g}, ${enemyColorRgb.b}, 0.8)`,
    ];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
      const particleSpeed = speed * (0.7 + Math.random() * 0.6); // Vary speed
      const color = colors[Math.floor(Math.random() * colors.length)];

      this.particles.enemyDeathExplosion.push({
        x: centerX + (Math.random() - 0.5) * 10,
        y: centerY + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * particleSpeed,
        vy: Math.sin(angle) * particleSpeed,
        life,
        maxLife: life,
        color,
        size: 4 + Math.random() * 6, // Varied particle sizes (larger for visibility)
      });
    }
  }

  private createBlockParticles(x: number, y: number): void {
    const count = GAME_CONSTANTS.PARTICLES.BLOCK_COUNT;
    const life = GAME_CONSTANTS.PARTICLES.BLOCK_LIFE;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      this.particles.block.push({
        x: x - 30,
        y: y + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * (0.5 + Math.random() * 1),
        vy: Math.sin(angle) * (0.5 + Math.random() * 1),
        life,
        maxLife: life,
        color: COLORS.PLAYER,
        size: 2 + Math.random() * 2,
      });
    }
  }

  private dealDamageToPlayer(
    damage: number,
    isBlocked: boolean,
    enemyColor: string
  ): void {
    this.player.health = Math.max(0, this.player.health - damage);
    this.stats.hitsTaken++;
    // Only reset multiplier on unblocked hits
    if (!isBlocked) {
      this.score.multiplier = 1.0;
    }

    if (isBlocked) {
      this.stats.attacksBlocked++;
      this.ui.screenShake.intensity =
        GAME_CONSTANTS.SCREEN_SHAKE.BLOCKED_HIT_INTENSITY;
    } else {
      // Play attack-hit sound when player gets hit (not blocked)
      this.audioManager.playSound("attack-hit.mp3");
      this.player.animation.state = "hit";
      this.player.animation.timer = GAME_CONSTANTS.ANIMATION.HIT_DURATION;
      this.player.lastHitTime = Date.now();
      this.ui.screenShake.intensity = GAME_CONSTANTS.SCREEN_SHAKE.HIT_INTENSITY;
    }

    this.ui.damageNumbers.push({
      x: this.player.position.x,
      y: this.player.position.y,
      value: damage,
      type: "enemy",
      life: 1000,
      maxLife: 1000,
      offsetY: 0,
    });

    if (isBlocked) {
      this.createBlockParticles(this.player.position.x, this.player.position.y);
    } else {
      this.createHitParticles(
        this.player.position.x,
        this.player.position.y,
        enemyColor
      );
      // Note: Attack effect removed - hit flash on sprite provides visual feedback
    }

    if (this.player.health <= 0 && this.gameStatus === "playing") {
      const oldStatus = this.gameStatus;
      this.gameStatus = "deathScreen";
      this.deathScreenTimer = 0;
      this.deathScreenWaitingForInput = false;
      this.handleGameStatusChange(oldStatus, this.gameStatus);
      // Create death explosion particles
      this.createDeathExplosion();
    }
  }

  private updateEnemySpearPosition(): void {
    this.enemy.spear.progress =
      this.enemy.attackDuration / this.enemy.attackTotalDuration;

    // Use calculated target distance, or fallback to fixed distance if not set
    const travelDistance =
      this.enemy.spear.targetDistance > 0
        ? this.enemy.spear.targetDistance
        : this.getMobileValue(
            GAME_CONSTANTS.SPEAR.MOBILE_TRAVEL_DISTANCE,
            GAME_CONSTANTS.SPEAR.DESKTOP_TRAVEL_DISTANCE
          );

    // Calculate direction vector from spear base to player
    const dx = this.player.position.x - this.enemy.spear.baseX;
    const dy = this.player.position.y - this.enemy.spear.baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      // Normalize direction and multiply by progress
      const normalizedDx = dx / distance;
      const normalizedDy = dy / distance;
      this.enemy.spear.x =
        this.enemy.spear.baseX +
        normalizedDx * travelDistance * this.enemy.spear.progress;
      this.enemy.spear.y =
        this.enemy.spear.baseY +
        normalizedDy * travelDistance * this.enemy.spear.progress;
    } else {
      // Fallback to old behavior if distance is 0
      if (this.isMobile()) {
        this.enemy.spear.x = this.enemy.spear.baseX;
        this.enemy.spear.y =
          this.enemy.spear.baseY - travelDistance * this.enemy.spear.progress;
      } else {
        this.enemy.spear.x =
          this.enemy.spear.baseX - travelDistance * this.enemy.spear.progress;
        this.enemy.spear.y = this.enemy.spear.baseY;
      }
    }
  }

  private processEnemyAttackHit(): void {
    const config = this.getCurrentLevelConfig();
    this.dealDamageToPlayer(config.enemyDamage, false, config.enemyColor);
  }

  private processEnemyAttackBlock(): void {
    const config = this.getCurrentLevelConfig();
    // Apply block efficiency upgrade (reduces damage by additional 5% per level)
    const baseReduction = GAME_CONSTANTS.DAMAGE.BLOCK_REDUCTION;
    const efficiencyBonus = this.upgrades.blockEfficiency * 0.05;
    const totalReduction = Math.min(0.95, baseReduction - efficiencyBonus);
    const damage = config.enemyDamage * totalReduction;
    // Play attack block sound
    this.audioManager.playSound("attack-block.mp3");
    this.dealDamageToPlayer(damage, true, config.enemyColor);
  }

  private updateEnemyAttack(deltaTime: number): void {
    if (this.gameStatus !== "playing") {
      return;
    }

    if (this.enemy.stunTimer > 0) {
      this.enemy.stunTimer = Math.max(0, this.enemy.stunTimer - deltaTime);
      return;
    }

    this.enemy.attackTimer += deltaTime;

    if (this.enemy.isAttacking) {
      this.enemy.attackDuration += deltaTime;

      // Synchronize animation timer with attack duration
      if (this.enemy.animation.state === "attack") {
        this.enemy.animation.timer = Math.max(
          0,
          this.enemy.attackTotalDuration - this.enemy.attackDuration
        );
      }

      this.updateEnemySpearPosition();

      // Apply damage when spear reaches target (progress >= 1.0 or very close)
      const attackProgress =
        this.enemy.attackDuration / this.enemy.attackTotalDuration;

      if (!this.enemy.spear.damageDealt && attackProgress >= 0.99) {
        if (!this.player.isBlocking) {
          this.processEnemyAttackHit();
        } else {
          this.processEnemyAttackBlock();
        }
        this.enemy.spear.damageDealt = true;
      }

      if (this.enemy.attackDuration >= this.enemy.attackTotalDuration) {
        this.enemy.isAttacking = false;
        this.enemy.attackDuration = 0;
        this.enemy.attackTimer = 0;
        this.enemy.spear.progress = 0;
        this.enemy.spear.damageDealt = false;
        this.enemy.spear.targetDistance = 0;
        if (this.enemy.animation.state === "attack") {
          this.enemy.animation.state = "idle";
          this.enemy.animation.timer = 0;
        }
        this.updateSpearPositions();
      }
    } else if (this.enemy.attackTimer >= this.enemy.attackCooldown) {
      this.updateSpearPositions();

      // Calculate distance from enemy spear base to player's right edge (where spear should hit)
      const playerTargetX = this.player.position.x + this.player.size.width / 2;
      const playerTargetY = this.player.position.y;
      const dx = playerTargetX - this.enemy.spear.baseX;
      const dy = playerTargetY - this.enemy.spear.baseY;
      this.enemy.spear.targetDistance = Math.sqrt(dx * dx + dy * dy);

      // Play attack sound when enemy starts attacking
      this.audioManager.playSound("attack.mp3");
      this.enemy.isAttacking = true;
      this.enemy.attackTimer = 0;
      this.enemy.attackDuration = 0;
      this.enemy.spear.progress = 0;
      this.enemy.spear.damageDealt = false;
      this.enemy.animation.state = "attack";
      this.enemy.animation.timer = this.enemy.attackTotalDuration;
      this.perfectBlock.attempted = false;
    }
  }

  private dealDamageToEnemy(damage: number): void {
    this.enemy.health = Math.max(0, this.enemy.health - damage);
    this.stats.totalDamageDealt += damage;
    this.stats.totalAttacks++;

    // Play attack hit sound
    this.audioManager.playSound("attack-hit.mp3");

    const damageScore = Math.floor(
      damage * GAME_CONSTANTS.DAMAGE.SCORE_MULTIPLIER * this.score.multiplier
    );
    this.score.value += damageScore;

    this.enemy.animation.state = "hit";
    this.enemy.animation.timer = GAME_CONSTANTS.ANIMATION.HIT_DURATION;
    this.ui.screenShake.intensity =
      GAME_CONSTANTS.SCREEN_SHAKE.PLAYER_HIT_INTENSITY;

    this.ui.damageNumbers.push({
      x: this.enemy.position.x,
      y: this.enemy.position.y,
      value: damage,
      type: "player",
      life: 1000,
      maxLife: 1000,
      offsetY: 0,
    });

    this.createHitParticles(
      this.enemy.position.x,
      this.enemy.position.y,
      COLORS.PLAYER,
      10
    );

    const trailLife = GAME_CONSTANTS.PARTICLES.ATTACK_TRAIL_LIFE;
    const trailCount = GAME_CONSTANTS.PARTICLES.ATTACK_TRAIL_COUNT;
    for (let i = 0; i < trailCount; i++) {
      this.particles.attackTrail.push({
        x: this.player.spear.x + (Math.random() - 0.5) * 20,
        y: this.player.spear.y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: trailLife,
        maxLife: trailLife,
        color: COLORS.PLAYER,
        size: 1 + Math.random() * 2,
      });
    }

    // Note: Attack effect removed - hit flash on sprite provides visual feedback

    if (this.enemy.health <= 0 && this.gameStatus === "playing") {
      // Award gold for defeating enemy
      this.awardGold();
      // Create enemy death explosion and delay victory screen
      const oldStatus = this.gameStatus;
      this.gameStatus = "enemyDeath";
      this.enemyDeathTimer = 0;
      this.handleGameStatusChange(oldStatus, this.gameStatus);
      this.createEnemyDeathExplosion();

      // Calculate score bonuses (will be applied after explosion)
      const levelBonus =
        this.currentLevel * GAME_CONSTANTS.SCORE.LEVEL_BONUS_MULTIPLIER;
      this.score.value += Math.floor(levelBonus * this.score.multiplier);
    }
  }

  private updatePlayerSpearPosition(): void {
    // Use calculated target distance, or fallback to fixed distance if not set
    const travelDistance =
      this.player.spear.targetDistance > 0
        ? this.player.spear.targetDistance
        : this.getMobileValue(
            GAME_CONSTANTS.SPEAR.MOBILE_TRAVEL_DISTANCE,
            GAME_CONSTANTS.SPEAR.DESKTOP_TRAVEL_DISTANCE
          );

    // Calculate direction vector from spear base to enemy's left edge
    const enemyTargetX = this.enemy.position.x - this.enemy.size.width / 2;
    const enemyTargetY = this.enemy.position.y;
    const dx = enemyTargetX - this.player.spear.baseX;
    const dy = enemyTargetY - this.player.spear.baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      // Normalize direction and multiply by progress
      const normalizedDx = dx / distance;
      const normalizedDy = dy / distance;
      this.player.spear.x =
        this.player.spear.baseX +
        normalizedDx * travelDistance * this.player.spear.progress;
      this.player.spear.y =
        this.player.spear.baseY +
        normalizedDy * travelDistance * this.player.spear.progress;
    } else {
      // Fallback to old behavior if distance is 0
      if (this.isMobile()) {
        this.player.spear.x = this.player.spear.baseX;
        this.player.spear.y =
          this.player.spear.baseY + travelDistance * this.player.spear.progress;
      } else {
        this.player.spear.x =
          this.player.spear.baseX + travelDistance * this.player.spear.progress;
        this.player.spear.y = this.player.spear.baseY;
      }
    }
  }

  private updatePlayerSpear(deltaTime: number): void {
    if (this.player.spear.progress > 0) {
      this.player.spear.timer += deltaTime;
      this.player.spear.progress = Math.min(
        1,
        this.player.spear.timer / GAME_CONSTANTS.ANIMATION.PLAYER_SPEAR_DURATION
      );

      // Synchronize animation timer with spear progress
      if (this.player.animation.state === "attack") {
        this.player.animation.timer =
          GAME_CONSTANTS.ANIMATION.PLAYER_SPEAR_DURATION *
          (1 - this.player.spear.progress);
      }

      this.updatePlayerSpearPosition();

      // Apply damage when spear reaches target (progress >= 1.0 or very close)
      if (
        !this.player.spear.damageDealt &&
        this.player.spear.progress >= 0.99
      ) {
        this.dealDamageToEnemy(this.getPlayerDamage());
        this.player.spear.damageDealt = true;
      }

      if (this.player.spear.progress >= 1) {
        this.player.spear.progress = 0;
        this.player.spear.timer = 0;
        this.player.spear.targetDistance = 0;
        if (this.player.animation.state === "attack") {
          this.player.animation.state = "idle";
          this.player.animation.timer = 0;
        }
        this.updateSpearPositions();
      }
    }
  }

  private updatePerfectBlock(deltaTime: number): void {
    if (this.perfectBlock.active) {
      this.perfectBlock.timer -= deltaTime;
      if (this.perfectBlock.timer <= 0) {
        this.perfectBlock.active = false;
      }
    }

    this.perfectBlock.particles = this.updateSimpleParticles(
      this.perfectBlock.particles,
      deltaTime,
      GAME_CONSTANTS.PARTICLES.PERFECT_BLOCK_FADE_TIME
    );

    this.particles.hit = this.updateParticles(
      this.particles.hit,
      deltaTime,
      GAME_CONSTANTS.PARTICLES.HIT_FRICTION
    );

    this.particles.block = this.updateParticles(
      this.particles.block,
      deltaTime,
      GAME_CONSTANTS.PARTICLES.BLOCK_FRICTION
    );

    this.particles.attackTrail = this.updateParticles(
      this.particles.attackTrail,
      deltaTime,
      GAME_CONSTANTS.PARTICLES.TRAIL_FRICTION
    );

    this.particles.deathExplosion = this.updateParticles(
      this.particles.deathExplosion,
      deltaTime,
      GAME_CONSTANTS.PARTICLES.DEATH_EXPLOSION_FRICTION
    );

    this.particles.enemyDeathExplosion = this.updateParticles(
      this.particles.enemyDeathExplosion,
      deltaTime,
      GAME_CONSTANTS.PARTICLES.DEATH_EXPLOSION_FRICTION
    );
  }

  private updateLevelProgression(deltaTime: number): void {
    // Level complete screen now waits for space key press (handled in keydownHandler)
  }

  private update(deltaTime: number): void {
    // Update fog particles for intro screen
    if (this.gameStatus === "intro") {
      this.updateFog(deltaTime);
    }

    // Update logo fade progress
    if (
      this.gameStatus === "intro" &&
      this.logoFadeStartTime > 0 &&
      this.fadeOutStartTime === 0
    ) {
      const elapsed = performance.now() - this.logoFadeStartTime;
      this.logoFadeProgress = Math.min(1, elapsed / this.logoFadeDuration);

      // Start button fade-in when logo fade completes
      if (this.logoFadeProgress >= 1 && this.buttonFadeStartTime === 0) {
        this.buttonFadeStartTime = performance.now();
        this.buttonFadeProgress = 0;
      }
    }

    // Update button fade progress
    if (
      this.gameStatus === "intro" &&
      this.buttonFadeStartTime > 0 &&
      this.fadeOutStartTime === 0
    ) {
      const elapsed = performance.now() - this.buttonFadeStartTime;
      this.buttonFadeProgress = Math.min(1, elapsed / this.buttonFadeDuration);
    }

    // Update fade-out progress
    if (this.fadeOutStartTime > 0) {
      const elapsed = performance.now() - this.fadeOutStartTime;
      this.fadeOutProgress = Math.min(1, elapsed / this.fadeOutDuration);

      // Transition after fade-out completes
      if (this.fadeOutProgress >= 1 && this.pendingTransition) {
        const oldStatus = this.gameStatus;
        this.gameStatus = this.pendingTransition;
        this.handleGameStatusChange(oldStatus, this.gameStatus);
        this.fadeOutProgress = 0;
        this.fadeOutStartTime = 0;
        this.pendingTransition = null;
        // Reset logo and button fade if going back to intro
        if (this.gameStatus === "intro") {
          this.logoFadeProgress = 0;
          this.logoFadeStartTime = performance.now();
          this.buttonFadeProgress = 0;
          this.buttonFadeStartTime = 0;
        }
        // Initialize level when transitioning to playing
        if (this.gameStatus === "playing") {
          this.resetGameState(true); // Preserve upgrades
          this.initializeLevel();
        }
      }
    }

    // Update cooldowns
    if (this.player.attackCooldown > 0) {
      this.player.attackCooldown = Math.max(
        0,
        this.player.attackCooldown - deltaTime
      );
    }
    if (this.player.blockCooldown > 0) {
      this.player.blockCooldown = Math.max(
        0,
        this.player.blockCooldown - deltaTime
      );
    }

    // Update stamina regeneration and block drain
    if (this.player.isBlocking) {
      // Continuous stamina drain while holding block
      const drainRate =
        (GAME_CONSTANTS.STAMINA.BLOCK_DRAIN_RATE * deltaTime) / 1000;
      this.player.stamina = Math.max(0, this.player.stamina - drainRate);
      if (this.player.stamina <= 0) {
        this.player.isBlocking = false;
        this.player.animation.state = "idle";
      }
    } else if (this.player.stamina < this.player.maxStamina) {
      // Stamina regeneration when not blocking (with upgrade bonus)
      const regenRate =
        this.upgrades.baseStaminaRegenRate + this.upgrades.staminaRegen * 5;
      const regenAmount = (regenRate * deltaTime) / 1000;
      this.player.stamina = Math.min(
        this.player.maxStamina,
        this.player.stamina + regenAmount
      );
    }

    // Update game systems
    this.updatePlayerSpear(deltaTime);
    this.updateEnemyAttack(deltaTime);
    this.updatePerfectBlock(deltaTime);
    this.updateLevelProgression(deltaTime);

    // Update death screen timer
    if (this.gameStatus === "deathScreen") {
      this.deathScreenTimer += deltaTime;
      // After showing stats, wait for player input instead of auto-transitioning
      const explosionDuration = GAME_CONSTANTS.DEATH_SCREEN.EXPLOSION_DURATION;
      const fadeInDuration = GAME_CONSTANTS.DEATH_SCREEN.FADE_IN_DURATION;
      const holdDuration = GAME_CONSTANTS.DEATH_SCREEN.HOLD_DURATION;
      const moveUpDuration = GAME_CONSTANTS.DEATH_SCREEN.FADE_OUT_DURATION;
      const statsShownDuration =
        explosionDuration + fadeInDuration + holdDuration + moveUpDuration;

      if (
        this.deathScreenTimer >= statsShownDuration &&
        !this.deathScreenWaitingForInput
      ) {
        // Stats are now shown, wait for player input
        this.deathScreenWaitingForInput = true;
      }
      // Don't auto-transition - wait for click input
    }

    // Update enemy death timer
    if (this.gameStatus === "enemyDeath") {
      this.enemyDeathTimer += deltaTime;
      if (
        this.enemyDeathTimer >= GAME_CONSTANTS.ENEMY_DEATH.EXPLOSION_DURATION
      ) {
        // Transition to victory screen after explosion
        const oldStatus = this.gameStatus;
        if (this.currentLevel >= GAME_CONSTANTS.LEVEL.MAX_LEVEL) {
          this.gameStatus = "level5Victory";
          this.level5VictoryTimer = 0;
        } else {
          this.gameStatus = "enemyVanquished";
          this.enemyVanquishedTimer = 0;
        }
        this.handleGameStatusChange(oldStatus, this.gameStatus);
      }
    }

    // Update enemy vanquished screen timer
    if (this.gameStatus === "enemyVanquished") {
      this.enemyVanquishedTimer += deltaTime;
      if (
        this.enemyVanquishedTimer >=
        GAME_CONSTANTS.ENEMY_VANQUISHED_SCREEN.TOTAL_DURATION
      ) {
        const oldStatus = this.gameStatus;
        this.gameStatus = "levelComplete";
        this.levelCompleteTimer = 0; // No auto-transition, wait for space key
        this.handleGameStatusChange(oldStatus, this.gameStatus);
      }
    }

    // Update level 5 victory screen timer
    if (this.gameStatus === "level5Victory") {
      this.level5VictoryTimer += deltaTime;
      if (
        this.level5VictoryTimer >=
        GAME_CONSTANTS.LEVEL5_VICTORY_SCREEN.TOTAL_DURATION
      ) {
        const oldStatus = this.gameStatus;
        this.gameStatus = "upgradeMenu";
        this.score.value += Math.floor(
          GAME_CONSTANTS.SCORE.VICTORY_BONUS * this.score.multiplier
        );
        // Award bonus gold for completing NG+ cycle
        const ngPlusBonus =
          GAME_CONSTANTS.GOLD.NG_PLUS_BONUS_BASE *
          (this.upgrades.newGamePlusLevel + 1);
        const goldFindMultiplier = 1 + this.upgrades.goldFind * 0.1;
        this.lastNgPlusGoldEarned = Math.floor(
          ngPlusBonus * goldFindMultiplier
        );
        this.upgrades.gold += this.lastNgPlusGoldEarned;
        this.saveGameData();
        this.upgrades.selected = null;
        this.handleGameStatusChange(oldStatus, this.gameStatus);
      }
    }

    // Update UI effects
    this.ui.attackEffects = this.ui.attackEffects
      .map((effect) => ({ ...effect, duration: effect.duration - deltaTime }))
      .filter((effect) => effect.duration > 0);

    this.ui.damageNumbers = this.ui.damageNumbers
      .map((num) => ({
        ...num,
        life: num.life - deltaTime,
        offsetY: num.offsetY + deltaTime * 0.1,
      }))
      .filter((num) => num.life > 0);

    // Update screen shake
    const shake = this.ui.screenShake;
    if (shake.intensity > 0) {
      const angle = Math.random() * Math.PI * 2;
      const magnitude = shake.intensity;
      shake.offsetX = Math.cos(angle) * magnitude;
      shake.offsetY = Math.sin(angle) * magnitude;
      shake.intensity *= GAME_CONSTANTS.SCREEN_SHAKE.DECAY;
      if (shake.intensity < GAME_CONSTANTS.SCREEN_SHAKE.MIN_INTENSITY) {
        shake.intensity = 0;
        shake.offsetX = 0;
        shake.offsetY = 0;
      }
    }

    // Update character animations
    // Skip countdown for attack animations - they are synchronized with spear/attack progress
    if (
      this.player.animation.timer > 0 &&
      this.player.animation.state !== "attack"
    ) {
      this.player.animation.timer = Math.max(
        0,
        this.player.animation.timer - deltaTime
      );
      if (
        this.player.animation.timer <= 0 &&
        this.player.animation.state !== "idle" &&
        !this.player.isBlocking
      ) {
        this.player.animation.state = "idle";
      }
    }
    if (
      this.enemy.animation.timer > 0 &&
      this.enemy.animation.state !== "attack"
    ) {
      this.enemy.animation.timer = Math.max(
        0,
        this.enemy.animation.timer - deltaTime
      );
      if (
        this.enemy.animation.timer <= 0 &&
        this.enemy.animation.state !== "idle"
      ) {
        this.enemy.animation.state = "idle";
      }
    }

    // Update block animation state
    if (this.player.isBlocking && this.player.animation.state !== "block") {
      this.player.animation.state = "block";
    } else if (
      !this.player.isBlocking &&
      this.player.animation.state === "block" &&
      this.player.animation.timer <= 0
    ) {
      this.player.animation.state = "idle";
    }
  }

  private drawSpear(
    x: number,
    y: number,
    progress: number,
    color: string,
    isEnemy: boolean
  ): void {
    const spearLength = this.getMobileValue(
      GAME_CONSTANTS.SPEAR.MOBILE_LENGTH,
      GAME_CONSTANTS.SPEAR.DESKTOP_LENGTH
    );
    const spearWidth = this.getMobileValue(
      GAME_CONSTANTS.SPEAR.MOBILE_WIDTH,
      GAME_CONSTANTS.SPEAR.DESKTOP_WIDTH
    );
    const tipLength = this.getMobileValue(
      GAME_CONSTANTS.SPEAR.MOBILE_TIP_LENGTH,
      GAME_CONSTANTS.SPEAR.DESKTOP_TIP_LENGTH
    );
    const isPortrait = this.isMobile();

    // Calculate spear color based on progress (for enemy)
    let spearColor = color;
    if (isEnemy && progress > 0) {
      // Use enemy's base color during wind-up, then transition to warning colors
      const transitionStart = GAME_CONSTANTS.SPEAR.COLOR_TRANSITION_START;
      if (progress < transitionStart) {
        // Wind-up: use enemy's base color
        spearColor = color;
      } else {
        // Strike: transition from enemy color -> orange -> red
        const transitionRange = GAME_CONSTANTS.SPEAR.COLOR_TRANSITION_RANGE;
        const strikeProgress = (progress - transitionStart) / transitionRange;
        const orangeToRedThreshold =
          GAME_CONSTANTS.SPEAR.COLOR_ORANGE_TO_RED_THRESHOLD;
        if (strikeProgress < orangeToRedThreshold) {
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

      if (isEnemy) {
        // Enemy spear points left (toward player)
        // Draw rectangle extending LEFT from x (base connection point)
        this.ctx.fillRect(
          x - spearLength,
          y - spearWidth / 2,
          spearLength,
          spearWidth
        );

        // Draw spear tip
        // Tip point is furthest left, base is at x (where shaft connects to character)
        this.ctx.beginPath();
        this.ctx.moveTo(x - spearLength - tipLength, y); // Tip point (furthest left)
        this.ctx.lineTo(x - spearLength, y - spearWidth * 2); // Top base vertex (at shaft)
        this.ctx.lineTo(x - spearLength, y + spearWidth * 2); // Bottom base vertex (at shaft)
        this.ctx.closePath();
        this.ctx.fill();
      } else {
        // Player spear points right (toward enemy)
        // Draw rectangle extending RIGHT from x
        this.ctx.fillRect(x, y - spearWidth / 2, spearLength, spearWidth);

        // Draw spear tip
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
        if (isEnemy) {
          // Enemy spear extends left
          this.ctx.fillRect(
            x - spearLength,
            y - spearWidth / 2,
            spearLength,
            spearWidth
          );
        } else {
          // Player spear extends right
          this.ctx.fillRect(x, y - spearWidth / 2, spearLength, spearWidth);
        }
      }
      this.ctx.shadowBlur = 0;
    }

    this.ctx.restore();
  }

  private drawPerfectBlockEffect(): void {
    if (!this.perfectBlock.active) {
      return;
    }

    // Draw shield effect around player
    const shieldRadius = 50;
    const alpha = this.perfectBlock.timer / this.perfectBlock.duration;

    // Outer glow
    this.ctx.save();
    this.ctx.globalAlpha = alpha * 0.8;
    const gradient = this.ctx.createRadialGradient(
      this.player.position.x,
      this.player.position.y,
      0,
      this.player.position.x,
      this.player.position.y,
      shieldRadius
    );
    gradient.addColorStop(0, "#00FFFF");
    gradient.addColorStop(0.5, "#0080FF");
    gradient.addColorStop(1, "transparent");
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(
      this.player.position.x,
      this.player.position.y,
      shieldRadius,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    // Shield ring
    this.ctx.strokeStyle = "#00FFFF";
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.arc(
      this.player.position.x,
      this.player.position.y,
      shieldRadius,
      0,
      Math.PI * 2
    );
    this.ctx.stroke();

    // Inner glow
    this.ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.3})`;
    this.ctx.beginPath();
    this.ctx.arc(
      this.player.position.x,
      this.player.position.y,
      shieldRadius * 0.6,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    this.ctx.restore();

    // Draw particles using helper methods
    this.drawSimpleParticles(this.perfectBlock.particles);
    this.drawParticles(this.particles.hit);
    this.drawParticles(this.particles.block);
    // Note: death explosion particles are drawn after death screen overlay

    // Draw attack trail particles with reduced alpha
    this.particles.attackTrail.forEach((particle) => {
      const alpha = (particle.life / particle.maxLife) * 0.7;
      this.ctx.save();
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Draw "PERFECT BLOCK!" text
    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    const perfectBlockY = this.getMobileValue(
      this.displayHeight / 2 - 30,
      this.displayHeight / 2 - 50
    );
    this.drawTextWithStroke(
      "PERFECT BLOCK!",
      this.displayWidth / 2,
      perfectBlockY,
      COLORS.PERFECT_BLOCK,
      32
    );
    this.ctx.restore();
  }

  private getPerfectBlockWindow(): { start: number; end: number } {
    // Apply perfect block window upgrade (+2% per level)
    const windowSizeIncrease = this.upgrades.perfectBlockWindow * 0.02;
    const baseWindowSize =
      GAME_CONSTANTS.PERFECT_BLOCK.WINDOW_END -
      GAME_CONSTANTS.PERFECT_BLOCK.WINDOW_START;
    const newWindowSize = Math.min(0.2, baseWindowSize + windowSizeIncrease);
    const windowCenter =
      (GAME_CONSTANTS.PERFECT_BLOCK.WINDOW_START +
        GAME_CONSTANTS.PERFECT_BLOCK.WINDOW_END) /
      2;
    const windowStart = Math.max(0.7, windowCenter - newWindowSize / 2);
    const windowEnd = Math.min(1.0, windowCenter + newWindowSize / 2);
    return { start: windowStart, end: windowEnd };
  }

  private drawPerfectBlockIndicator(): void {
    if (!this.enemy.isAttacking || this.enemy.stunTimer > 0) {
      return;
    }

    const attackProgress =
      this.enemy.attackDuration / this.enemy.attackTotalDuration;
    const perfectBlockWindow = this.getPerfectBlockWindow();
    const perfectBlockWindowStart = perfectBlockWindow.start;
    const perfectBlockWindowEnd = perfectBlockWindow.end;

    // Draw indicator showing enemy spear position
    const indicatorY = this.isMobile()
      ? (this.player.position.y + this.enemy.position.y) / 2 - 10
      : this.player.position.y - 80;
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
      const pulse = Math.sin(this.cachedCurrentTime / 100) * 0.3 + 0.7;
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
    // Cache expensive operations for this frame
    this.cachedCurrentTime = Date.now();
    this.cachedLevelConfig = this.getCurrentLevelConfig();
    this.cachedIsMobile = this.isMobile();

    // Apply camera offset for screen shake
    this.ctx.save();
    this.ctx.translate(
      this.ui.screenShake.offsetX,
      this.ui.screenShake.offsetY
    );

    // Clear canvas with background image or solid color
    if (
      this.backgroundImage &&
      this.gameStatus !== "startScreen" &&
      this.gameStatus !== "intro"
    ) {
      // Draw background image scaled to fit canvas
      this.ctx.drawImage(
        this.backgroundImage,
        -this.ui.screenShake.offsetX,
        -this.ui.screenShake.offsetY,
        this.displayWidth,
        this.displayHeight
      );
    } else {
      // Fallback to solid color
      this.ctx.fillStyle = COLORS.BACKGROUND;
      this.ctx.fillRect(
        -this.ui.screenShake.offsetX,
        -this.ui.screenShake.offsetY,
        this.displayWidth,
        this.displayHeight
      );
    }

    // Skip game rendering during start screen and intro
    if (this.gameStatus !== "startScreen" && this.gameStatus !== "intro") {
      // Draw level display
      this.ctx.fillStyle = COLORS.TEXT_LIGHT_BLUE;
      this.ctx.font = `${this.getFontSize(24)} serif`;
      this.ctx.textAlign = "center";
      let levelText = `Level ${this.currentLevel}`;
      if (this.upgrades.newGamePlusLevel > 0) {
        levelText += ` | NG+ ${this.upgrades.newGamePlusLevel}`;
      }
      const levelY = this.isMobile() ? 25 : 35;
      this.ctx.fillText(levelText, this.displayWidth / 2, levelY);

      // Draw gold display under level/NG+ text (only during gameplay)
      if (this.gameStatus === "playing") {
        this.ctx.fillStyle = COLORS.GOLD;
        this.ctx.font = `bold ${this.getFontSize(18)} sans-serif`;
        this.ctx.textAlign = "center";
        const goldY = levelY + (this.isMobile() ? 22 : 28);
        this.ctx.fillText(
          `Gold: ${this.upgrades.gold.toLocaleString()}`,
          this.displayWidth / 2,
          goldY
        );
      }

      // Draw score display (only during gameplay)
      if (this.gameStatus === "playing") {
        this.ctx.fillStyle = COLORS.GOLD;
        this.ctx.font = `bold ${this.getFontSize(20)} sans-serif`;
        this.ctx.textAlign = "right";
        const scoreX = this.isMobile()
          ? this.displayWidth - 10
          : this.displayWidth - 20;
        let scoreY = this.isMobile() ? 25 : 35;
        this.ctx.fillText(
          `Score: ${this.score.value.toLocaleString()}`,
          scoreX,
          scoreY
        );

        // Draw score multiplier if above 1.0
        if (this.score.multiplier > 1.0) {
          this.ctx.fillStyle = COLORS.ERROR;
          this.ctx.font = `bold ${this.getFontSize(16)} sans-serif`;
          this.ctx.fillText(
            `x${this.score.multiplier.toFixed(1)}`,
            scoreX,
            scoreY + (this.isMobile() ? 18 : 20)
          );
        }
      }

      // Draw health bars
      const config = this.cachedLevelConfig!;

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
          this.player.health,
          this.player.maxHealth,
          "The Chosen One",
          undefined,
          healthBarWidth
        );

        // Stamina bar under player health bar (only during gameplay)
        if (this.gameStatus === "playing") {
          // Position stamina bar right under the player health bar
          const healthBarHeight = UI_CONSTANTS.HEALTH_BAR.HEIGHT;
          const staminaBarY =
            playerHealthBarY +
            healthBarHeight +
            UI_CONSTANTS.HEALTH_BAR.SPACING;
          this.drawStaminaBar(playerHealthBarX, staminaBarY, healthBarWidth);
        }

        // Enemy health bar below enemy character
        const enemyHealthBarY =
          this.enemy.position.y + this.enemy.size.height / 2 + 30;
        this.drawHealthBar(
          playerHealthBarX,
          enemyHealthBarY,
          this.enemy.health,
          config.enemyHealth,
          config.enemyName,
          config.enemyColor,
          healthBarWidth
        );
      } else {
        // Landscape mode: side by side
        const healthBarX = UI_CONSTANTS.HEALTH_BAR.DESKTOP_X_OFFSET;
        const healthBarY = UI_CONSTANTS.HEALTH_BAR.DESKTOP_Y_OFFSET;
        const healthBarWidth = UI_CONSTANTS.HEALTH_BAR.DESKTOP_WIDTH;
        this.drawHealthBar(
          healthBarX,
          healthBarY,
          this.player.health,
          this.player.maxHealth,
          "The Chosen One",
          undefined,
          healthBarWidth
        );
        const enemyHealthBarX = this.displayWidth - 250;
        this.drawHealthBar(
          enemyHealthBarX,
          healthBarY,
          this.enemy.health,
          config.enemyHealth,
          config.enemyName,
          config.enemyColor,
          healthBarWidth
        );

        // Draw stamina bar (only during gameplay)
        if (this.gameStatus === "playing") {
          const staminaBarY = UI_CONSTANTS.HEALTH_BAR.STAMINA_Y_OFFSET;
          this.drawStaminaBar(healthBarX, staminaBarY, healthBarWidth);
        }
      }

      // Draw player (hide during entire death screen)
      const isDead = this.gameStatus === "deathScreen";

      if (!isDead) {
        this.drawCharacter(
          this.player.position.x,
          this.player.position.y,
          this.player.size.width,
          this.player.size.height,
          COLORS.PLAYER,
          this.player.animation.state,
          false
        );

        // Draw player spear (always visible, floating)
        this.drawSpear(
          this.player.spear.x,
          this.player.spear.y,
          this.player.spear.progress,
          COLORS.PLAYER,
          false
        );
      }

      // Draw enemy (hide during enemy death explosion and victory screens)
      const isEnemyDead =
        this.gameStatus === "enemyDeath" ||
        this.gameStatus === "enemyVanquished" ||
        this.gameStatus === "level5Victory";

      if (!isEnemyDead) {
        const isStunned = this.enemy.stunTimer > 0;
        const flashAlpha = isStunned
          ? Math.sin(this.cachedCurrentTime / 100) * 0.5 + 0.5
          : 1;
        const enemyColor = config.enemyColor;
        const enemyColorRgb = this.hexToRgb(enemyColor);

        // Use animation state, but override with stunned if needed
        let enemyAnimState = this.enemy.animation.state;
        if (isStunned) {
          enemyAnimState = "hit";
        }

        this.drawCharacter(
          this.enemy.position.x,
          this.enemy.position.y,
          this.enemy.size.width,
          this.enemy.size.height,
          isStunned
            ? `rgba(${enemyColorRgb.r}, ${enemyColorRgb.g}, ${enemyColorRgb.b}, ${flashAlpha})`
            : enemyColor,
          enemyAnimState,
          true // isEnemy = true
        );

        // Draw enemy spear (always visible, floating)
        if (!isStunned) {
          this.drawSpear(
            this.enemy.spear.x,
            this.enemy.spear.y,
            this.enemy.spear.progress,
            enemyColor,
            true
          );
        }
      }

      // Draw perfect block effect
      this.drawPerfectBlockEffect();

      // Draw perfect block indicator
      this.drawPerfectBlockIndicator();

      // Draw attack effects
      this.ui.attackEffects.forEach((effect) => {
        this.drawAttackEffect(effect.x, effect.y, effect.type);
      });

      // Draw damage numbers
      this.drawDamageNumbers();
    }

    // Draw game status overlays
    if (this.gameStatus === "startScreen") {
      this.drawStartScreen();
    } else if (this.gameStatus === "intro") {
      this.drawIntro();
    } else if (this.gameStatus === "controls") {
      this.drawControls();
    } else if (this.gameStatus === "levelComplete") {
      this.drawLevelComplete();
    } else if (this.gameStatus === "upgradeMenu") {
      this.drawUpgradeMenu();
    } else if (this.gameStatus === "upgradesShop") {
      this.drawUpgradesShop();
    } else if (this.gameStatus === "deathScreen") {
      this.drawDeathScreen();
      // Draw death explosion particles on top of death screen overlay
      this.drawParticles(this.particles.deathExplosion);
    } else if (this.gameStatus === "enemyDeath") {
      // Draw enemy death explosion particles
      this.drawParticles(this.particles.enemyDeathExplosion);
    } else if (this.gameStatus === "enemyVanquished") {
      this.drawEnemyVanquishedScreen();
      // Draw enemy death explosion particles on top
      this.drawParticles(this.particles.enemyDeathExplosion);
    } else if (this.gameStatus === "level5Victory") {
      this.drawLevel5VictoryScreen();
      // Draw enemy death explosion particles on top
      this.drawParticles(this.particles.enemyDeathExplosion);
    } else if (this.gameStatus === "playerWon") {
      this.drawGameOver("Victory!", "#8BB8E8");
    } else if (this.gameStatus === "enemyWon") {
      const config = this.cachedLevelConfig!;
      this.drawGameOver(`Defeated by ${config.enemyName}!`, config.enemyColor);
    }

    // Draw mobile controls (on top of everything)
    this.drawMobileControls();

    // Restore camera transform
    this.ctx.restore();
  }

  private drawStartScreen(): void {
    // Black background
    this.ctx.fillStyle = COLORS.BLACK;
    this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);

    const centerX = this.displayWidth / 2;
    const centerY = this.displayHeight / 2;

    // "Click to start" text with pulsing effect
    const pulse = Math.sin(this.cachedCurrentTime / 500) * 0.3 + 0.7;
    this.ctx.save();
    this.ctx.globalAlpha = pulse;

    this.drawTextWithStroke(
      "Click to start",
      centerX,
      centerY,
      COLORS.TEXT_LIGHT_BLUE,
      this.getMobileValue(32, 48)
    );

    this.ctx.restore();
  }

  private drawIntro(): void {
    // Calculate overall opacity (fade out when transitioning)
    const overallOpacity = 1 - this.fadeOutProgress;

    // Black background
    this.ctx.fillStyle = COLORS.BLACK;
    this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);

    // Draw fog effect
    this.ctx.save();
    this.ctx.globalAlpha = overallOpacity;
    this.drawFog();
    this.ctx.restore();

    const centerX = this.displayWidth / 2;
    const centerY = this.displayHeight / 2;

    // Draw logo with fade-in animation
    let logoBottomY = centerY;
    if (this.logoImage && this.logoFadeProgress > 0) {
      const logoWidth = this.getMobileValue(200, 300);
      const logoHeight =
        (this.logoImage.height / this.logoImage.width) * logoWidth;
      const logoX = centerX - logoWidth / 2;
      const logoY = centerY - logoHeight / 2 - (this.isMobile() ? 60 : 80);
      logoBottomY = logoY + logoHeight;

      this.ctx.save();
      this.ctx.globalAlpha = this.logoFadeProgress * overallOpacity;
      this.ctx.drawImage(this.logoImage, logoX, logoY, logoWidth, logoHeight);
      this.ctx.restore();
    }

    // Only draw buttons after logo has finished fading in
    if (this.logoFadeProgress >= 1 && this.buttonFadeProgress > 0) {
      const buttonWidth = this.getMobileValue(100, 130);
      const buttonHeight = this.getMobileValue(44, 50);
      const buttonSpacing = this.getMobileValue(15, 20);
      const verticalSpacing = this.getMobileValue(50, 70); // Space between logo bottom and buttons
      const buttonY = logoBottomY + verticalSpacing;

      // Center three buttons under the logo
      // Total width = 3 buttons + 2 gaps
      const totalWidth = 3 * buttonWidth + 2 * buttonSpacing;
      const startX = centerX - totalWidth / 2;
      const startButtonX = startX;
      const controlsButtonX = startX + buttonWidth + buttonSpacing;
      const upgradesButtonX = startX + 2 * (buttonWidth + buttonSpacing);

      this.ctx.save();
      // Apply both button fade-in and fade-out opacity
      this.ctx.globalAlpha = this.buttonFadeProgress * overallOpacity;

      // Start button (left)
      this.drawButton(
        startButtonX,
        buttonY,
        buttonWidth,
        buttonHeight,
        "Start",
        this.buttonPressState.start
      );

      // Controls button (middle)
      this.drawButton(
        controlsButtonX,
        buttonY,
        buttonWidth,
        buttonHeight,
        "Controls",
        this.buttonPressState.controls
      );

      // Upgrades button (right)
      this.drawButton(
        upgradesButtonX,
        buttonY,
        buttonWidth,
        buttonHeight,
        "Upgrades",
        this.buttonPressState.upgrades
      );

      this.ctx.restore();
    }
  }

  private drawButton(
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    isPressed: boolean
  ): void {
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    // Button background
    this.ctx.fillStyle = isPressed ? COLORS.TEXT_LIGHT_BLUE : COLORS.TEXT_TEAL;
    this.ctx.strokeStyle = COLORS.GOLD;
    this.ctx.lineWidth = 2;

    // Draw rounded rectangle
    const radius = this.getMobileValue(8, 10);
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // Button text
    this.ctx.fillStyle = isPressed ? COLORS.BLACK : COLORS.TEXT_WHITE;
    this.ctx.font = `bold ${this.getFontSize(
      this.isMobile() ? 16 : 18
    )} sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(text, centerX, centerY);
  }

  private drawControls(): void {
    // Calculate overall opacity (fade out when transitioning)
    const overallOpacity = 1 - this.fadeOutProgress;

    // Black background
    this.ctx.fillStyle = COLORS.BLACK;
    this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);

    this.ctx.save();
    this.ctx.globalAlpha = overallOpacity;

    const centerX = this.displayWidth / 2;
    let currentY = this.isMobile() ? 60 : this.displayHeight * 0.15;

    // Title
    this.drawTextWithStroke(
      "Controls",
      centerX,
      currentY,
      COLORS.GOLD,
      this.getMobileValue(40, 48)
    );
    currentY += this.isMobile() ? 50 : 70;

    // Controls section
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = COLORS.TEXT_LIGHT_BLUE;
    this.ctx.font = `${this.getFontSize(this.isMobile() ? 14 : 16)} sans-serif`;

    // Show mobile controls for mobile, PC controls for desktop
    const controls = this.isMobile()
      ? ["Tap ATTACK button - Attack", "Tap BLOCK button - Block"]
      : ["Space - Attack", "Ctrl - Block", "R - Restart"];

    controls.forEach((control) => {
      this.ctx.fillText(control, centerX, currentY);
      currentY += this.isMobile() ? 25 : 30;
    });

    currentY += this.isMobile() ? 20 : 30;

    // Tips section
    this.ctx.fillStyle = COLORS.TEXT_TEAL;
    this.ctx.font = `${this.getFontSize(this.isMobile() ? 12 : 14)} sans-serif`;
    const tips = this.isMobile()
      ? [
          "• Manage stamina - attacks/blocks consume it",
          "• Defeat enemies to progress",
          "• Choose upgrades after level 5 on New Game Plus",
        ]
      : [
          "• Manage your stamina - attacks and blocks consume it",
          "• Defeat enemies to progress through levels",
          "• Choose upgrades after level 5 on New Game Plus",
        ];

    tips.forEach((tip) => {
      this.ctx.fillText(tip, centerX, currentY);
      currentY += this.isMobile() ? 20 : 25;
    });

    // Back button at bottom
    const buttonWidth = this.getMobileValue(120, 150);
    const buttonHeight = this.getMobileValue(44, 50);
    const buttonY = this.displayHeight - (this.isMobile() ? 80 : 100);
    const buttonX = centerX - buttonWidth / 2;

    this.drawButton(
      buttonX,
      buttonY,
      buttonWidth,
      buttonHeight,
      "Back",
      this.buttonPressState.back
    );

    this.ctx.restore();
  }

  private drawLevelComplete(showTopText: boolean = true): void {
    // Only draw background if not transitioning (when showTopText is false, we're transitioning)
    if (showTopText) {
      this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
      this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);
    }

    // Draw "ENEMY VANQUISHED" text at top (from previous screen, only if not transitioning)
    if (showTopText) {
      this.ctx.save();
      this.ctx.fillStyle = `rgba(255, 215, 0, 1)`; // Gold yellow
      const text = "ENEMY VANQUISHED";
      const maxWidth = this.displayWidth - 40; // 20px padding on each side
      let baseFontSize = this.isMobile() ? 48 : 64;
      let fontSize = parseFloat(this.getFontSize(baseFontSize));
      this.ctx.font = `bold ${fontSize}px serif`;
      let textWidth = this.ctx.measureText(text).width;
      if (textWidth > maxWidth) {
        fontSize = (fontSize * maxWidth) / textWidth;
        this.ctx.font = `bold ${fontSize}px serif`;
      }
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.shadowColor = `rgba(0, 0, 0, 0.8)`;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
      this.ctx.fillText(text, this.displayWidth / 2, 60);
      this.ctx.restore();
    }

    const config = this.cachedLevelConfig!;

    // Level complete title
    const titleY = this.getMobileValue(
      this.displayHeight / 2 - 60,
      this.displayHeight / 2 - 100
    );
    this.drawTextWithStroke(
      `Level ${this.currentLevel} Complete!`,
      this.displayWidth / 2,
      titleY,
      COLORS.TEXT_LIGHT_BLUE,
      48
    );

    // Enemy defeated
    const defeatedY = this.getMobileValue(
      this.displayHeight / 2 - 20,
      this.displayHeight / 2 - 40
    );
    this.drawTextWithStroke(
      `${config.enemyName} Defeated!`,
      this.displayWidth / 2,
      defeatedY,
      config.enemyColor,
      32
    );

    // Health regeneration message
    const missingHealth = this.player.maxHealth - this.player.health;
    if (missingHealth > 0) {
      const healAmount =
        missingHealth * GAME_CONSTANTS.LEVEL.HEALTH_REGEN_RATIO;
      this.ctx.fillStyle = COLORS.SUCCESS;
      this.ctx.font = `${this.getFontSize(20)} sans-serif`;
      this.ctx.fillText(
        `Health Restored: +${Math.ceil(healAmount)}`,
        this.displayWidth / 2,
        this.displayHeight / 2 + (this.isMobile() ? 10 : 20)
      );
    }

    // Press space/tap to continue message
    const continueY = this.displayHeight / 2 + (this.isMobile() ? 50 : 80);
    const continueText = this.isMobile()
      ? "Tap to Continue"
      : "Press Space to Continue";
    if (this.currentLevel < GAME_CONSTANTS.LEVEL.MAX_LEVEL) {
      this.ctx.fillStyle = COLORS.TEXT_WHITE;
      this.ctx.font = `${this.getFontSize(24)} sans-serif`;
      this.ctx.textAlign = "center";
      this.ctx.fillText(continueText, this.displayWidth / 2, continueY);
    } else {
      this.ctx.fillStyle = COLORS.GOLD;
      this.ctx.font = `bold ${this.getFontSize(28)} sans-serif`;
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "All Levels Complete!",
        this.displayWidth / 2,
        continueY - 30
      );
      this.ctx.fillStyle = COLORS.TEXT_WHITE;
      this.ctx.font = `${this.getFontSize(24)} sans-serif`;
      this.ctx.fillText(continueText, this.displayWidth / 2, continueY + 30);
    }
  }

  private drawUpgradeMenu(showTopText: boolean = true): void {
    // Only draw background if not transitioning (when showTopText is false, we're transitioning)
    if (showTopText) {
      this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
      this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);
    }

    // Draw "YOU WIN" text at top (from previous screen, only if not transitioning)
    if (showTopText) {
      this.ctx.save();
      this.ctx.fillStyle = `rgba(0, 255, 0, 1)`; // Bright green
      this.ctx.font = `bold ${this.getFontSize(64)} serif`;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.shadowColor = `rgba(0, 0, 0, 0.8)`;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
      this.ctx.fillText("YOU WIN", this.displayWidth / 2, 60);
      this.ctx.restore();
    }

    const centerX = this.displayWidth / 2;

    // Calculate layout to fit within canvas bounds on mobile
    if (this.isMobile()) {
      // Mobile layout - more compact, ensure everything fits
      const totalContentHeight = 400; // Approximate total height needed
      const topPadding = 20;
      const bottomPadding = 20;
      const availableHeight = this.displayHeight - topPadding - bottomPadding;
      const startY = topPadding + (availableHeight - totalContentHeight) / 2;

      // NG+ level display (moved lower to give "YOU WIN" text room)
      const ngPlusY = Math.max(120, startY + 60);
      this.drawTextWithStroke(
        `New Game+ ${this.upgrades.newGamePlusLevel + 1}`,
        centerX,
        ngPlusY,
        COLORS.TEXT_LIGHT_BLUE,
        26
      );

      // Instructions
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = `${this.getFontSize(20)} sans-serif`;
      this.ctx.textAlign = "center";
      const instructionsY = ngPlusY + 30;
      this.ctx.fillText("Tap an upgrade:", centerX, instructionsY);

      // Upgrade options
      const currentAttackDamage = this.getPlayerDamage();
      const options = [
        {
          key: "1",
          name: "Health",
          desc: `+${GAME_CONSTANTS.UPGRADE_INCREMENT} Max Health (Current: ${this.player.maxHealth})`,
          type: "health" as const,
        },
        {
          key: "2",
          name: "Stamina",
          desc: `+${GAME_CONSTANTS.UPGRADE_INCREMENT} Max Stamina (Current: ${this.player.maxStamina})`,
          type: "stamina" as const,
        },
        {
          key: "3",
          name: "Perfect Block",
          desc: `-${
            GAME_CONSTANTS.PERFECT_BLOCK.UPGRADE_REDUCTION
          }ms Perfect Block Duration (Current: ${Math.round(
            this.perfectBlock.duration
          )}ms)`,
          type: "perfectBlock" as const,
        },
        {
          key: "4",
          name: "Attack Damage",
          desc: `+${GAME_CONSTANTS.DAMAGE.UPGRADE_INCREMENT} Attack Damage (Current: ${currentAttackDamage})`,
          type: "attackDamage" as const,
        },
      ];

      const optionStartY = instructionsY + 30;
      const optionSpacing = 45; // Reduced from 55
      const leftPadding = 15; // Increased padding from left edge
      const rightPadding = 15; // Padding from right edge
      const optionWidth = this.displayWidth - leftPadding - rightPadding;
      const optionLeft = leftPadding;
      const optionRight = optionLeft + optionWidth;

      // Set text alignment to left for option text
      this.ctx.textAlign = "left";

      options.forEach((option, index) => {
        const y = optionStartY + index * optionSpacing;
        const isSelected = this.upgrades.selected === option.type;

        // Check if this option is being touched (for visual feedback)
        const isTouched =
          this.upgradeMenuTouchY !== null &&
          this.upgradeMenuTouchY >= y - 30 &&
          this.upgradeMenuTouchY <= y + 20;

        // Highlight selected or touched option
        if (isSelected || isTouched) {
          this.ctx.fillStyle = isTouched
            ? "rgba(139, 184, 232, 0.5)"
            : "rgba(139, 184, 232, 0.3)";
          this.ctx.fillRect(optionLeft, y - 30, optionWidth, 50);
        }

        // Option name - ensure it fits within bounds
        this.ctx.fillStyle = isSelected ? "#8BB8E8" : "#ffffff";
        this.ctx.font = `bold ${this.getFontSize(20)} sans-serif`;
        const nameX = optionLeft + 10; // 10px padding from option left edge
        this.ctx.fillText(option.name, nameX, y);

        // Description - ensure it fits within bounds and doesn't overflow
        this.ctx.fillStyle = "#cccccc";
        this.ctx.font = `${this.getFontSize(14)} sans-serif`;
        const descX = optionLeft + 10; // 10px padding from option left edge
        const maxDescWidth = optionRight - descX - 10; // Leave 10px padding on right

        // Measure text and truncate if needed
        const metrics = this.ctx.measureText(option.desc);
        let descText = option.desc;
        if (metrics.width > maxDescWidth) {
          // Truncate text to fit
          let truncated = option.desc;
          while (
            this.ctx.measureText(truncated + "...").width > maxDescWidth &&
            truncated.length > 0
          ) {
            truncated = truncated.slice(0, -1);
          }
          descText = truncated + "...";
        }

        this.ctx.fillText(descText, descX, y + 18);
      });

      // Current upgrade counts
      this.ctx.textAlign = "center"; // Reset to center for centered text
      this.ctx.fillStyle = COLORS.TEXT_DARK_GRAY;
      this.ctx.font = `${this.getFontSize(14)} sans-serif`;
      const upgradeCountsY = optionStartY + 4 * optionSpacing + 20;
      const upgradeText = `Upgrades: H(${this.upgrades.health}) S(${this.upgrades.stamina}) PB(${this.upgrades.perfectBlock}) AD(${this.upgrades.attackDamage})`;
      this.ctx.fillText(upgradeText, centerX, upgradeCountsY);

      // Enemy difficulty multiplier
      const nextMultiplier = this.getEnemyMultiplier(
        this.upgrades.newGamePlusLevel + 1
      );
      this.ctx.fillStyle = "#FF6B6B";
      this.ctx.font = `bold ${this.getFontSize(18)} sans-serif`;
      const difficultyY = Math.min(
        upgradeCountsY + 20,
        this.displayHeight - 15
      );
      this.ctx.fillText(
        `Enemy Difficulty: x${nextMultiplier.toFixed(1)}`,
        centerX,
        difficultyY
      );
    } else {
      // Desktop layout - ensure everything fits within canvas bounds
      const totalContentHeight = 550; // Approximate total height needed
      const topPadding = 30;
      const bottomPadding = 30;
      const availableHeight = this.displayHeight - topPadding - bottomPadding;
      const startY = topPadding + (availableHeight - totalContentHeight) / 2;

      // NG+ level display (moved lower to give "YOU WIN" text room)
      const ngPlusY = Math.max(140, startY + 80);
      this.drawTextWithStroke(
        `New Game+ ${this.upgrades.newGamePlusLevel + 1}`,
        centerX,
        ngPlusY,
        COLORS.TEXT_LIGHT_BLUE,
        32
      );

      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = `${this.getFontSize(24)} sans-serif`;
      this.ctx.textAlign = "center";
      const instructionsY = ngPlusY + 40;
      this.ctx.fillText("Click an upgrade:", centerX, instructionsY);

      const currentAttackDamage = this.getPlayerDamage();
      const options = [
        {
          name: "Health",
          desc: `+${GAME_CONSTANTS.UPGRADE_INCREMENT} Max Health (Current: ${this.player.maxHealth})`,
          type: "health" as const,
        },
        {
          name: "Stamina",
          desc: `+${GAME_CONSTANTS.UPGRADE_INCREMENT} Max Stamina (Current: ${this.player.maxStamina})`,
          type: "stamina" as const,
        },
        {
          name: "Perfect Block",
          desc: `-${
            GAME_CONSTANTS.PERFECT_BLOCK.UPGRADE_REDUCTION
          }ms Perfect Block Duration (Current: ${Math.round(
            this.perfectBlock.duration
          )}ms)`,
          type: "perfectBlock" as const,
        },
        {
          name: "Attack Damage",
          desc: `+${GAME_CONSTANTS.DAMAGE.UPGRADE_INCREMENT} Attack Damage (Current: ${currentAttackDamage})`,
          type: "attackDamage" as const,
        },
      ];

      const optionStartY = instructionsY + 40;
      const optionSpacing = 70;
      const optionWidth = 600;
      const optionLeft = centerX - 300;
      const optionRight = optionLeft + optionWidth;

      // Set text alignment to left for option text
      this.ctx.textAlign = "left";

      options.forEach((option, index) => {
        const y = optionStartY + index * optionSpacing;
        const isSelected = this.upgrades.selected === option.type;

        const isTouched =
          this.upgradeMenuTouchY !== null &&
          this.upgradeMenuTouchY >= y - 35 &&
          this.upgradeMenuTouchY <= y + 25;

        if (isSelected || isTouched) {
          this.ctx.fillStyle = isTouched
            ? "rgba(139, 184, 232, 0.5)"
            : "rgba(139, 184, 232, 0.3)";
          this.ctx.fillRect(optionLeft, y - 30, optionWidth, 50);
        }

        // Option name
        this.ctx.fillStyle = isSelected ? "#8BB8E8" : "#ffffff";
        this.ctx.font = `bold ${this.getFontSize(24)} sans-serif`;
        this.ctx.fillText(option.name, optionLeft + 20, y);

        // Description
        this.ctx.fillStyle = "#cccccc";
        this.ctx.font = `${this.getFontSize(18)} sans-serif`;
        this.ctx.fillText(option.desc, centerX + 50, y);
      });

      // Current upgrade counts
      this.ctx.textAlign = "center"; // Reset to center for centered text
      this.ctx.fillStyle = COLORS.TEXT_DARK_GRAY;
      this.ctx.font = `${this.getFontSize(16)} sans-serif`;
      const upgradeCountsY = optionStartY + 4 * optionSpacing + 30;
      const upgradeText = `Upgrades: Health (${this.upgrades.health}) | Stamina (${this.upgrades.stamina}) | Perfect Block (${this.upgrades.perfectBlock}) | Attack Damage (${this.upgrades.attackDamage})`;
      this.ctx.fillText(upgradeText, centerX, upgradeCountsY);

      // Enemy difficulty multiplier
      const nextMultiplier = this.getEnemyMultiplier(
        this.upgrades.newGamePlusLevel + 1
      );
      this.ctx.fillStyle = "#FF6B6B";
      this.ctx.font = `bold ${this.getFontSize(20)} sans-serif`;
      const difficultyY = Math.min(
        upgradeCountsY + 30,
        this.displayHeight - 20
      );
      this.ctx.fillText(
        `Enemy Difficulty: x${nextMultiplier.toFixed(1)}`,
        centerX,
        difficultyY
      );
    }
  }

  private drawUpgradesShop(): void {
    // Black background
    this.ctx.fillStyle = COLORS.BLACK;
    this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);

    const centerX = this.displayWidth / 2;
    let currentY = this.isMobile() ? 30 : 40;

    // Title
    this.drawTextWithStroke(
      "Upgrades Shop",
      centerX,
      currentY,
      COLORS.GOLD,
      this.getMobileValue(36, 44)
    );
    currentY += this.isMobile() ? 40 : 50;

    // Gold display
    this.ctx.fillStyle = COLORS.GOLD;
    this.ctx.font = `bold ${this.getFontSize(
      this.isMobile() ? 24 : 28
    )} sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `Gold: ${this.upgrades.gold.toLocaleString()}`,
      centerX,
      currentY
    );
    currentY += this.isMobile() ? 40 : 50;

    // Upgrade options
    const upgrades: Array<{
      type: PermanentUpgradeType;
      name: string;
      desc: string;
      baseCost: number;
      getCurrentLevel: () => number;
    }> = [
      {
        type: "health",
        name: "Max Health",
        desc: `+${GAME_CONSTANTS.UPGRADE_INCREMENT} Max Health`,
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.HEALTH,
        getCurrentLevel: () => this.upgrades.health,
      },
      {
        type: "stamina",
        name: "Max Stamina",
        desc: `+${GAME_CONSTANTS.UPGRADE_INCREMENT} Max Stamina`,
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.STAMINA,
        getCurrentLevel: () => this.upgrades.stamina,
      },
      {
        type: "perfectBlock",
        name: "Perfect Block Duration",
        desc: `-${GAME_CONSTANTS.PERFECT_BLOCK.UPGRADE_REDUCTION}ms Duration`,
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.PERFECT_BLOCK,
        getCurrentLevel: () => this.upgrades.perfectBlock,
      },
      {
        type: "attackDamage",
        name: "Attack Damage",
        desc: `+${GAME_CONSTANTS.DAMAGE.UPGRADE_INCREMENT} Damage`,
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.ATTACK_DAMAGE,
        getCurrentLevel: () => this.upgrades.attackDamage,
      },
      {
        type: "staminaRegen",
        name: "Stamina Regeneration",
        desc: `+5 Stamina/sec`,
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.STAMINA_REGEN,
        getCurrentLevel: () => this.upgrades.staminaRegen,
      },
      {
        type: "attackSpeed",
        name: "Attack Speed",
        desc: `-10% Attack Cooldown`,
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.ATTACK_SPEED,
        getCurrentLevel: () => this.upgrades.attackSpeed,
      },
      {
        type: "blockEfficiency",
        name: "Block Efficiency",
        desc: `+5% Damage Reduction`,
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.BLOCK_EFFICIENCY,
        getCurrentLevel: () => this.upgrades.blockEfficiency,
      },
      {
        type: "perfectBlockWindow",
        name: "Perfect Block Window",
        desc: `+2% Window Size`,
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.PERFECT_BLOCK_WINDOW,
        getCurrentLevel: () => this.upgrades.perfectBlockWindow,
      },
      {
        type: "goldFind",
        name: "Gold Find",
        desc: `+10% Gold Earned`,
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.GOLD_FIND,
        getCurrentLevel: () => this.upgrades.goldFind,
      },
      {
        type: "startingHealth",
        name: "Starting Health",
        desc: `+10 Starting Health`,
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.STARTING_HEALTH,
        getCurrentLevel: () => this.upgrades.startingHealth,
      },
    ];

    const optionSpacing = this.isMobile() ? 35 : 40;
    const optionStartY = currentY;
    const maxVisible = this.isMobile() ? 8 : 10;
    const maxScroll = Math.max(0, upgrades.length - maxVisible);
    const scrollOffset = Math.min(this.upgradesShopScrollOffset, maxScroll);

    upgrades
      .slice(scrollOffset, scrollOffset + maxVisible)
      .forEach((upgrade, index) => {
        const y = optionStartY + index * optionSpacing;
        const currentLevel = upgrade.getCurrentLevel();
        const cost = upgrade.baseCost * (currentLevel + 1);
        const canAfford = this.upgrades.gold >= cost;

        // Highlight affordable upgrades
        this.ctx.fillStyle = canAfford ? "#2a2a2a" : "#1a1a1a";
        const optionWidth = this.displayWidth - (this.isMobile() ? 40 : 80);
        const optionX = (this.displayWidth - optionWidth) / 2;
        this.ctx.fillRect(optionX, y - 15, optionWidth, optionSpacing - 5);

        // Upgrade name and level
        this.ctx.fillStyle = canAfford
          ? COLORS.TEXT_LIGHT_BLUE
          : COLORS.TEXT_DARK_GRAY;
        this.ctx.font = `bold ${this.getFontSize(
          this.isMobile() ? 14 : 16
        )} sans-serif`;
        this.ctx.textAlign = "left";
        this.ctx.fillText(
          `${upgrade.name} (Lv ${currentLevel})`,
          optionX + 10,
          y
        );

        // Description
        this.ctx.fillStyle = "#cccccc";
        this.ctx.font = `${this.getFontSize(
          this.isMobile() ? 12 : 14
        )} sans-serif`;
        this.ctx.fillText(
          upgrade.desc,
          optionX + 10,
          y + (this.isMobile() ? 15 : 18)
        );

        // Cost
        this.ctx.fillStyle = canAfford ? COLORS.GOLD : "#666666";
        this.ctx.font = `bold ${this.getFontSize(
          this.isMobile() ? 14 : 16
        )} sans-serif`;
        this.ctx.textAlign = "right";
        this.ctx.fillText(
          `${cost.toLocaleString()} Gold`,
          optionX + optionWidth - 10,
          y + (this.isMobile() ? 8 : 10)
        );
      });

    // Draw scroll indicator if there are more upgrades to scroll
    if (maxScroll > 0) {
      const scrollBarWidth = 8;
      const scrollBarX = this.displayWidth - 20;
      const scrollBarY = currentY + 20;
      const scrollBarTrackHeight = maxVisible * optionSpacing - 20;

      // Scroll track
      this.ctx.fillStyle = "#333333";
      this.ctx.fillRect(
        scrollBarX,
        scrollBarY,
        scrollBarWidth,
        scrollBarTrackHeight
      );

      // Scroll thumb
      const thumbHeight = (scrollBarTrackHeight * maxVisible) / upgrades.length;
      const thumbY =
        scrollBarY +
        (scrollBarTrackHeight - thumbHeight) *
          (this.upgradesShopScrollOffset / maxScroll);
      this.ctx.fillStyle = "#888888";
      this.ctx.fillRect(scrollBarX, thumbY, scrollBarWidth, thumbHeight);
    }

    // Back button
    const buttonWidth = this.getMobileValue(120, 150);
    const buttonHeight = this.getMobileValue(44, 50);
    const buttonY = this.displayHeight - (this.isMobile() ? 80 : 100);
    const buttonX = centerX - buttonWidth / 2;
    this.drawButton(
      buttonX,
      buttonY,
      buttonWidth,
      buttonHeight,
      "Back",
      this.buttonPressState.back
    );
  }

  private handleUpgradesShopClick(x: number, y: number): boolean {
    // Don't handle clicks if already fading out
    if (this.fadeOutStartTime > 0) {
      return false;
    }

    const centerX = this.displayWidth / 2;
    const buttonWidth = this.getMobileValue(120, 150);
    const buttonHeight = this.getMobileValue(44, 50);
    const buttonY = this.displayHeight - (this.isMobile() ? 80 : 100);
    const buttonX = centerX - buttonWidth / 2;

    // Check back button first (before checking upgrades)
    if (
      this.isPointInRectButton(
        x,
        y,
        buttonX,
        buttonY,
        buttonWidth,
        buttonHeight
      )
    ) {
      // Play button click sound
      this.audioManager.playSound("button-click.mp3");
      // Start fade-out, then transition back to intro
      this.startFadeOut("intro");
      return true;
    }

    let currentY = this.isMobile() ? 30 : 40;

    // Title and gold display height
    currentY += this.isMobile() ? 80 : 100;

    const upgrades: Array<{
      type: PermanentUpgradeType;
      baseCost: number;
      getCurrentLevel: () => number;
    }> = [
      {
        type: "health",
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.HEALTH,
        getCurrentLevel: () => this.upgrades.health,
      },
      {
        type: "stamina",
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.STAMINA,
        getCurrentLevel: () => this.upgrades.stamina,
      },
      {
        type: "perfectBlock",
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.PERFECT_BLOCK,
        getCurrentLevel: () => this.upgrades.perfectBlock,
      },
      {
        type: "attackDamage",
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.ATTACK_DAMAGE,
        getCurrentLevel: () => this.upgrades.attackDamage,
      },
      {
        type: "staminaRegen",
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.STAMINA_REGEN,
        getCurrentLevel: () => this.upgrades.staminaRegen,
      },
      {
        type: "attackSpeed",
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.ATTACK_SPEED,
        getCurrentLevel: () => this.upgrades.attackSpeed,
      },
      {
        type: "blockEfficiency",
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.BLOCK_EFFICIENCY,
        getCurrentLevel: () => this.upgrades.blockEfficiency,
      },
      {
        type: "perfectBlockWindow",
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.PERFECT_BLOCK_WINDOW,
        getCurrentLevel: () => this.upgrades.perfectBlockWindow,
      },
      {
        type: "goldFind",
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.GOLD_FIND,
        getCurrentLevel: () => this.upgrades.goldFind,
      },
      {
        type: "startingHealth",
        baseCost: GAME_CONSTANTS.UPGRADE_COSTS.STARTING_HEALTH,
        getCurrentLevel: () => this.upgrades.startingHealth,
      },
    ];

    const optionSpacing = this.isMobile() ? 35 : 40;
    const optionStartY = currentY;
    const maxVisible = this.isMobile() ? 8 : 10;
    const maxScroll = Math.max(0, upgrades.length - maxVisible);
    const scrollOffset = Math.min(this.upgradesShopScrollOffset, maxScroll);
    const optionWidth = this.displayWidth - (this.isMobile() ? 40 : 80);
    const optionX = (this.displayWidth - optionWidth) / 2;

    // Check if clicked on an upgrade option (accounting for scroll)
    const visibleUpgrades = upgrades.slice(
      scrollOffset,
      scrollOffset + maxVisible
    );
    for (let i = 0; i < visibleUpgrades.length; i++) {
      const upgrade = visibleUpgrades[i];
      const optionY = optionStartY + i * optionSpacing;
      // Make sure click is within the specific upgrade option bounds
      const isUpgradeClick =
        x >= optionX &&
        x <= optionX + optionWidth &&
        y >= optionY - 15 &&
        y <= optionY + optionSpacing - 20;

      if (isUpgradeClick) {
        const currentLevel = upgrade.getCurrentLevel();
        const cost = upgrade.baseCost * (currentLevel + 1);
        if (this.upgrades.gold >= cost) {
          this.purchaseUpgrade(upgrade.type);
          this.audioManager.playSound("button-click.mp3");
        }
        break;
      }
    }

    return false;
  }

  private purchaseUpgrade(upgradeType: PermanentUpgradeType): void {
    let baseCost: number;
    let currentLevel: number;

    switch (upgradeType) {
      case "health":
        baseCost = GAME_CONSTANTS.UPGRADE_COSTS.HEALTH;
        currentLevel = this.upgrades.health;
        break;
      case "stamina":
        baseCost = GAME_CONSTANTS.UPGRADE_COSTS.STAMINA;
        currentLevel = this.upgrades.stamina;
        break;
      case "perfectBlock":
        baseCost = GAME_CONSTANTS.UPGRADE_COSTS.PERFECT_BLOCK;
        currentLevel = this.upgrades.perfectBlock;
        break;
      case "attackDamage":
        baseCost = GAME_CONSTANTS.UPGRADE_COSTS.ATTACK_DAMAGE;
        currentLevel = this.upgrades.attackDamage;
        break;
      case "staminaRegen":
        baseCost = GAME_CONSTANTS.UPGRADE_COSTS.STAMINA_REGEN;
        currentLevel = this.upgrades.staminaRegen;
        break;
      case "attackSpeed":
        baseCost = GAME_CONSTANTS.UPGRADE_COSTS.ATTACK_SPEED;
        currentLevel = this.upgrades.attackSpeed;
        break;
      case "blockEfficiency":
        baseCost = GAME_CONSTANTS.UPGRADE_COSTS.BLOCK_EFFICIENCY;
        currentLevel = this.upgrades.blockEfficiency;
        break;
      case "perfectBlockWindow":
        baseCost = GAME_CONSTANTS.UPGRADE_COSTS.PERFECT_BLOCK_WINDOW;
        currentLevel = this.upgrades.perfectBlockWindow;
        break;
      case "goldFind":
        baseCost = GAME_CONSTANTS.UPGRADE_COSTS.GOLD_FIND;
        currentLevel = this.upgrades.goldFind;
        break;
      case "startingHealth":
        baseCost = GAME_CONSTANTS.UPGRADE_COSTS.STARTING_HEALTH;
        currentLevel = this.upgrades.startingHealth;
        break;
    }

    const cost = baseCost * (currentLevel + 1);
    if (this.upgrades.gold >= cost) {
      this.upgrades.gold -= cost;
      this.applyPermanentUpgrade(upgradeType);
      this.saveGameData();
    }
  }

  private applyPermanentUpgrade(upgradeType: PermanentUpgradeType): void {
    switch (upgradeType) {
      case "health":
        this.upgrades.health++;
        break;
      case "stamina":
        this.upgrades.stamina++;
        break;
      case "perfectBlock":
        this.upgrades.perfectBlock++;
        break;
      case "attackDamage":
        this.upgrades.attackDamage++;
        break;
      case "staminaRegen":
        this.upgrades.staminaRegen++;
        break;
      case "attackSpeed":
        this.upgrades.attackSpeed++;
        break;
      case "blockEfficiency":
        this.upgrades.blockEfficiency++;
        break;
      case "perfectBlockWindow":
        this.upgrades.perfectBlockWindow++;
        break;
      case "goldFind":
        this.upgrades.goldFind++;
        break;
      case "startingHealth":
        this.upgrades.startingHealth++;
        break;
    }
    // Reapply all upgrades to update stats
    this.applyAllPermanentUpgrades();
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
      const pulse = Math.sin(this.cachedCurrentTime / 300) * 0.2 + 0.8;
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
    const height = UI_CONSTANTS.HEALTH_BAR.STAMINA_HEIGHT;
    const percentage = this.player.stamina / this.player.maxStamina;
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
      const pulse = Math.sin(this.cachedCurrentTime / 200) * 0.3 + 0.7;
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
    this.ctx.fillStyle = COLORS.TEXT_WHITE;
    this.ctx.font = `bold ${this.getFontSize(12)} sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `${Math.ceil(this.player.stamina)}/${this.player.maxStamina}`,
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

    // Select the appropriate sprite based on animation state
    let spriteImage: HTMLImageElement | null = null;
    switch (animationState) {
      case "idle":
        spriteImage = this.playerIdleImage;
        break;
      case "attack":
        spriteImage = this.playerAttackImage;
        break;
      case "block":
        spriteImage = this.playerBlockImage;
        break;
      case "hit":
        spriteImage = this.playerHitImage;
        break;
    }

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
        const idleScale = 1 + Math.sin(this.cachedCurrentTime / 1000) * 0.02;
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

    // Draw sprite if available, otherwise fall back to rectangle drawing
    if (spriteImage) {
      const spriteX = x - width / 2;
      const spriteY = y - height / 2;

      if (isEnemy) {
        // For enemies, apply color filter only to non-transparent pixels
        const enemyColorRgb = this.hexToRgb(color);

        // Use an offscreen canvas to properly apply tint
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext("2d", {
          willReadFrequently: false,
        });

        if (tempCtx) {
          // Draw sprite to temp canvas
          tempCtx.drawImage(spriteImage, 0, 0, width, height);

          // Get image data to work with pixels directly
          const imageData = tempCtx.getImageData(0, 0, width, height);
          const data = imageData.data;

          // Apply color tint to non-transparent pixels only
          for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];
            if (alpha > 0) {
              // Blend enemy color with existing pixel color
              // Use a weighted average for tinting
              const blendFactor = 0.5;
              data[i] = Math.min(
                255,
                data[i] * (1 - blendFactor) + enemyColorRgb.r * blendFactor
              );
              data[i + 1] = Math.min(
                255,
                data[i + 1] * (1 - blendFactor) + enemyColorRgb.g * blendFactor
              );
              data[i + 2] = Math.min(
                255,
                data[i + 2] * (1 - blendFactor) + enemyColorRgb.b * blendFactor
              );
            }
          }

          // Put the modified image data back
          tempCtx.putImageData(imageData, 0, 0);

          // Draw the tinted sprite to main canvas
          this.ctx.drawImage(tempCanvas, spriteX, spriteY);
        } else {
          // Fallback if temp canvas fails
          this.ctx.drawImage(spriteImage, spriteX, spriteY, width, height);
        }
      } else {
        // Draw sprite normally for player
        this.ctx.drawImage(spriteImage, spriteX, spriteY, width, height);
      }

      // Animation-specific visual effects as overlays (masked to sprite shape)
      if (animationState === "block") {
        // Shield effect - masked to sprite shape, positioned based on enemy/player
        const effectCanvas = document.createElement("canvas");
        effectCanvas.width = width;
        effectCanvas.height = height;
        const effectCtx = effectCanvas.getContext("2d");
        if (effectCtx) {
          // Draw shield effect
          effectCtx.fillStyle = "rgba(255, 255, 255, 0.3)";
          const shieldX = isEnemy ? width / 2 - 5 : -width / 2 - 5;
          effectCtx.fillRect(shieldX, 0, 10, height);
          // Use destination-in to mask effect to sprite's alpha channel
          effectCtx.globalCompositeOperation = "destination-in";
          effectCtx.drawImage(spriteImage, 0, 0, width, height);
          // Draw the masked effect to main canvas with screen blend
          this.ctx.globalCompositeOperation = "screen";
          this.ctx.drawImage(effectCanvas, spriteX, spriteY);
          this.ctx.globalCompositeOperation = "source-over";
        }
      } else if (animationState === "hit") {
        // Flash effect - masked to sprite (like perfect block stun effect)
        const flashAlpha = Math.sin(this.cachedCurrentTime / 50) * 0.5 + 0.5;
        const effectCanvas = document.createElement("canvas");
        effectCanvas.width = width;
        effectCanvas.height = height;
        const effectCtx = effectCanvas.getContext("2d");
        if (effectCtx) {
          // Draw white flash effect
          effectCtx.fillStyle = `rgba(255, 255, 255, ${flashAlpha * 0.5})`;
          effectCtx.fillRect(0, 0, width, height);
          // Use destination-in to mask effect to sprite's alpha channel
          effectCtx.globalCompositeOperation = "destination-in";
          effectCtx.drawImage(spriteImage, 0, 0, width, height);
          // Draw the masked effect to main canvas with screen blend
          this.ctx.globalCompositeOperation = "screen";
          this.ctx.drawImage(effectCanvas, spriteX, spriteY);
          this.ctx.globalCompositeOperation = "source-over";
        }
      }
    } else {
      // Fallback to original rectangle drawing if sprites aren't loaded
      // Character body
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x - width / 2, y - height / 2, width, height);

      // Character outline
      this.ctx.strokeStyle = "#ffffff";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(x - width / 2, y - height / 2, width, height);

      // Animation-specific visual effects
      if (animationState === "block") {
        // Shield effect - position based on enemy/player
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        const shieldX = isEnemy ? x + width / 2 - 5 : x - width / 2 - 5;
        this.ctx.fillRect(shieldX, y - height / 2, 10, height);
      } else if (animationState === "hit") {
        // Flash effect
        const flashAlpha = Math.sin(this.cachedCurrentTime / 50) * 0.5 + 0.5;
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
      const config = this.cachedLevelConfig!;
      const enemyColorRgb = this.hexToRgb(config.enemyColor);
      this.ctx.fillStyle = `rgba(${enemyColorRgb.r}, ${enemyColorRgb.g}, ${enemyColorRgb.b}, ${alpha})`;
    }
    this.ctx.fillRect(x - size / 2, y - size / 2, size, size);
  }

  private drawDamageNumbers(): void {
    this.ui.damageNumbers.forEach((num) => {
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
        const config = this.cachedLevelConfig!;
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

  private drawDeathScreen(): void {
    const explosionDuration = GAME_CONSTANTS.DEATH_SCREEN.EXPLOSION_DURATION;
    const fadeInDuration = GAME_CONSTANTS.DEATH_SCREEN.FADE_IN_DURATION;
    const holdDuration = GAME_CONSTANTS.DEATH_SCREEN.HOLD_DURATION;
    const moveUpDuration = GAME_CONSTANTS.DEATH_SCREEN.FADE_OUT_DURATION;

    // During explosion phase, only show particles (no overlay or text)
    if (this.deathScreenTimer < explosionDuration) {
      // Draw a subtle darkening overlay that gradually increases
      const explosionProgress = this.deathScreenTimer / explosionDuration;
      const overlayAlpha = explosionProgress * 0.3; // Subtle darkening during explosion
      this.ctx.fillStyle = `rgba(0, 0, 0, ${overlayAlpha})`;
      this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);
      return; // Don't show "YOU DIED" text during explosion
    }

    // After explosion, show the "YOU DIED" screen
    const textTimer = this.deathScreenTimer - explosionDuration;
    let overlayAlpha = 0;
    let textY = this.displayHeight / 2;
    let nextScreenAlpha = 0;
    const endY = 60; // Top of screen

    if (textTimer < fadeInDuration) {
      // Fade in phase - overlay fades in, text stays at center
      overlayAlpha = textTimer / fadeInDuration;
      textY = this.displayHeight / 2;
      nextScreenAlpha = 0;
    } else if (textTimer < fadeInDuration + holdDuration) {
      // Hold phase - overlay stays at full opacity, text stays at center
      overlayAlpha = 1;
      textY = this.displayHeight / 2;
      nextScreenAlpha = 0;
    } else {
      // Move up phase - text moves upward, next screen fades in below
      overlayAlpha = 1;
      const moveUpProgress = Math.min(
        1,
        (textTimer - fadeInDuration - holdDuration) / moveUpDuration
      );
      const startY = this.displayHeight / 2;
      // Ensure text reaches exactly endY when moveUpProgress = 1
      textY = startY - (startY - endY) * moveUpProgress;
      // Fade in next screen as text moves up (start fading when text is halfway up)
      nextScreenAlpha = Math.min(1, Math.max(0, (moveUpProgress - 0.3) / 0.7));
    }

    // Draw dark overlay (stays visible after fade-in) - fully opaque
    this.ctx.fillStyle = `rgba(0, 0, 0, ${overlayAlpha})`;
    this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);

    // Draw next screen below if transitioning (with fade in)
    if (nextScreenAlpha > 0) {
      this.ctx.save();
      this.ctx.globalAlpha = nextScreenAlpha;
      const config = this.cachedLevelConfig!;
      this.drawGameOver(
        `Defeated by ${config.enemyName}!`,
        config.enemyColor,
        false
      );
      this.ctx.restore();
    }

    // Draw "YOU DIED" text in red (moves up, stays visible)
    this.ctx.save();
    this.ctx.fillStyle = `rgba(220, 20, 60, 1)`; // Crimson red, always fully opaque
    this.ctx.font = `bold ${this.getFontSize(64)} serif`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    // Add text shadow for better visibility
    this.ctx.shadowColor = `rgba(0, 0, 0, 0.8)`;
    this.ctx.shadowBlur = 20;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;

    this.ctx.fillText("YOU DIED", this.displayWidth / 2, textY);

    this.ctx.restore();
  }

  private drawEnemyVanquishedScreen(): void {
    const fadeInDuration =
      GAME_CONSTANTS.ENEMY_VANQUISHED_SCREEN.FADE_IN_DURATION;
    const holdDuration = GAME_CONSTANTS.ENEMY_VANQUISHED_SCREEN.HOLD_DURATION;
    const moveUpDuration =
      GAME_CONSTANTS.ENEMY_VANQUISHED_SCREEN.FADE_OUT_DURATION;

    const textTimer = this.enemyVanquishedTimer;
    let overlayAlpha = 0;
    let textY = this.displayHeight / 2;
    let nextScreenAlpha = 0;
    const endY = 60; // Top of screen

    if (textTimer < fadeInDuration) {
      // Fade in phase - overlay fades in, text stays at center
      overlayAlpha = textTimer / fadeInDuration;
      textY = this.displayHeight / 2;
      nextScreenAlpha = 0;
    } else if (textTimer < fadeInDuration + holdDuration) {
      // Hold phase - overlay stays at full opacity, text stays at center
      overlayAlpha = 1;
      textY = this.displayHeight / 2;
      nextScreenAlpha = 0;
    } else {
      // Move up phase - text moves upward, next screen fades in below
      overlayAlpha = 1;
      const moveUpProgress =
        (textTimer - fadeInDuration - holdDuration) / moveUpDuration;
      const startY = this.displayHeight / 2;
      textY = startY - (startY - endY) * moveUpProgress;
      // Fade in next screen as text moves up (start fading when text is halfway up)
      nextScreenAlpha = Math.min(1, Math.max(0, (moveUpProgress - 0.3) / 0.7));
    }

    // Draw dark overlay (stays visible after fade-in) - fully opaque
    this.ctx.fillStyle = `rgba(0, 0, 0, ${overlayAlpha})`;
    this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);

    // Draw next screen below if transitioning (with fade in)
    if (nextScreenAlpha > 0) {
      this.ctx.save();
      this.ctx.globalAlpha = nextScreenAlpha;
      this.drawLevelComplete(false);
      this.ctx.restore();
    }

    // Draw "ENEMY VANQUISHED" text in yellow (moves up, stays visible)
    this.ctx.save();
    this.ctx.fillStyle = `rgba(255, 215, 0, 1)`; // Gold yellow, always fully opaque

    // Calculate font size that fits within canvas width
    const text = "ENEMY VANQUISHED";
    const maxWidth = this.displayWidth - 40; // 20px padding on each side
    let baseFontSize = this.isMobile() ? 48 : 64; // Smaller base size for mobile
    let fontSize = parseFloat(this.getFontSize(baseFontSize));

    // Measure text and adjust font size if needed
    this.ctx.font = `bold ${fontSize}px serif`;
    let textWidth = this.ctx.measureText(text).width;

    if (textWidth > maxWidth) {
      fontSize = (fontSize * maxWidth) / textWidth;
      this.ctx.font = `bold ${fontSize}px serif`;
    }

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    // Add text shadow for better visibility
    this.ctx.shadowColor = `rgba(0, 0, 0, 0.8)`;
    this.ctx.shadowBlur = 20;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;

    this.ctx.fillText(text, this.displayWidth / 2, textY);

    // Draw gold earned below the "ENEMY VANQUISHED" text
    if (this.lastGoldEarned > 0) {
      this.ctx.save();
      this.ctx.fillStyle = `rgba(255, 215, 0, 1)`; // Gold yellow
      const goldFontSize = this.isMobile() ? 24 : 32;
      this.ctx.font = `bold ${this.getFontSize(goldFontSize)} serif`;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.shadowColor = `rgba(0, 0, 0, 0.8)`;
      this.ctx.shadowBlur = 15;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
      const goldY = textY + (this.isMobile() ? 50 : 70);
      this.ctx.fillText(
        `Gold Earned: +${this.lastGoldEarned}`,
        this.displayWidth / 2,
        goldY
      );
      this.ctx.restore();
    }

    this.ctx.restore();
  }

  private drawLevel5VictoryScreen(): void {
    const fadeInDuration =
      GAME_CONSTANTS.LEVEL5_VICTORY_SCREEN.FADE_IN_DURATION;
    const holdDuration = GAME_CONSTANTS.LEVEL5_VICTORY_SCREEN.HOLD_DURATION;
    const moveUpDuration =
      GAME_CONSTANTS.LEVEL5_VICTORY_SCREEN.FADE_OUT_DURATION;

    const textTimer = this.level5VictoryTimer;
    let overlayAlpha = 0;
    let textY = this.displayHeight / 2;
    let nextScreenAlpha = 0;
    const endY = 60; // Top of screen

    if (textTimer < fadeInDuration) {
      // Fade in phase - overlay fades in, text stays at center
      overlayAlpha = textTimer / fadeInDuration;
      textY = this.displayHeight / 2;
      nextScreenAlpha = 0;
    } else if (textTimer < fadeInDuration + holdDuration) {
      // Hold phase - overlay stays at full opacity, text stays at center
      overlayAlpha = 1;
      textY = this.displayHeight / 2;
      nextScreenAlpha = 0;
    } else {
      // Move up phase - text moves upward, next screen fades in below
      overlayAlpha = 1;
      const moveUpProgress =
        (textTimer - fadeInDuration - holdDuration) / moveUpDuration;
      const startY = this.displayHeight / 2;
      textY = startY - (startY - endY) * moveUpProgress;
      // Fade in next screen as text moves up (start fading when text is halfway up)
      nextScreenAlpha = Math.min(1, Math.max(0, (moveUpProgress - 0.3) / 0.7));
    }

    // Draw dark overlay (stays visible after fade-in) - fully opaque
    this.ctx.fillStyle = `rgba(0, 0, 0, ${overlayAlpha})`;
    this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);

    // Draw next screen below if transitioning (with fade in)
    if (nextScreenAlpha > 0) {
      this.ctx.save();
      this.ctx.globalAlpha = nextScreenAlpha;
      this.drawUpgradeMenu(false);
      this.ctx.restore();
    }

    // Draw "YOU WIN" text in green (moves up, stays visible)
    this.ctx.save();
    this.ctx.fillStyle = `rgba(0, 255, 0, 1)`; // Bright green, always fully opaque
    this.ctx.font = `bold ${this.getFontSize(64)} serif`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    // Add text shadow for better visibility
    this.ctx.shadowColor = `rgba(0, 0, 0, 0.8)`;
    this.ctx.shadowBlur = 20;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;

    this.ctx.fillText("YOU WIN", this.displayWidth / 2, textY);

    // Draw gold earned below the "YOU WIN" text (from defeating level 5 enemy)
    if (this.lastGoldEarned > 0) {
      this.ctx.save();
      this.ctx.fillStyle = `rgba(255, 215, 0, 1)`; // Gold yellow
      const goldFontSize = this.isMobile() ? 24 : 32;
      this.ctx.font = `bold ${this.getFontSize(goldFontSize)} serif`;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.shadowColor = `rgba(0, 0, 0, 0.8)`;
      this.ctx.shadowBlur = 15;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
      const goldY = textY + (this.isMobile() ? 50 : 70);
      this.ctx.fillText(
        `Gold Earned: +${this.lastGoldEarned}`,
        this.displayWidth / 2,
        goldY
      );
      this.ctx.restore();
    }

    this.ctx.restore();
  }

  private drawGameOver(
    text: string,
    color: string,
    showTopText: boolean = true
  ): void {
    // Only draw background if not transitioning (when showTopText is false, we're transitioning)
    if (showTopText) {
      this.ctx.fillStyle = "rgba(0, 0, 0, 1)"; // Fully opaque background
      this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);
    }

    // Draw "YOU DIED" text at top (only if coming from death screen and not transitioning)
    if (showTopText && this.gameStatus === "enemyWon") {
      this.ctx.save();
      this.ctx.fillStyle = `rgba(220, 20, 60, 1)`; // Crimson red
      this.ctx.font = `bold ${this.getFontSize(64)} serif`;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.shadowColor = `rgba(0, 0, 0, 0.8)`;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
      this.ctx.fillText("YOU DIED", this.displayWidth / 2, 60);
      this.ctx.restore();
    }

    // Title (adjusted to account for "YOU DIED" text at top)
    this.ctx.fillStyle = color;
    // Use smaller font on mobile to prevent overflow
    const titleFontSize = this.isMobile() ? 32 : 48;
    this.ctx.font = `bold ${this.getFontSize(titleFontSize)} serif`;
    this.ctx.textAlign = "center";
    // Start title lower to avoid overlap with "YOU DIED" at 60px
    const topTextHeight = 100; // Space reserved for "YOU DIED" text
    const titleY = this.isMobile() ? topTextHeight + 60 : topTextHeight + 120;

    // On mobile, check if text fits and adjust font size if needed
    if (this.isMobile()) {
      this.ctx.font = `bold ${titleFontSize}px serif`;
      const textWidth = this.ctx.measureText(text).width;
      const maxWidth = this.displayWidth - 40; // 20px padding on each side
      if (textWidth > maxWidth) {
        const adjustedSize = (titleFontSize * maxWidth) / textWidth;
        this.ctx.font = `bold ${adjustedSize}px serif`;
      }
    }

    this.ctx.fillText(text, this.displayWidth / 2, titleY);

    // NG+ level display
    if (this.upgrades.newGamePlusLevel > 0) {
      this.ctx.fillStyle = COLORS.TEXT_LIGHT_BLUE;
      this.ctx.font = `bold ${this.getFontSize(28)} serif`;
      this.ctx.fillText(
        `New Game+ ${this.upgrades.newGamePlusLevel}`,
        this.displayWidth / 2,
        titleY + (this.isMobile() ? 35 : 50)
      );
    }

    // Score and Statistics - side by side on desktop, stacked on mobile
    const contentY = titleY + (this.isMobile() ? 50 : 100);
    let statsBottomY: number;

    if (this.isMobile()) {
      // Mobile: Stack vertically, center aligned
      this.ctx.textAlign = "center";

      // Final Score (centered)
      this.ctx.fillStyle = COLORS.GOLD;
      this.ctx.font = `bold ${this.getFontSize(20)} sans-serif`;
      this.ctx.fillText(
        `Final Score: ${this.score.value.toLocaleString()}`,
        this.displayWidth / 2,
        contentY
      );

      // Statistics (centered, below score)
      const statsY = contentY + 40;
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = `bold ${this.getFontSize(20)} sans-serif`;
      this.ctx.fillText("Statistics", this.displayWidth / 2, statsY);

      this.ctx.font = `${this.getFontSize(16)} sans-serif`;
      const stats = [
        `Damage Dealt: ${this.stats.totalDamageDealt}`,
        `Perfect Blocks: ${this.stats.perfectBlocks}`,
        `Attacks Blocked: ${this.stats.attacksBlocked}`,
        `Hits Taken: ${this.stats.hitsTaken}`,
        `Total Attacks: ${this.stats.totalAttacks}`,
      ];

      const statSpacing = 18;
      stats.forEach((stat, index) => {
        this.ctx.fillText(
          stat,
          this.displayWidth / 2,
          statsY + 30 + index * statSpacing
        );
      });

      // Calculate the bottom of stats for positioning restart hint
      statsBottomY = statsY + 30 + stats.length * statSpacing;
    } else {
      // Desktop: Side by side
      const columnSpacing = 200;
      const leftColumnX = this.displayWidth / 2 - columnSpacing;
      const rightColumnX = this.displayWidth / 2 + columnSpacing;

      // Final Score (left column)
      this.ctx.fillStyle = COLORS.GOLD;
      this.ctx.font = `bold ${this.getFontSize(24)} sans-serif`;
      this.ctx.textAlign = "left";
      this.ctx.fillText(
        `Final Score: ${this.score.value.toLocaleString()}`,
        leftColumnX,
        contentY
      );

      // Statistics (right column)
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = `bold ${this.getFontSize(24)} sans-serif`;
      this.ctx.textAlign = "left";
      this.ctx.fillText("Statistics", rightColumnX, contentY);

      this.ctx.font = `${this.getFontSize(18)} sans-serif`;
      const stats = [
        `Damage Dealt: ${this.stats.totalDamageDealt}`,
        `Perfect Blocks: ${this.stats.perfectBlocks}`,
        `Attacks Blocked: ${this.stats.attacksBlocked}`,
        `Hits Taken: ${this.stats.hitsTaken}`,
        `Total Attacks: ${this.stats.totalAttacks}`,
      ];

      const statSpacing = 25;
      stats.forEach((stat, index) => {
        this.ctx.fillText(
          stat,
          rightColumnX,
          contentY + 30 + index * statSpacing
        );
      });

      // Calculate the bottom of stats for positioning restart hint
      statsBottomY = contentY + 30 + stats.length * statSpacing;
    }

    // Upgrade summary (below score/stats)
    let upgradeBottomY = statsBottomY;
    if (
      this.upgrades.health > 0 ||
      this.upgrades.stamina > 0 ||
      this.upgrades.perfectBlock > 0 ||
      this.upgrades.attackDamage > 0
    ) {
      const upgradeLabelY = statsBottomY + (this.isMobile() ? 20 : 30);
      this.ctx.fillStyle = COLORS.SUCCESS;
      this.ctx.font = `bold ${this.getFontSize(
        this.isMobile() ? 18 : 20
      )} sans-serif`;
      this.ctx.textAlign = "center";
      this.ctx.fillText("Upgrades:", this.displayWidth / 2, upgradeLabelY);
      this.ctx.fillStyle = COLORS.TEXT_WHITE;
      this.ctx.font = `${this.getFontSize(
        this.isMobile() ? 16 : 18
      )} sans-serif`;
      const upgradeText = this.formatUpgradeText();
      this.ctx.fillText(
        upgradeText,
        this.displayWidth / 2,
        upgradeLabelY + (this.isMobile() ? 20 : 30)
      );
      upgradeBottomY = upgradeLabelY + (this.isMobile() ? 50 : 60);
    }

    // Restart hint or click to return text (below upgrades or stats, ensure it's visible)
    this.ctx.fillStyle = "#cccccc";
    this.ctx.font = `${this.getFontSize(this.isMobile() ? 18 : 20)} sans-serif`;
    this.ctx.textAlign = "center";
    const restartHintY = upgradeBottomY + (this.isMobile() ? 20 : 30);
    // Ensure restart hint is visible on screen
    const maxY = this.displayHeight - (this.isMobile() ? 100 : 120);
    const finalRestartY = Math.min(restartHintY, maxY);

    // Show "Click to return to title screen" if on death screen and waiting for input
    if (this.gameStatus === "deathScreen" && this.deathScreenWaitingForInput) {
      // Add pulsing effect for the click text
      const pulse = Math.sin(this.cachedCurrentTime / 500) * 0.3 + 0.7;
      this.ctx.save();
      this.ctx.globalAlpha = pulse;
      const clickText = this.isMobile()
        ? "Tap to return to title screen"
        : "Click to return to title screen";
      this.ctx.fillText(clickText, this.displayWidth / 2, finalRestartY);
      this.ctx.restore();
    } else {
      const restartText = this.isMobile()
        ? "Tap Restart button"
        : "Press R to restart";
      this.ctx.fillText(restartText, this.displayWidth / 2, finalRestartY);
    }
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
    if (
      this.player.stamina < UI_CONSTANTS.CONTROLS_HINT.LOW_STAMINA_THRESHOLD
    ) {
      this.ctx.fillStyle = COLORS.ERROR;
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

  // Helper method to check if point is within rectangular button
  private isPointInRectButton(
    x: number,
    y: number,
    buttonX: number,
    buttonY: number,
    buttonWidth: number,
    buttonHeight: number
  ): boolean {
    return (
      x >= buttonX &&
      x <= buttonX + buttonWidth &&
      y >= buttonY &&
      y <= buttonY + buttonHeight
    );
  }

  // Handle intro screen button clicks
  private handleIntroButtonClick(x: number, y: number): boolean {
    // Don't handle clicks if buttons haven't finished fading in or if already fading out
    if (
      this.logoFadeProgress < 1 ||
      this.buttonFadeProgress < 1 ||
      this.fadeOutStartTime > 0
    ) {
      return false;
    }

    const centerX = this.displayWidth / 2;
    const centerY = this.displayHeight / 2;
    const buttonWidth = this.getMobileValue(100, 130);
    const buttonHeight = this.getMobileValue(44, 50);
    const buttonSpacing = this.getMobileValue(15, 20);

    // Calculate logo bottom position (same as in drawIntro)
    let logoBottomY = centerY;
    if (this.logoImage) {
      const logoWidth = this.getMobileValue(200, 300);
      const logoHeight =
        (this.logoImage.height / this.logoImage.width) * logoWidth;
      const logoY = centerY - logoHeight / 2 - (this.isMobile() ? 60 : 80);
      logoBottomY = logoY + logoHeight;
    }

    const verticalSpacing = this.getMobileValue(50, 70);
    const buttonY = logoBottomY + verticalSpacing;

    // Center three buttons under the logo (same as in drawIntro)
    const totalWidth = 3 * buttonWidth + 2 * buttonSpacing;
    const startX = centerX - totalWidth / 2;
    const startButtonX = startX;
    const controlsButtonX = startX + buttonWidth + buttonSpacing;
    const upgradesButtonX = startX + 2 * (buttonWidth + buttonSpacing);

    if (
      this.isPointInRectButton(
        x,
        y,
        startButtonX,
        buttonY,
        buttonWidth,
        buttonHeight
      )
    ) {
      // Play button click sound
      this.audioManager.playSound("button-click.mp3");
      // Start fade-out, then transition to playing
      this.startFadeOut("playing");
      return true;
    }

    if (
      this.isPointInRectButton(
        x,
        y,
        controlsButtonX,
        buttonY,
        buttonWidth,
        buttonHeight
      )
    ) {
      // Play button click sound
      this.audioManager.playSound("button-click.mp3");
      // Start fade-out, then transition to controls
      this.startFadeOut("controls");
      return true;
    }

    if (
      this.isPointInRectButton(
        x,
        y,
        upgradesButtonX,
        buttonY,
        buttonWidth,
        buttonHeight
      )
    ) {
      // Play button click sound
      this.audioManager.playSound("button-click.mp3");
      // Start fade-out, then transition to upgrades shop
      this.startFadeOut("upgradesShop");
      return true;
    }

    return false;
  }

  private updateIntroButtonPressStates(x: number, y: number): void {
    if (
      this.logoFadeProgress < 1 ||
      this.buttonFadeProgress < 1 ||
      this.fadeOutStartTime > 0
    ) {
      this.buttonPressState.start = false;
      this.buttonPressState.controls = false;
      this.buttonPressState.upgrades = false;
      return;
    }

    const centerX = this.displayWidth / 2;
    const centerY = this.displayHeight / 2;
    const buttonWidth = this.getMobileValue(100, 130);
    const buttonHeight = this.getMobileValue(44, 50);
    const buttonSpacing = this.getMobileValue(15, 20);

    let logoBottomY = centerY;
    if (this.logoImage) {
      const logoWidth = this.getMobileValue(200, 300);
      const logoHeight =
        (this.logoImage.height / this.logoImage.width) * logoWidth;
      const logoY = centerY - logoHeight / 2 - (this.isMobile() ? 60 : 80);
      logoBottomY = logoY + logoHeight;
    }

    const verticalSpacing = this.getMobileValue(50, 70);
    const buttonY = logoBottomY + verticalSpacing;

    const totalWidth = 3 * buttonWidth + 2 * buttonSpacing;
    const startX = centerX - totalWidth / 2;
    const startButtonX = startX;
    const controlsButtonX = startX + buttonWidth + buttonSpacing;
    const upgradesButtonX = startX + 2 * (buttonWidth + buttonSpacing);

    this.buttonPressState.start = this.isPointInRectButton(
      x,
      y,
      startButtonX,
      buttonY,
      buttonWidth,
      buttonHeight
    );
    this.buttonPressState.controls = this.isPointInRectButton(
      x,
      y,
      controlsButtonX,
      buttonY,
      buttonWidth,
      buttonHeight
    );
    this.buttonPressState.upgrades = this.isPointInRectButton(
      x,
      y,
      upgradesButtonX,
      buttonY,
      buttonWidth,
      buttonHeight
    );
  }

  private updateUpgradesShopButtonPressState(x: number, y: number): void {
    const centerX = this.displayWidth / 2;
    const buttonWidth = this.getMobileValue(120, 150);
    const buttonHeight = this.getMobileValue(44, 50);
    const buttonY = this.displayHeight - (this.isMobile() ? 60 : 80);
    const buttonX = centerX - buttonWidth / 2;

    this.buttonPressState.back = this.isPointInRectButton(
      x,
      y,
      buttonX,
      buttonY,
      buttonWidth,
      buttonHeight
    );
  }

  // Start fade-out animation
  private startFadeOut(targetStatus: GameStatus): void {
    this.fadeOutStartTime = performance.now();
    this.fadeOutProgress = 0;
    this.pendingTransition = targetStatus;
  }

  // Handle controls screen button clicks
  private handleControlsButtonClick(x: number, y: number): boolean {
    // Don't handle clicks if already fading out
    if (this.fadeOutStartTime > 0) {
      return false;
    }

    const centerX = this.displayWidth / 2;
    const buttonWidth = this.getMobileValue(120, 150);
    const buttonHeight = this.getMobileValue(44, 50);
    const buttonY = this.displayHeight - (this.isMobile() ? 80 : 100);
    const buttonX = centerX - buttonWidth / 2;

    if (
      this.isPointInRectButton(
        x,
        y,
        buttonX,
        buttonY,
        buttonWidth,
        buttonHeight
      )
    ) {
      // Play button click sound
      this.audioManager.playSound("button-click.mp3");
      // Start fade-out, then transition back to intro
      this.startFadeOut("intro");
      return true;
    }

    return false;
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

  public start(): void {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    // Initialize logo fade if on intro screen
    if (this.gameStatus === "intro" && this.logoFadeStartTime === 0) {
      this.logoFadeStartTime = performance.now();
      this.logoFadeProgress = 0;
    }
    // Initialize fog if on intro screen
    if (this.gameStatus === "intro" && this.fogParticles.length === 0) {
      this.initializeFog();
    }
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
    this.resetGameState(true);
    this.gameStatus = "startScreen";
    this.keys.clear();
    this.activeTouches.clear();
    this.isAttackButtonPressed = false;
    this.isBlockButtonPressed = false;
    this.wasSpaceHeld = false;
    // Reset logo fade animation
    this.logoFadeProgress = 0;
    this.logoFadeStartTime = performance.now();
    // Reset button fade animation
    this.buttonFadeProgress = 0;
    this.buttonFadeStartTime = 0;
    // Reset fade-out state
    this.fadeOutProgress = 0;
    this.fadeOutStartTime = 0;
    this.pendingTransition = null;
    // Don't initialize level - return to title screen instead
    this.updateSpearPositions();
    this.start();
  }

  public handleTouchStart(e: TouchEvent): void {
    const rect = this.canvas.getBoundingClientRect();

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      // Handle start screen - any touch goes to intro
      if (this.gameStatus === "startScreen") {
        e.preventDefault();
        const oldStatus = this.gameStatus;
        this.gameStatus = "intro";
        this.handleGameStatusChange(oldStatus, this.gameStatus);
        continue;
      }

      // Handle intro screen buttons
      if (this.gameStatus === "intro") {
        e.preventDefault();
        if (this.handleIntroButtonClick(x, y)) {
          return;
        }
        continue;
      }

      // Handle controls screen back button
      if (this.gameStatus === "controls") {
        e.preventDefault();
        if (this.handleControlsButtonClick(x, y)) {
          return;
        }
        continue;
      }

      // Handle upgrades shop - back button and scroll tracking
      if (this.gameStatus === "upgradesShop") {
        e.preventDefault();
        const centerX = this.displayWidth / 2;
        const buttonWidth = this.getMobileValue(120, 150);
        const buttonHeight = this.getMobileValue(44, 50);
        const buttonY = this.displayHeight - (this.isMobile() ? 80 : 100);
        const buttonX = centerX - buttonWidth / 2;

        // Check if touch is on back button
        if (
          this.isPointInRectButton(
            x,
            y,
            buttonX,
            buttonY,
            buttonWidth,
            buttonHeight
          )
        ) {
          if (this.handleUpgradesShopClick(x, y)) {
            return;
          }
        } else {
          // Check if touch is in upgrade area - if so, handle click on touch end
          // Otherwise, track scroll start position
          let currentY = this.isMobile() ? 30 : 40;
          currentY += this.isMobile() ? 80 : 100; // Title and gold display height
          const optionSpacing = this.isMobile() ? 35 : 40;
          const optionStartY = currentY;
          const maxVisible = this.isMobile() ? 8 : 10;
          const upgradesCount = 10;
          const maxScroll = Math.max(0, upgradesCount - maxVisible);
          const scrollOffset = Math.min(
            this.upgradesShopScrollOffset,
            maxScroll
          );
          const optionWidth = this.displayWidth - (this.isMobile() ? 40 : 80);
          const optionX = (this.displayWidth - optionWidth) / 2;

          let isOnUpgrade = false;
          // Check if touch is in visible upgrade area
          const visibleUpgradesCount = Math.min(
            maxVisible,
            upgradesCount - scrollOffset
          );
          for (let i = 0; i < visibleUpgradesCount; i++) {
            const optionY = optionStartY + i * optionSpacing;
            if (
              x >= optionX &&
              x <= optionX + optionWidth &&
              y >= optionY - 15 &&
              y <= optionY + optionSpacing - 20
            ) {
              isOnUpgrade = true;
              break;
            }
          }

          // Only track scroll if not on upgrade area
          if (!isOnUpgrade) {
            this.upgradesShopScrollStartY = touch.clientY;
          }
        }
        continue;
      }

      // Handle death screen - touch to return to title screen
      if (
        this.gameStatus === "deathScreen" &&
        this.deathScreenWaitingForInput
      ) {
        e.preventDefault();
        const oldStatus = this.gameStatus;
        // Save game data before returning to intro
        this.saveGameData();
        // Return to intro screen so player can access upgrades menu
        this.gameStatus = "intro";
        this.deathScreenWaitingForInput = false;
        this.handleGameStatusChange(oldStatus, this.gameStatus);
        return;
      }

      // Handle level complete screen - any touch continues
      if (this.gameStatus === "levelComplete") {
        e.preventDefault();
        this.continueFromLevelComplete();
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
          const isNewPress = !this.perfectBlock.wasCtrlHeld;
          this.perfectBlock.wasCtrlHeld = true;
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
        const isNewPress = !this.perfectBlock.wasCtrlHeld;
        this.perfectBlock.wasCtrlHeld = true;
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

    // Handle upgrades shop - process clicks if scroll didn't happen
    if (this.gameStatus === "upgradesShop") {
      const rect = this.canvas.getBoundingClientRect();

      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        // If we were tracking scroll, check if it was actually a scroll or a click
        if (this.upgradesShopScrollStartY !== null) {
          const scrollDelta = Math.abs(
            this.upgradesShopScrollStartY - touch.clientY
          );
          // If scroll delta is small, treat it as a click
          if (scrollDelta < 10) {
            // Process click (upgrade purchase)
            this.handleUpgradesShopClick(x, y);
          }
        } else {
          // No scroll tracking, process click normally
          this.handleUpgradesShopClick(x, y);
        }
      }

      // Clear scroll tracking
      this.upgradesShopScrollStartY = null;
    }

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      const touchData = this.activeTouches.get(touch.identifier);

      if (touchData?.type === "block") {
        this.player.isBlocking = false;
        this.perfectBlock.wasCtrlHeld = false;
        this.isBlockButtonPressed = false;
      } else if (touchData?.type === "attack") {
        this.isAttackButtonPressed = false;
      }

      this.activeTouches.delete(touch.identifier);
    }
  }

  public handleTouchMove(e: TouchEvent): void {
    // Handle scrolling in upgrades shop on mobile
    if (
      this.gameStatus === "upgradesShop" &&
      this.upgradesShopScrollStartY !== null
    ) {
      e.preventDefault();

      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const currentY = touch.clientY;
        const deltaY = this.upgradesShopScrollStartY - currentY;

        // Update scroll offset (positive deltaY means scrolling up)
        const scrollSpeed = 0.5; // Adjust sensitivity
        const maxVisible = this.isMobile() ? 8 : 10;
        const upgradesCount = 10; // Total number of upgrades
        const maxScroll = Math.max(0, upgradesCount - maxVisible);

        this.upgradesShopScrollOffset = Math.max(
          0,
          Math.min(
            maxScroll,
            this.upgradesShopScrollOffset + deltaY * scrollSpeed
          )
        );

        // Update scroll start position for next move
        this.upgradesShopScrollStartY = currentY;
      }
    }
  }

  private handleUpgradeMenuTouch(x: number, y: number): void {
    const centerX = this.displayWidth / 2;

    if (this.isMobile()) {
      // Mobile layout - match drawUpgradeMenu() calculations
      const totalContentHeight = 400;
      const topPadding = 20;
      const bottomPadding = 20;
      const availableHeight = this.displayHeight - topPadding - bottomPadding;
      const startY = topPadding + (availableHeight - totalContentHeight) / 2;
      const ngPlusY = Math.max(120, startY + 60);
      const instructionsY = ngPlusY + 30;
      const optionStartY = instructionsY + 30;
      const optionSpacing = 45;
      const leftPadding = 15;
      const rightPadding = 15;
      const optionWidth = this.displayWidth - leftPadding - rightPadding;
      const optionLeft = leftPadding;
      const optionRight = optionLeft + optionWidth;

      // Check which upgrade option was touched
      for (let i = 0; i < 4; i++) {
        const optionY = optionStartY + i * optionSpacing;
        const optionTop = optionY - 30; // Match visual highlight area
        const optionBottom = optionY + 20;

        if (
          y >= optionTop &&
          y <= optionBottom &&
          x >= optionLeft &&
          x <= optionRight
        ) {
          const upgradeTypes: Array<
            "health" | "stamina" | "perfectBlock" | "attackDamage"
          > = ["health", "stamina", "perfectBlock", "attackDamage"];
          this.upgrades.selected = upgradeTypes[i];
          this.applyUpgrade(upgradeTypes[i]);
          return;
        }
      }
    } else {
      // Desktop layout - match drawUpgradeMenu() calculations
      const totalContentHeight = 550;
      const topPadding = 30;
      const bottomPadding = 30;
      const availableHeight = this.displayHeight - topPadding - bottomPadding;
      const startY = topPadding + (availableHeight - totalContentHeight) / 2;
      const ngPlusY = Math.max(140, startY + 80);
      const instructionsY = ngPlusY + 40;
      const optionStartY = instructionsY + 40;
      const optionSpacing = 70;
      const optionWidth = 600;
      const optionLeft = centerX - 300;
      const optionRight = optionLeft + optionWidth;

      // Check which upgrade option was touched
      for (let i = 0; i < 4; i++) {
        const optionY = optionStartY + i * optionSpacing;
        const optionTop = optionY - 35;
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
          this.upgrades.selected = upgradeTypes[i];
          this.applyUpgrade(upgradeTypes[i]);
          return;
        }
      }
    }
  }

  private handleUpgradeMenuClick(x: number, y: number): void {
    // Use the same logic as touch handling
    this.handleUpgradeMenuTouch(x, y);
  }

  public setUpgradeMenuTouchY(y: number | null): void {
    this.upgradeMenuTouchY = y;
  }

  public cleanup(): void {
    this.stop();
    // Clean up audio
    this.audioManager.cleanup();
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("keydown", this.keydownHandler);
    window.removeEventListener("keyup", this.keyupHandler);
    this.canvas.removeEventListener("touchstart", this.touchstartHandler);
    this.canvas.removeEventListener("touchend", this.touchendHandler);
    this.canvas.removeEventListener("touchcancel", this.touchcancelHandler);
    this.canvas.removeEventListener("touchmove", this.touchmoveHandler);
    this.canvas.removeEventListener("click", this.clickHandler);
    this.canvas.removeEventListener("mousemove", this.mousemoveHandler);
    if (this.wheelHandler) {
      this.canvas.removeEventListener("wheel", this.wheelHandler);
    }
  }
}
