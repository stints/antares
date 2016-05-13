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
