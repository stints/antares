class Antares {
  constructor(game, width, height) {
    this.game = game;
    this.gameWidth = width;
    this.gameHeight = height;

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

    this.initCanvas();
  }

  initCanvas() {
    let c = this._managers.canvas;
    c.create('static', this.width, this.height, 0, 0);
    c.create('dynamic', this.width, this.height, 0, 0);
  }

  get entity() {
    this._managers.entity;
  }

  get system() {
    return this._managers.system;
  }
}
