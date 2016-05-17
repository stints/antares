class System {
  constructor() {
    this.entityStore = null;
    this.messageDispatch = null;

    this._componentsTracked = [];

    this.entities = [];
  }

  set componentsTracked(componentsTracked) {
    this._componentsTracked = componentsTracked;
  }

  addComponentListener(entity) {
    if(this.entityStore.hasComponents(entity.id, ...this._componentsTracked)) {
      this.entities.push(entity);
    }
  }

  removeComponentListener(entity) {
    if(!this.entityStore.hasComponents(entity.id, ...this._componentsTracked)) {
      for(let i = 0; i < this.entities.length; i++) {
        if(entity.id === this.entities[i].id) {
          this.entities.splice(i, 1);
        }
      }
    }
  }
}

class UpdateSystem extends System {
  update() {
    throw new Error('must be set in subclass');
  }
}

class DrawSystem extends System {
  render(dt) {
    throw new Error('must be set in subclass');
  }
}
