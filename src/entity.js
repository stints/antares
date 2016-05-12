class Entity {
  constructor() {
    this._id = UUID();
    this._manager = null;
    this._tag =  null;
    this._group = null;

  }

  get id() {
    return this._id;
  }

  get manager() {
    return this._manager;
  }

  set manager(manager) {
    this._manager = manager;
  }

  get tag() {
    return this._tag;
  }

  set tag(tag) {
    this._tag = tag;
  }

  get group() {
    return this._group;
  }

  set group(group) {
    this._group = group;
  }

  addComponent(component) {
    if(component instanceof Component) {
      this[component.name()] = component;
      return true;
    } else {
      return new Error('object must be a subclass of Component');
    }
    return false;
  }

  removeComponent(component) {
    let componentName = typeof component == 'string' ? component : component.name();
    if(this.hasOwnProperty(componentName)) {
      delete this[componentName.toLowerCase()];
      return true;
    }
    return false;
  }

  removeAllComponents() {
    let thisKeys = Object.keys(this);
    for(let i = 0; i < thisKeys.length; i++) {
      if(thisKeys[i].charAt(0) != '_') {
        this.removeComponent(thisKeys[i]);
      }
    }
    return;
  }
}
