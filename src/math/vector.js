/**
 * Class representing a 2D vector.
 */
class Vector {
  /**
   * Creates a new 2D vector.
   * @param {number} x - The x position.
   * @param {number} y - The y position.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Adds another vector to this vector.
   * @param {Vector} vector - The vector to add.
   * @return {Vector} A new vector whose properties have been added.
   */
  add(vector) {
    let x = this.x + vector.x;
    let y = this.y + vector.y;

    return new Vector(x, y);
  }

  /**
   * Subtracts another vector from this vector.
   * @param {Vector} vector - The vector to subtract.
   * @return {Vector} A new vector whose properties have been subtracted.
   */
  sub(vector) {
    let x = this.x - vector.x;
    let y = this.y - vector.y;

    return new Vector(x, y);
  }

  /**
   * Find the length of the vector.
   * @return {number} The length of the vector.
   */
  length() {
    return this._round(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)), 6);
  }

  /**
   * Find the dot product of the vector.
   * @return {number} The dot product of the vector.
   */
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * Find the angle between two vectors.
   * @param {Vector} vector - The other vector.
   * @return {number} The float value of the angle between the two vectors in radians.
   */
  angle(vector) {
    return Math.acos(this.dot(vector) / this.length() * vector.length());
  }

  /**
   * Find the cross product between two vectors.
   * @param {Vector} vector - The other vector.
   * @return {number} The cross product of two vectors.
   */
  cross(vector) {
    return this.x * vector.y - this.y * vector.x;
  }

  /**
   * Normalize a vector, making it's length equal to one.
   * @return {Vector} A new vector whose length is one but has the same direction.
   */
  normalize() {
    let length = this.length();
    let x = this.x / length;
    let y = this.y / length;

    return new Vector(x, y);
  }

  /**
   * Rotates a vector.
   * @param {number} rad - The radian angle to rotate.
   * @return {Vector} The new vector which has been rotated.
   */
  rotate(rad) {
    let sin = this._round(Math.sin(rad), 10);
    let cos = this._round(Math.cos(rad), 10);
    let x = this.x * cos - this.y * sin;
    let y = this.x * sin + this.y * cos;

    return new Vector(x, y);
  }

  /**
   * Scales the vector.
   * @param {number} factor - The number to scale the vector by.
   * @return {Vector} The new vector whose properties have been scaled.
   */
  scale(factor) {
    let x = this.x * factor;
    let y = this.y * factor;

    return new Vector(x, y);
  }

  /**
   * Rounds the value to a N decimal places. Private method.
   * @param {number} value - The value to round.
   * @param {number} amount - The number of decimal places to round to.
   * @return {number} The value rounded by N decimal places.
   */
  _round(value, amount = 6) {
    let d = Math.pow(10, amount);
    let s = 1/(d*10);
    return Math.round((value + s) * d) / d
  }
}
