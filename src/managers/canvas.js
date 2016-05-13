class CanvasManager extends Manager {
  constructor(eventManager) {
    super();
    this._eventManager = eventManager;
    this._canvases = {};
  }

  create(name, width, height, top, left, cursor = 'none', domTag = 'body') {
    let zIndex = Object.keys(this._canvases).length;
    let canvas = document.createElement('canvas');
    let parent = document.getElementsByTagName(domTag)[0];

    canvas.width = width;
    canvas.height = height;
    canvas.id = name;

    canvas.style.zIndex = zIndex;
    canvas.style.display = 'block';
    canvas.style.cursor = cursor;
    canvas.style.position = 'absolute';
    canvas.style.top = top;
    canvas.style.left = left;

    this._canvases[name] = {
      'width': width,
      'height': height,
      'canvas': canvas,
      'ctx': canvas.getContext('2d'),
    };

    parent.appendChild(canvas);
  }

  canvas(name) {
    if(this._canvases.hasOwnProperty(name)) {
      return this._canvases[name].canvas;
    }
    return null;
  }

  ctx(name) {
    if(this._canvases.hasOwnProperty(name)) {
      return this._canvases[name].ctx;
    }
    return null;
  }

  width(name) {
    if(this._canvases.hasOwnProperty(name)) {
      return this._canvases[name].width;
    }
    return -1;
  }

  height(name) {
    if(this._canvases.hasOwnProperty(name)) {
      return this._canvases[name].height;
    }
    return -1;
  }

  toggle(name) {
    if(this._canvases.hasOwnProperty(name)) {
      if(this._canvases[name].canvas.style.display === 'none') {
        this.show(name);
      } else {
        this.hide(name);
      }
    }
    return;
  }

  show(name) {
    if(this._canvases.hasOwnProperty(name)) {
      this._canvases[name].canvas.style.display = 'block';
    }
    return;
  }

  hide(name) {
    if(this._canvases.hasOwnProperty(name)) {
      this._canvases[name].canvas.style.display = 'none';
    }
    return;
  }
}
