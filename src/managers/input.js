class InputManager extends Manager {
  constructor(eventManager, canvasManager, entityManager) {
    super();
    this.eventManager = eventManager;
    this.canvasManager = canvasManager;
    this.entityManager = entityManager;

    this.movement = {
      'north': null,
      'south': null,
      'east': null,
      'west': null,
      'northeast': null,
      'northwest': null,
      'southeast': null,
      'southwest': null
    }
  }

  registerMovement(direction, key, canvas, entityId, velocityScale, zeroVelocityOnKeyup = true) {
    if(this.movement.hasOwnProperty(direction)) {
      let keyObj = {
        'canvas': this.canvasManager.canvas('canvas'),
        'entity': this.entityManager.getEntity(entityId),
        'velocityScale': velocityScale,
        'zeroVelocityOnKeyup': zeroVelocityOnKeyup
      };
      this.movement[directions] = keyObj;
    } else {
      throw new Error('Direction must be cardinal and their intermediate directions')
    }
  }
}
