class System {
  constructor() {
    this.canvasManager = null;
    this.entityManager = null;
    this.eventManager = null;

    this._componentsTracked = [];

    this.entities = [];
  }

  set componentsTracked(componentsTracked) {
    this._componentsTracked = componentsTracked;
  }

  addComponentListener(entity) {
    if(this.entityManager.hasComponents(entity.id, ...this._componentsTracked)) {
      this.entities.push(entity);
    }
  }

  removeComponentListener(entity) {
    if(!this.entityManager.hasComponents(entity.id, ...this._componentsTracked)) {
      for(let i = 0; i < this.entities.length; i++) {
        if(entity.id === this.entities[i].id) {
          this.entities.splice(i, 1);
        }
      }
    }
  }
}
