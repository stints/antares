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
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
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
    let sin = Math.sin(rad);
    let cos = Math.cos(rad);
    let x = this.x * cos - this.y * sin;
    let y = this.x * sin + this.y * cos;

    return new Vector(x, y);
  }

  scale(factor) {
    let x = this.x * factor;
    let y = this.y * factor;

    return new Vector(x, y);
  }
}
