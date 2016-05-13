class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    let x = this.x + vector.x;
    let y = this.y + vector.y;

    return new Vector(x, y);
  }

  sub(vector) {
    let x = this.x - vector.x;
    let y = this.y - vector.y;

    return new Vector(x, y);
  }

  length() {
    return this._round(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)), 6);
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  angle(vector) {
    return Math.acos(this.dot(vector) / this.length() * vector.length());
  }

  cross(vector) {
    return this.x * vector.y - this.y * vector.x;
  }

  normalize() {
    let length = this.length();
    let x = this.x / length;
    let y = this.y / length;

    return new Vector(x, y);
  }

  rotate(rad) {
    let sin = this._round(Math.sin(rad), 10);
    let cos = this._round(Math.cos(rad), 10);
    let x = this.x * cos - this.y * sin;
    let y = this.x * sin + this.y * cos;

    return new Vector(x, y);
  }

  scale(factor) {
    let x = this.x * factor;
    let y = this.y * factor;

    return new Vector(x, y);
  }

  _round(value, amount = 6) {
    let d = Math.pow(10, amount);
    let s = 1/(d*10);
    return Math.round((value + s) * d) / d
  }
}
