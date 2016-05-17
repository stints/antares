class Ticker {
  constructor() {
    this.lastTick = window.performance.now();
    this.time = 0;
  }

  tick() {
    let now = window.performance.now();
    let tick = Math.min(1, now - this.lastTick);
    this.lastTick = now;
    this.time += tick;
    return tick;
  }
}
