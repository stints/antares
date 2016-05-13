class SpriteManager extends Manager {
  constructor() {
    super();
    this._sheets = {};
  }

  addSheet(name, src, tiles, width, height, x, y) {
    let img = new Image();
    this._sheets[name] = {
      'sprite': new Sprite(name, tiles, width, height, x, y, img),
      'load': false
    };
    
    img.addEventListener('load', () => this.sheetLoadListener(name));
    img.src = src;

    return;
  }

  sheetLoadListener(name) {
    this._sheets[name].load = true;
  }

  sheetsLoaded() {
    let isLoaded = true;
    let sheets = Object.keys(this._sheets);
    for(let i = 0; i < sheets.length; i++) {
      if(!this._sheets[sheets[i]].load) {
        isLoaded = false;
        break;
      }
    }
    return isLoaded;
  }


}
