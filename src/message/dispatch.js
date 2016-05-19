/**
 * Class to help facilitate message dispatching.
 */
class Dispatch {
  /**
   * Creates a new dispatcher.
   */
  constructor() {
    this.store = {};
    this.entityMessages = {};
  }

  /**
   * Adds a new listener to the dispatcher.
   * @param {string} type - The type of message/event to listen for.
   * @param {function} handler - A function to call when a message has been received.
   * @param {string} entityId - The ID of an entity which allows only this callback to fire when this entity emits the message.
   */
  on(type, handler, entityId = null) {
    if(!entityId) {
      this.store[type] = this.store[type] || [];
      this.store[type].push(handler);
    } else {
      this.entityMessages[entityId] = this.entityMessages[entityId] || {};
      this.entityMessages[entityId][type] = handler;
    }
  }

  /**
   * Fires a message event.
   * @param {string} type - The type of event being fired.
   * @param {object} args - Any additional info to include in the callback.
   * @param {string} entityId - The ID of an entity which has sent the event.
   */
  emit(type, args = null, entityId = null) {
    if(!entityId) {
      if(this.store.hasOwnProperty(type)) {
        let listeners = this.store[type];
        for(let i = 0; i < listeners.length; i++) {
          listeners[i](args);
        }
      }
    } else {
      if(this.entityMessages.hasOwnProperty(entityId) && this.entityMessages[entityId].hasOwnProperty(type)) {
        this.entityMessages[entityId][type](args);
      }
    }
  }
}
