class SystemStore {
  constructor(messageDispatch, entityStore) {
    this.updates = [];
    this.renders = [];
    this.messageDispatch = messageDispatch;
    this.entityStore = entityStore;
  }

  register(system, ...componentsTracked) {
    if(system instanceof System) {
      if(typeof system.update === 'function') {
        this.updates.push(system);
      } else if(typeof system.render === 'function') {
        this.renders.push(system);
      } else {
        throw new Error('System must have either an update or render method.');
      }

      system.entityStore = this.entityStore;
      system.messageDispatch = this.messageDispatch;
      system.componentsTracked = componentsTracked;

      this.messageDispatch.on('addComponent', (entity) => system.addComponentListener(entity));
      this.messageDispatch.on('removeComponent', (entity) => system.removeComponentListener(entity));

      if(typeof system.init === 'function') {
        system.init();
      }

      return true;
    }
    return false;
  }

  updateLoop() {
    for(let i = 0; i < this.updates.length; i++) {
      this.updates[i].update();
    }
  }

  renderLoop(dt) {
    for(let i = 0; i < this.renders.length; i++) {
      this.renders[i].render(dt);
    }
  }
}
