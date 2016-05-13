class Manager {}


class Managers {
  constructor() {
    this.events = new EventManager();
    this.entity = new EntityManager(this.eventManager);
    this.canvas = new CanvasManager(this.eventManager);
    this.system = new SystemManager(this.canvasManager, this.entityManager, this.eventManager);
  }
}

const managers = new Managers();
