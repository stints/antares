/**
 * Class to handle timers.
 */
class Ticker {
  /**
   * Creates a new ticker.
   */
  constructor() {
    this.lastTick = window.performance.now();
    this.time = 0;
  }

  /**
   * Get the value between now and last tick.
   * @return {number} The value between now and last tick.
   */
  tick() {
    let now = window.performance.now();
    let tick = Math.min(1, now - this.lastTick);
    this.lastTick = now;
    this.time += tick;
    return tick;
  }
}
