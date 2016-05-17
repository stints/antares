class Antares {
  constructor(gameName) {
    this.gameName = gameName;

    // set up game managers
    let events = new EventManager();
    let canvas = new CanvasManager(this.events);
    let states = new StatesManager(this.events, this.canvas);

    this._managers = {
      'events': events,
      'canvas': canvas,
      'states': states
    }
  }

  get entity() {
    this._managers.entity;
  }

  get system() {
    return this._managers.system;
  }
}
