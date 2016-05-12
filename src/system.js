class System {
  constructor(canvasManager, entityManager, eventManager) {
    this._canvasManager = canvasManager;
    this._entityManager = entityManager;
    this._eventManager = eventManager;
  }

  function update() {
    throw new Error('function update() must be implemented by subclass.');
  }
}
