class SystemManager extends Manager {
  constructor(canvasManager, entityManager, eventManager) {
    super();
    this._updates = [];
    this._renders = [];
    this._canvasManager = canvasManager;
    this._entityManager = entityManager;
    this._eventManager = eventManager;
  }

  load(...systems) {

  }

  register(system, ...componentsTracked) {
    if(system instanceof System) {
      if(typeof system.update === 'function') {
        this._updates.push(system);
      } else if(typeof system.render === 'function') {
        this._renders.push(system);
      } else {
        throw new Error('System must have either an update or render method.');
      }


      system.canvasManager = this._canvasManager;
      system.entityManager = this._entityManager;
      system.eventManager = this._eventManager;
      system.componentsTracked = componentsTracked;

      this._eventManager.on('addComponent', (entity) => system.addComponentListener(entity));
      this._eventManager.on('removeComponent', (entity) => system.removeComponentListener(entity));

      if(typeof system.init === 'function') {
        system.init();
      }

      return true;
    }
    return false;
  }

  updateLoop() {
    for(let i = 0; i < this._updates.length; i++) {
      this._updates[i].update();
    }
  }

  renderLoop(dt) {
    for(let i = 0; i < this._renders.length; i++) {
      this._renders[i].render(dt);
    }
  }
}
