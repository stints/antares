class Manager {}

class Managers {
  constructor() {
    this.events = new EventManager();
    this.entity = new EntityManager(this.events);
    this.canvas = new CanvasManager(this.events);
    this.system = new SystemManager(this.canvas, this.entity, this.events);
  }
}

const managers = new Managers();
