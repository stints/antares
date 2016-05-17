class EntityStore {
  constructor(dispatch) {
    this.store = {};
    this.groups = {};
    this.components = {};

    this.dispatch = dispatch;
  }

  create(group, tag = '', ...components) {
    let entity = new Entity();
    entity.manager = this;
    entity.group = group;
    entity.tag = tag;
    let id = entity.id;
    this.store[id] = entity;
    this.groups[group] = this.groups[group] || [];
    this.groups[group].push(entity);

    if(components.length > 0) {
      this.addComponent(id, ...components);
    }

    return id;
  }

  addComponent(entityId, ...components) {
    if(this.store.hasOwnProperty(entityId)) {
      let componentsAdded = false;
      let entity = this.store[entityId];
      for(let i = 0; i < components.length; i++) {
        if(entity.addComponent(components[i])) {
          this.components[components[i].name()] = this.components[components[i].name()] || [];
          this.components[components[i].name()].push(entity);
          componentsAdded = true;
        }
      }
      if(componentsAdded) {
        this.dispatch.emit('addComponent', entity);
      }
      return componentsAdded;
    }
    return false;
  }

  removeComponent(entityId, ...components) {
    if(this.store.hasOwnProperty(entityId)) {
      let componentsRemoved = false;
      let entity = this.store[entityId];
      for(let i = 0; i < components.length; i++) {
        entity.removeComponent(components[i]);
        for(let j = 0; j < this.components[componets[i]].length; j ++) {
          if(entityid === this.components[componets[i]][j].id) {
            this.components[componets[i]].splice(j, 1);
            componentsRemoved = true;
          }
        }
      }
      if(componentsRemoved) {
        this.dispatch.emit('removeComponent', entity);
      }
      return componentsRemoved;
    }
    return false;
  }

  hasComponents(entityId, ...components) {
    if(this.store.hasOwnProperty(entityId)) {
      let entity = this.store[entityId];
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
    if(this.store.hasOwnProperty(entityId)) {
      let entity = this.store[entityId];
      entity.removeAllComponents();
      return true;
    }
    return false;
  }

  getEntitiesByTag(tag) {
    let entities = [];
    for(let i = 0; i < this.store.length; i++) {
      if(this.store[i].tag === 'tag') {
        entities.push(this.store[i]);
      }
    }
    return entities;
  }

  getEntitiesByGroup(group) {
    if(this.groups.hasOwnProperty(group)) {
      return this.groups[group];
    }
    return [];
  }

  isEntityInGroup(entityId, group) {
    if(this.groups.hasOwnProperty(group)) {
      for(let i = 0; this.groups[group].length; i++) {
        if(entityId === this.groups[group][i].id) {
          return true;
        }
      }
    }
    return false;
  }

  removeEntity(entityId) {
    if(this.store.hasOwnProperty(entityId)) {
      this.removeAllComponents(entityId);
      let group = this.store[entityId].group;
      for(let i = 0; i < this.groups[group].length; i++) {
        if(this._group[group][i].id === entityId) {
          this._group[group].splice(i, 1);
        }
      }
      delete this.store[entityId];
      return true;
    }
    return false;
  }

  removeAllEntities() {
    for(let i = 0; i < this.store.length; i++) {
      this.removeAllComponents(this.store[i].id);
    }

    this.components = {};
    this.groups = {};
    this.store = {};
  }
}
