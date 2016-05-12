function UUID() {
  let buffer = new Uint32Array(8);
  window.crypto.getRandomValues(buffer);
  let hex = [];
  for(let i = 0; i < buffer.length; i++) {
    hex.push(buffer[i].toString(16));
  }
  let s = hex.join('');
  return s.substring(0,8)+"-"+s.substring(8,12)+"-"+s.substring(12,16)+"-"+s.substring(16,20)+"-"+s.substring(20,32);
}
class Component {
  name() {
    return this.constructor.name.toLowerCase().replace('component','');
  }
}
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
    if(this._entityManager.hasComponents(entity.id, ...this._componentsTracked)) {
      this.entities.push(entity);
    }
  }

  removeComponentListener(entity) {
    if(!this._entityManager.hasComponents(entity.id, ...this._componentsTracked)) {
      for(let i = 0; i < this.entities.length; i++) {
        if(entity.id === this.entities[i].id) {
          this.entities.splice(i, 1);
        }
      }
    }
  }

  update() {
    throw new Error('function update() must be implemented by subclass.');
  }
}
class Manager {}

class EntityManager extends Manager {
  constructor(eventManager) {
    super();
    this._entities = {};
    this._groups = {};
    this._components = {};

    this._eventManager = eventManager;
  }

  create(group, tag = null) {
    let entity = new Entity();
    entity.manager = this;
    entity.group = group;
    entity.tag = tag;
    let id = entity.id;
    this._entities[id] = entity;
    this._groups[group] = this._groups[group] || [];
    this._groups[group].push(entity);
    return id;
  }

  addComponent(entityId, ...components) {
    if(this._entities.hasOwnProperty(entityId)) {
      let entity = this._entities[entityId];
      for(let i = 0; i < components.length; i++) {
        if(entity.addComponent(components[i])) {
          this._components[components[i].name()] = this._components[components[i].name()] || [];
          this._components[components[i].name()].push(entity);
          this._eventManager.emit('addComponent', entity);
        }
      }
      return true;
    }
    return false;
  }

  removeComponent(entityId, ...components) {
    if(this._entities.hasOwnProperty(entityId)) {
      let entity = this._entities[entityId];
      for(let i = 0; i < components.length; i++) {
        entity.removeComponent(components[i]);
        for(let j = 0; j < this._components[componets[i]].length; j ++) {
          if(entityid === this._components[componets[i]][j].id) {
            this._components[componets[i]].splice(j, 1);
            this._eventManager.emit('removeComponent', entity);
          }
        }
      }
      return true;
    }
    return false;
  }

  hasComponents(entityId, ...components) {
    if(this._entities.hasOwnProperty(entityId)) {
      let entity = this._entities[entityId];
      let has = true;
      for(let i = 0; i < components.length; i++) {
        if(!entity.hasOwnProperty(components[i])) {
          has = false;
          break;
        }
      }
      return has;
    }
    return false;
  }

  removeAllComponents(entityId) {
    if(this._entities.hasOwnProperty(entityId)) {
      let entity = this._entities[entityId];
      entity.removeAllComponents();
      return true;
    }
    return false;
  }

  getEntitiesByTag(tag) {
    let entities = [];
    for(let i = 0; i < this._entities.length; i++) {
      if(this._entities[i].tag === 'tag') {
        entities.push(this._entities[i]);
      }
    }
    return entities;
  }

  getEntitiesByGroup(group) {
    if(this._groups.hasOwnProperty(group)) {
      return this._groups[group];
    }
    return [];
  }

  isEntityInGroup(entityId, group) {
    if(this._groups.hasOwnProperty(group)) {
      for(let i = 0; this._groups[group].length; i++) {
        if(entityId === this._groups[group][i].id) {
          return true;
        }
      }
    }
    return false;
  }

  removeEntity(entityId) {
    if(this._entities.hasOwnProperty(entityId)) {
      this.removeAllComponents(entityId);
      let group = this._entities[entityId].group;
      for(let i = 0; i < this._groups[group].length; i++) {
        if(this._group[group][i].id === entityId) {
          this._group[group].splice(i, 1);
        }
      }
      delete this._entities[entityId];
      return true;
    }
    return false;
  }

  removeAllEntities() {
    for(let i = 0; i < this._entities.length; i++) {
      this.removeAllComponents(this._entities[i].id);
    }

    this._components = {};
    this._groups = {};
    this._entities = {};
  }
}

class SystemManager extends Manager {
  constructor(canvasManager, entityManager, eventManager) {
    super();
    this._systems = [];
    this._canvasManager = canvasManager;
    this._entityManager = entityManager;
    this._eventManager = eventManager;
  }

  register(system, ...componentsTracked) {
    if(system instanceof System) {
      system._canvasManager = this._canvasManager;
      system._entityManager = this._entityManager;
      system._eventManager = this._eventManager;
      system.componentsTracked = componentsTracked;

      this._eventManager.on('addComponent', (entity) => system.addComponentListener(entity));
      this._eventManager.on('removeComponent', (entity) => system.removeComponentListener(entity));

      this._systems.push(system);
      return true;
    }
    return false;
  }

  updateLoop() {
    for(let i = 0; i < this._systems.length; i++) {
      this._systems[i].update();
    }
  }
}

class EventManager extends Manager {
  constructor() {
    super();
    this._events = {};
  }

  on(type, callback) {
    this._events[type] = this._events[type] || [];
    this._events[type].push(callback);
  }

  emit(type, ...args) {
    if(this._events.hasOwnProperty(type)) {
      let callbacks = this._events[type];
      for(let i = 0; i < callbacks.length; i++) {
        callbacks[i](...args);
      }
    }
  }
}

class CanvasManager extends Manager {

}

class Managers {
  constructor() {
    this.events = new EventManager();
    this.entity = new EntityManager(this.events);
    this.canvas = new CanvasManager();
    this.system = new SystemManager(this.canvas, this.entity, this.events);
  }
}

const managers = new Managers();
