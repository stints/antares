class Dispatch {
  constructor() {
    this.store = {};
  }

  on(type, callback) {
    this.store[type] = this.store[type] || [];
    this.store[type].push(callback);
  }

  emit(type, ...args) {
    if(this.store.hasOwnProperty(type)) {
      let listeners = this.store[type];
      for(let i = 0; i < listeners.length; i++) {
        listeners[i](...args);
      }
    }
  }
}
