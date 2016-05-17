class Antares {
  constructor(gameName) {
    this.gameName = gameName;

    // set up game managers
    let events = new EventManager();
    let canvas = new CanvasManager(this.events);

    this._managers = {
      'events': events,
      'canvas': canvas,
    }
  }

  get entity() {
    this._managers.entity;
  }

  get system() {
    return this._managers.system;
  }
}
