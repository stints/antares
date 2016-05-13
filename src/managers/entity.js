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
