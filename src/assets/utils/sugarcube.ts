/**
 * SugarCube utility functions for safe access to the engine
 */

// Extend Window interface to include SugarCube
declare global {
  interface Window {
    SugarCube?: {
      Engine?: any;
      State?: any;
      Story?: any;
      Config?: any;
      setup?: any;
    };
    SugarCubeAPI?: {
      Engine?: any;
      State?: any;
      Story?: any;
      Config?: any;
      setup?: any;
    };
  }
}

export class SugarCubeUtils {
  /**
   * Get the SugarCube object (either SugarCube or SugarCubeAPI)
   */
  private static getSugarCubeObject() {
    if (typeof window !== 'undefined') {
      return window.SugarCube || window.SugarCubeAPI;
    }
    return null;
  }

  /**
   * Check if SugarCube is available
   */
  static isAvailable(): boolean {
    const sc = this.getSugarCubeObject();
    return sc !== null && sc !== undefined && sc.Engine !== null;
  }

  /**
   * Navigate to a passage safely
   */
  static goToPassage(passageName: string): boolean {
    const sc = this.getSugarCubeObject();
    if (this.isAvailable() && sc?.Engine) {
      sc.Engine.play(passageName);
      return true;
    }
    console.warn('SugarCube Engine not available');
    return false;
  }

  /**
   * Get current passage name
   */
  static getCurrentPassage(): string | null {
    const sc = this.getSugarCubeObject();
    if (this.isAvailable() && sc?.State?.active) {
      return sc.State.active.title;
    }
    return null;
  }

  /**
   * Set a story variable
   */
  static setVariable(name: string, value: any): boolean {
    const sc = this.getSugarCubeObject();
    if (this.isAvailable() && sc?.State?.variables) {
      sc.State.variables[name] = value;
      return true;
    }
    console.warn('SugarCube State not available');
    return false;
  }

  /**
   * Get a story variable
   */
  static getVariable(name: string, defaultValue?: any): any {
    const sc = this.getSugarCubeObject();
    if (this.isAvailable() && sc?.State?.variables) {
      return sc.State.variables[name] ?? defaultValue;
    }
    return defaultValue;
  }

  /**
   * Check if a passage has been visited
   */
  static hasVisited(passageName: string): boolean {
    const sc = this.getSugarCubeObject();
    if (this.isAvailable() && sc?.State) {
      // Use SugarCube's visited function if available
      if (sc.State.history) {
        return sc.State.history.some((moment: any) => moment.title === passageName);
      }
    }
    return false;
  }

  /**
   * Get the number of times a passage has been visited
   */
  static getVisitCount(passageName: string): number {
    const sc = this.getSugarCubeObject();
    if (this.isAvailable() && sc?.State) {
      if (sc.State.history) {
        return sc.State.history.filter((moment: any) => moment.title === passageName).length;
      }
    }
    return 0;
  }

  /**
   * Go back to previous passage
   */
  static goBack(): boolean {
    const sc = this.getSugarCubeObject();
    if (this.isAvailable() && sc?.Engine) {
      sc.Engine.backward();
      return true;
    }
    console.warn('SugarCube Engine not available');
    return false;
  }

  /**
   * Restart the story
   */
  static restart(): boolean {
    const sc = this.getSugarCubeObject();
    if (this.isAvailable() && sc?.Engine) {
      sc.Engine.restart();
      return true;
    }
    console.warn('SugarCube Engine not available');
    return false;
  }

  /**
   * Execute a function when SugarCube is ready
   */
  static whenReady(callback: () => void, timeout: number = 5000): void {
    if (this.isAvailable()) {
      callback();
      return;
    }

    // Listen for the custom event
    const handleSugarCubeReady = () => {
      document.removeEventListener('sugarcube-ready', handleSugarCubeReady);
      callback();
    };

    document.addEventListener('sugarcube-ready', handleSugarCubeReady);

    // Fallback timeout
    setTimeout(() => {
      document.removeEventListener('sugarcube-ready', handleSugarCubeReady);
      if (!this.isAvailable()) {
        console.warn('SugarCube did not become available within timeout');
      }
    }, timeout);
  }

  /**
   * Get story metadata
   */
  static getStoryInfo(): { title?: string; id?: string } | null {
    const sc = this.getSugarCubeObject();
    if (this.isAvailable() && sc?.Story) {
      return {
        title: sc.Story.title,
        id: sc.Story.id,
      };
    }
    return null;
  }

  /**
   * Check if a passage exists
   */
  static passageExists(passageName: string): boolean {
    const sc = this.getSugarCubeObject();
    if (this.isAvailable() && sc?.Story) {
      return sc.Story.has(passageName);
    }
    return false;
  }

  /**
   * Get direct access to SugarCube objects (use with caution)
   */
  static getSugarCube() {
    return this.getSugarCubeObject();
  }
}

export default SugarCubeUtils;
