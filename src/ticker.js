class Ticker {
  constructor() {
    this.lastTick = 0;
    this.time = 0;
  }

  tick() {
    let now = window.performance.now();
    let tick = now - this.lastTick;
    this.lastTick = now;
    this.time += tick;
    return tick;
  }
}
