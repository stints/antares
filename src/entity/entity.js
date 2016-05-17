/**
 * Class representing a game object.
 */
class Entity {
  /**
   * Creates a new entity object.
   */
  constructor() {
    this._id = UUID();
    this.store = null;
    this.tag =  null;
    this.group = null;
  }
  /**
   * Get the entity id.
   * @return {string} The hex string representing the ID.
   */
  get id() {
    return this._id;
  }

  /**
   * Returns an array of component names this entity contains.
   * @return {array} The list of components.
   */
  getComponentNames() {
    let names = [];
    let thisKeys = Object.keys(this);
    for(let i = 0; i < thisKeys.length; i++) {
      if(thisKeys[i].charAt(0) != '_') {
        names.push(thisKeys[i]);
      }
    }
    return names;
  }

  /**
   * Injects a component object into the entity.
   * @param {Component} component - The component object to add.
   * @return {boolean} A boolean value if the component was successfully added.
   */
  addComponent(component) {
    if(component instanceof Component) {
      this[component.name()] = component;
      return true;
    } else {
      return new Error('object must be a subclass of Component');
    }
    return false;
  }

  /**
   * Removes the component from the entity.
   * @param {string} componentName - The components name.
   * @return {boolean} A boolean value if the component was successfully removed.
   */
  removeComponent(componentName) {
    if(this.hasOwnProperty(componentName)) {
      delete this[componentName.toLowerCase()];
      return true;
    }
    return false;
  }

  /**
   * Removes all components from the entity.
   */
  removeAllComponents() {
    let thisKeys = this.getComponentNames();
    for(let i = 0; i < thisKeys.length; i++) {
      this.removeComponent(thisKeys[i]);
    }
    return;
  }
}
