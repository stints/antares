/**
 * Class to help facilitate message dispatching.
 */
class Dispatch {
  /**
   * Creates a new dispatcher.
   */
  constructor() {
    this.store = {};
  }

  /**
   * Adds a new listener to the dispatcher.
   * @param {string} type - The type of message/event to listen for.
   * @param {function} callback - A function to call when a message has been received.
   */
  on(type, callback) {
    this.store[type] = this.store[type] || [];
    this.store[type].push(callback);
  }

  /**
   * Fires a message event.
   * @param {string} type - The type of event being fired.
   * @param {[]objects} args - Any additional info to include in the callback.
   */
  emit(type, ...args) {
    if(this.store.hasOwnProperty(type)) {
      let listeners = this.store[type];
      for(let i = 0; i < listeners.length; i++) {
        listeners[i](...args);
      }
    }
  }
}
