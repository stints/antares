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
      let componentsAdded = false;
      let entity = this._entities[entityId];
      for(let i = 0; i < components.length; i++) {
        if(entity.addComponent(components[i])) {
          this._components[components[i].name()] = this._components[components[i].name()] || [];
          this._components[components[i].name()].push(entity);
          componentsAdded = true;
        }
      }
      if(componentsAdded) {
        this._eventManager.emit('addComponent', entity);
      }
      return componentsAdded;
    }
    return false;
  }

  removeComponent(entityId, ...components) {
    if(this._entities.hasOwnProperty(entityId)) {
      let componentsRemoved = false;
      let entity = this._entities[entityId];
      for(let i = 0; i < components.length; i++) {
        entity.removeComponent(components[i]);
        for(let j = 0; j < this._components[componets[i]].length; j ++) {
          if(entityid === this._components[componets[i]][j].id) {
            this._components[componets[i]].splice(j, 1);
            componentsRemoved = true;
          }
        }
      }
      if(componentsRemoved) {
        this._eventManager.emit('removeComponent', entity);
      }
      return componentsRemoved;
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
  constructor(eventManager) {
    super();
    this._eventManager = eventManager;
    this._canvases = {};
  }

  create(name, width, height, top, left, cursor = 'none', domTag = 'body') {
    let zIndex = Object.keys(this._canvases).length;
    let canvas = document.createElement('canvas');
    let parent = document.getElementsByTagName(domTag)[0];

    canvas.width = width;
    canvas.height = height;
    canvas.id = name;

    canvas.style.zIndex = zIndex;
    canvas.style.display = 'block';
    canvas.style.cursor = cursor;
    canvas.style.position = 'absolute';
    canvas.style.top = top;
    canvas.style.left = left;

    this._canvases[name] = {
      'width': width,
      'height': height,
      'canvas': canvas,
      'ctx': canvas.getContext('2d'),
    };

    parent.appendChild(canvas);
  }

  canvas(name) {
    if(this._canvases.hasOwnProperty(name)) {
      return this._canvases[name].canvas;
    }
    return null;
  }

  ctx(name) {
    if(this._canvases.hasOwnProperty(name)) {
      return this._canvases[name].ctx;
    }
    return null;
  }

  width(name) {
    if(this._canvases.hasOwnProperty(name)) {
      return this._canvases[name].width;
    }
    return -1;
  }

  height(name) {
    if(this._canvases.hasOwnProperty(name)) {
      return this._canvases[name].height;
    }
    return -1;
  }

  toggle(name) {
    if(this._canvases.hasOwnProperty(name)) {
      if(this._canvases[name].canvas.style.display === 'none') {
        this.show(name);
      } else {
        this.hide(name);
      }
    }
    return;
  }

  show(name) {
    if(this._canvases.hasOwnProperty(name)) {
      this._canvases[name].canvas.style.display = 'block';
    }
    return;
  }

  hide(name) {
    if(this._canvases.hasOwnProperty(name)) {
      this._canvases[name].canvas.style.display = 'none';
    }
    return;
  }
}

class Managers {
  constructor() {
    this.events = new EventManager();
    this.entity = new EntityManager(this.eventManager);
    this.canvas = new CanvasManager(this.eventManager);
    this.system = new SystemManager(this.canvasManager, this.entityManager, this.eventManager);
  }
}

const managers = new Managers();
