/**
 * Class to store all entities.
 */
class EntityStore {
  /**
   * Creates a new EntityStore object.
   */
  constructor() {
    this.store = {};
    this.groups = {};
    this.components = {};

    this.play = null;
  }

  /**
   * Creates a new entity object.
   * @param {string} group - The group name this new entity will belong to.
   * @param {string} tag - The unique tag name for this entity.  Optional.
   * @param {[]Components} components - An array of Components to add to the entity.
   * @return {string} The newly crated entity ID.
   */
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

  /**
   * Adds one or more components to an entity.
   * @param {string} entityId - The ID of the entity you will be adding components to.
   * @param {[]Components} components - An array of components to add to the entity.
   * @return {boolean} The boolean value which will be true if at least one component was added successfully.
   */
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
        this.play.dispatch.emit('addComponent', entity);
      }
      return componentsAdded;
    }
    return false;
  }

  /**
   * Removes one or more components from an entity.
   * @param {string} entityId - The ID of the entity to remove components from.
   * @param {[]string} components - An array of component names to remove.
   * @return {boolean} A boolean value which will be true if at least one component was removed.
   */
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
        this.play.dispatch.emit('removeComponent', entity);
      }
      return componentsRemoved;
    }
    return false;
  }

  /**
   * Checks to see if an entity has one or more components.
   * @param {string} entityId - The ID of the entity to check.
   * @param {[]string} components - An array of component names to check.
   * @return {boolean} A boolean value which will be true if ALL components exist in the entity.
   */
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

  /**
   * Remove all components from an entity.
   * @param {string} entityId - The ID of an entity.
   * @return {boolean} A boolean value which will be true if the entity exists.
   */
  removeAllComponents(entityId) {
    if(this.store.hasOwnProperty(entityId)) {
      let entity = this.store[entityId];
      entity.removeAllComponents();
      return true;
    }
    return false;
  }

  /**
   * Get an entity by its tag name.
   * @param {string} tag - The tag name of an entity.
   * @return {[]Entity} An array of entities whose tag name matches the param.
   */
  getEntitiesByTag(tag) {
    let entities = [];
    for(let i = 0; i < this.store.length; i++) {
      if(this.store[i].tag === 'tag') {
        entities.push(this.store[i]);
      }
    }
    return entities;
  }

  /**
   * Get all entities in a group.
   * @param {string} group - The groups name.
   * @return {[]Entity} An array of entities belonging to the group.
   */
  getEntitiesByGroup(group) {
    if(this.groups.hasOwnProperty(group)) {
      return this.groups[group];
    }
    return [];
  }

  /**
   * Check to see if an entity resides in a group.
   * @param {string} entityId - The ID of an entity.
   * @param {string} group - The group name.
   * @return {boolean} The boolean value which will be true if the entity is in the group.
   */
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

  /**
   * Removes an entity from the store.
   * @param {string} entityId - The ID of an entity.
   * @return {boolean} A boolean value which will be true if the entity was successfully removed.
   */
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

  /**
   * Removes all entities from the store.
   */
  removeAllEntities() {
    for(let i = 0; i < this.store.length; i++) {
      this.removeAllComponents(this.store[i].id);
    }

    this.components = {};
    this.groups = {};
    this.store = {};
  }

  /**
   * Adds a click event onto an entity.
   * @param {string} entityId - The ID of an entity.
   * @param {function} handler - A callback function to handle the event when caught.
   */
  onClick(entityId, handler) {
    this.play.dispatch.on('click', handler, entityId);
  }
}
