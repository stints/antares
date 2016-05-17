class Antares {
  constructor(gameName) {
    this.gameName = gameName;

    // set up game managers
    let events = new EventManager();
    let entity = new EntityManager(this.events);
    let canvas = new CanvasManager(this.events);
    let system = new SystemManager(this.canvas, this.entity, this.events);

    this._managers = {
      'events': events,
      'entity': entity,
      'canvas': canvas,
      'system': system
    }
  }

  get entity() {
    this._managers.entity;
  }

  get system() {
    return this._managers.system;
  }
}
