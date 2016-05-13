class Sprite {
  constructor(name, tiles, width, height, x, y, sheet) {
    this.name = name;
    this.tiles = tiles;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.sheet = sheet;

    this.currentTile = -1;
  }

  nextTile() {
    this.currentTile = ++this.currentTile < this.tiles ? this.currentTile : 0;

    let options = {
      'sheet': this.sheet,
      'y': this.y,
      'x': this.x + this.width * this.currentTile,
      'width': this.width,
      'height': this.height
    };

    return options;
  }
}
