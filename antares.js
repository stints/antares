class Manager {}

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
class SystemManager extends Manager {
  constructor(canvasManager, entityManager, eventManager) {
    super();
    this._systems = [];
    this._renders = [];
    this._canvasManager = canvasManager;
    this._entityManager = entityManager;
    this._eventManager = eventManager;
  }

  register(system, ...componentsTracked) {
    if(system instanceof System) {
      if(typeof system.update === 'function') {
        this._systems.push(system);
      } else if(typeof system.render === 'function') {
        this._renders.push(system);
      } else {
        throw new Error('System must have either an update or render method.');
      }

      system._canvasManager = this._canvasManager;
      system._entityManager = this._entityManager;
      system._eventManager = this._eventManager;
      system.componentsTracked = componentsTracked;

      this._eventManager.on('addComponent', (entity) => system.addComponentListener(entity));
      this._eventManager.on('removeComponent', (entity) => system.removeComponentListener(entity));

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
class SpriteManager extends Manager {
  constructor() {
    super();
    this._sheets = {};
  }

  addSheet(name, src, tiles, width, height, x, y) {
    let img = new Image();
    this._sheets[name] = {
      'sprite': new Sprite(name, tiles, width, height, x, y, img),
      'load': false
    };

    img.addEventListener('load', () => this.sheetLoadListener(name));
    img.src = src;

    return;
  }

  sheetLoadListener(name) {
    this._sheets[name].load = true;
  }

  sheetsLoaded() {
    let isLoaded = true;
    let sheets = Object.keys(this._sheets);
    for(let i = 0; i < sheets.length; i++) {
      if(!this._sheets[sheets[i]].load) {
        isLoaded = false;
        break;
      }
    }
    return isLoaded;
  }


}
class Component {
  name() {
    return this.constructor.name.toLowerCase().replace('component','');
  }
}
class Sprite {
  constructor(name, tiles, width, height, x, y, sheet) {
    this.name = name;
    this.tiles = tiles;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.sheet = sheet;

    this.currentTile = -1;
  }

  nextTile() {
    this.currentTile = ++this.currentTile < this.tiles ? this.currentTile : 0;

    let options = {
      'sheet': this.sheet,
      'y': this.y,
      'x': this.x + this.width * this.currentTile,
      'width': this.width,
      'height': this.height
    };

    return options;
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
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    let x = this.x + vector.x;
    let y = this.y + vector.y;

    return new Vector(x, y);
  }

  sub(vector) {
    let x = this.x - vector.x;
    let y = this.y - vector.y;

    return new Vector(x, y);
  }

  length() {
    return this._round(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)), 6);
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  angle(vector) {
    return Math.acos(this.dot(vector) / this.length() * vector.length());
  }

  cross(vector) {
    return this.x * vector.y - this.y * vector.x;
  }

  normalize() {
    let length = this.length();
    let x = this.x / length;
    let y = this.y / length;

    return new Vector(x, y);
  }

  rotate(rad) {
    let sin = this._round(Math.sin(rad), 10);
    let cos = this._round(Math.cos(rad), 10);
    let x = this.x * cos - this.y * sin;
    let y = this.x * sin + this.y * cos;

    return new Vector(x, y);
  }

  scale(factor) {
    let x = this.x * factor;
    let y = this.y * factor;

    return new Vector(x, y);
  }

  _round(value, amount = 6) {
    let d = Math.pow(10, amount);
    let s = 1/(d*10);
    return Math.round((value + s) * d) / d
  }
}
class Ticker {
  constructor() {
    this.lastTick = window.performance.now();
    this.time = 0;
  }

  tick() {
    let now = window.performance.now();
    let tick = Math.min(1, now - this.lastTick);
    this.lastTick = now;
    this.time += tick;
    return tick;
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
