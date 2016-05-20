/**
 * Parent class of all systems.
 */
class System {
  /**
   * Parent constructor for all system subclasses.
   */
  constructor() {
    this._componentsTracked = [];

    this.play = null;
    this.entities = [];
  }

  /**
   * Sets the component names the system should listen for.
   * @param {[]string} componentsTracked - An array of component names.
   */
  set componentsTracked(componentsTracked) {
    this._componentsTracked = componentsTracked;
  }

  /**
   * The callback method for an `addComponent` event type.
   * @param {Entity} entity - The entity which has just fired an `addComponent` event.
   */
  addComponentListener(entity) {
    if(this.play.entities.hasComponents(entity.id, ...this._componentsTracked)) {
      this.entities.push(entity);
    }
  }

  /**
   * The callback method for a `removeComponent` event type.
   * @param {Entity} entity - The entity which has just fired a `removeComponent` event.
   */
  removeComponentListener(entity) {
    if(!this.play.entities.hasComponents(entity.id, ...this._componentsTracked)) {
      for(let i = 0; i < this.entities.length; i++) {
        if(entity.id === this.entities[i].id) {
          this.entities.splice(i, 1);
        }
      }
    }
  }
}

/**
 * The parent class of all systems which update the values of their required components.
 * @extends System
 */
class UpdateSystem extends System {
  /**
   * Update method which must be overwritten by the subclass.
   */
  update() {
    throw new Error('must be set in subclass');
  }
}

/**
 * The parent class of all systems which render the data of their required components.
 */
class DrawSystem extends System {
  /**
   * Render method which must be overwritten by the subclass.
   * @param {number} dt - The lag offset between drawing frames.
   */
  render(dt) {
    throw new Error('must be set in subclass');
  }
}
