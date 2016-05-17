class Camera {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.x = 0;
    thix.y = 0;

    this._follow = null;
  }

  get follow() {
    return this._follow;
  }

  set follow(entity) {
    this._follow = entity;
  }
}
