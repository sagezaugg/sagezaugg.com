/**
 * Audio Manager Service for TinySouls Game
 * Handles loading, playing, and managing all game audio including sound effects and background music
 */

export class AudioManager {
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private backgroundMusic: HTMLAudioElement | null = null;
  private currentMusicPath: string | null = null;
  
  // Volume settings (0.0 to 1.0)
  private masterVolume: number = 1.0;
  private musicVolume: number = 0.7;
  private sfxVolume: number = 0.8;
  private isMuted: boolean = false;

  // Base path for audio files
  private readonly audioBasePath: string = "/assets/games/audio/";

  /**
   * Load an audio file and cache it
   */
  private async loadAudio(path: string): Promise<HTMLAudioElement> {
    // Check cache first
    if (this.audioCache.has(path)) {
      return this.audioCache.get(path)!;
    }

    // Create new audio element
    const audio = new Audio(path);
    
    // Set up error handling - don't throw, just log
    audio.addEventListener("error", (e) => {
      // Silently handle errors for placeholder/missing files
      // Don't log to avoid console spam
    });

    // Cache the audio element (even if it fails to load)
    this.audioCache.set(path, audio);

    // Preload the audio with timeout
    // Use a more lenient approach - don't wait for canplaythrough
    // Just try to load and return, errors will be handled when playing
    try {
      audio.preload = "auto";
      audio.load();
      
      // Wait a short time for initial load, but don't block
      await Promise.race([
        new Promise<void>((resolve) => {
          const handleCanPlay = () => {
            cleanup();
            resolve();
          };
          const handleError = () => {
            cleanup();
            // Don't reject - return the audio element anyway
            resolve();
          };
          const cleanup = () => {
            audio.removeEventListener("canplaythrough", handleCanPlay);
            audio.removeEventListener("loadeddata", handleCanPlay);
            audio.removeEventListener("error", handleError);
          };
          // Listen for canplaythrough or loadeddata (less strict)
          audio.addEventListener("canplaythrough", handleCanPlay, { once: true });
          audio.addEventListener("loadeddata", handleCanPlay, { once: true });
          audio.addEventListener("error", handleError, { once: true });
        }),
        new Promise<void>((resolve) => {
          // Timeout after 1 second - don't wait forever
          setTimeout(() => resolve(), 1000);
        })
      ]);
    } catch (error) {
      // Silently handle errors - placeholder files may not exist
    }

    return audio;
  }

  /**
   * Get the full path for an audio file
   */
  private getAudioPath(filename: string): string {
    return `${this.audioBasePath}${filename}`;
  }

  /**
   * Play a sound effect
   */
  public async playSound(soundName: string, volume: number = 1.0): Promise<void> {
    if (this.isMuted) {
      return;
    }

    const path = this.getAudioPath(soundName);
    
    try {
      const audio = await this.loadAudio(path);
      
      // Clone the audio element to allow overlapping sounds
      const audioClone = audio.cloneNode() as HTMLAudioElement;
      audioClone.volume = Math.max(0, Math.min(1, volume * this.sfxVolume * this.masterVolume));
      
      // Set error handler to prevent uncaught errors
      audioClone.addEventListener("error", () => {
        // Silently handle errors for placeholder/missing files
      });
      
      // Play the sound - catch and ignore errors for missing files
      audioClone.play().catch(() => {
        // Silently handle play errors (e.g., empty placeholder files)
      });

      // Clean up after playback
      audioClone.addEventListener("ended", () => {
        // Audio element will be garbage collected
      });
    } catch (error) {
      // Silently handle errors - placeholder files may not exist yet
    }
  }

  /**
   * Play background music (looping)
   */
  public async playMusic(musicName: string, volume: number = 1.0): Promise<void> {
    const path = this.getAudioPath(musicName);

    // Stop current music if playing
    this.stopMusic();

    try {
      const audio = await this.loadAudio(path);
      audio.loop = true;
      audio.volume = Math.max(0, Math.min(1, volume * this.musicVolume * this.masterVolume));
      
      // Set error handler to prevent uncaught errors
      audio.addEventListener("error", () => {
        // Silently handle errors for placeholder/missing files
        this.backgroundMusic = null;
        this.currentMusicPath = null;
      });
      
      this.backgroundMusic = audio;
      this.currentMusicPath = path;

      // Play the music - catch and ignore errors for missing files
      await audio.play().catch(() => {
        // Silently handle play errors (e.g., empty placeholder files)
        this.backgroundMusic = null;
        this.currentMusicPath = null;
      });
    } catch (error) {
      // Silently handle errors - placeholder files may not exist yet
      this.backgroundMusic = null;
      this.currentMusicPath = null;
    }
  }

  /**
   * Stop background music
   */
  public stopMusic(): void {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
      this.backgroundMusic = null;
      this.currentMusicPath = null;
    }
  }

  /**
   * Fade out background music
   */
  public fadeOutMusic(duration: number = 1000): void {
    if (!this.backgroundMusic) {
      return;
    }

    const startVolume = this.backgroundMusic.volume;
    const startTime = performance.now();

    const fadeInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      if (this.backgroundMusic) {
        this.backgroundMusic.volume = startVolume * (1 - progress);
      }

      if (progress >= 1) {
        clearInterval(fadeInterval);
        this.stopMusic();
      }
    }, 16); // ~60fps update rate
  }

  /**
   * Set master volume (0.0 to 1.0)
   */
  public setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this.updateVolumes();
  }

  /**
   * Set music volume (0.0 to 1.0)
   */
  public setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    this.updateVolumes();
  }

  /**
   * Set SFX volume (0.0 to 1.0)
   */
  public setSFXVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Update volumes for currently playing audio
   */
  private updateVolumes(): void {
    if (this.backgroundMusic) {
      const baseVolume = this.backgroundMusic.volume / (this.musicVolume * this.masterVolume);
      this.backgroundMusic.volume = Math.max(0, Math.min(1, baseVolume * this.musicVolume * this.masterVolume));
    }
  }

  /**
   * Mute/unmute all audio
   */
  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.backgroundMusic) {
      this.backgroundMusic.muted = muted;
    }
  }

  /**
   * Toggle mute state
   */
  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  /**
   * Preload all audio files for better performance
   */
  public async preloadAll(): Promise<void> {
    const audioFiles = [
      "game-intro.mp3",
      "button-click.mp3",
      "combat-music.mp3",
      "attack.mp3",
      "attack-hit.mp3",
      "attack-block.mp3",
      "perfect-block.mp3",
      "block.mp3",
      "player-death.mp3",
      "you-died.mp3",
      "enemy-vanquished.mp3",
      "you-win.mp3",
    ];

    const loadPromises = audioFiles.map((file) => {
      const path = this.getAudioPath(file);
      return this.loadAudio(path).catch((error) => {
        console.warn(`Preload failed for ${file}:`, error);
      });
    });

    await Promise.all(loadPromises);
  }

  /**
   * Clean up resources
   */
  public cleanup(): void {
    this.stopMusic();
    this.audioCache.clear();
  }
}

