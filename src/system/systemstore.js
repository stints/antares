/**
 * Class to store all systems.
 */
class SystemStore {
  /**
   * Creates a new SystemStore.
   * @param {Dispatch} messageDispatch - The dispatcher to create and fire messages.
   * @param {EntityStore} entityStore - The EntityStore which holds all entities in the game.
   */
  constructor() {
    this.updates = [];
    this.renders = [];
    this.play = null
  }

  /**
   * Registers a new system object into the store.
   * @param {System} system - A system which extends either UpdateSystem or DrawSystem.
   * @param {[]string} componentsTracked - An array of component names this system requires to function.
   * @return {boolean} A boolean value which will be true if the system param is of type System.
   */
  register(system, ...componentsTracked) {
    if(system instanceof System) {
      if(typeof system.update === 'function') {
        this.updates.push(system);
      } else if(typeof system.render === 'function') {
        this.renders.push(system);
      } else {
        throw new Error('System must have either an update or render method.');
      }

      system.componentsTracked = componentsTracked;
      system.play = this.play;

      this.play.dispatch.on('addComponent', (entity) => system.addComponentListener(entity));
      this.play.dispatch.on('removeComponent', (entity) => system.removeComponentListener(entity));

      if(typeof system.init === 'function') {
        system.init();
      }

      return true;
    }
    return false;
  }

  /**
   * Loops over all UpdateSystem.update methods.
   */
  updateLoop(dt) {
    for(let i = 0; i < this.updates.length; i++) {
      this.updates[i].update();
    }
  }

  /**
   * Loops over all DrawSystem.render methods.
   * @param {number} dt - The lag offset between drawing frames.
   */
  renderLoop(dt) {
    for(let i = 0; i < this.renders.length; i++) {
      this.renders[i].render(dt);
    }
  }
}
