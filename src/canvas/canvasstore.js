/**
 * A container class to hold all canvases in a Play.
 */
class CanvasStore {
  /**
   * Creates a new store.
   */
  constructor() {
    this.canvases = {};
    this.play = null;
  }

  /**
   * Creates a new canvas and appends it to the DOM.
   * @param {string} name - The name of the canvas.  Will use as the ID of the DOM element.
   * @param {number} width - The width of the canvas.
   * @param {number} height - The height of the canvas.
   * @param {string} domElement - The DOM element the canvas should append to.
   * @return {CanvasDOMElement} The newly created canvas element.
   */
  create(name, width, height, domElement) {
    let canvas = document.createElement('canvas');
    let element = document.getElementsByTagName(domElement)[0];

    canvas.width = width;
    canvas.height = height;
    canvas.tabIndex = 0;
    element.appendChild(canvas);

    this.canvases[name] = canvas;

    canvas.onclick = (e) => this.onClick(e);
    canvas.onkeydown = (e) => this.onKeyDown(e);
    canvas.onkeyup = (e) => this.onKeyUp(e);

    return canvas;
  }

  /**
   * Get the canvas by name.
   * @param {string} name - The name of the canvas to return.
   * @return {CanvasDOMElement} The canvas DOM element requested.
   */
  get(name) {
    return this.canvases[name]
  }

  /**
   * The Click event listener for the canvases.
   * @param {ClickEvent} e - The click event data.
   */
  onClick(e) {
    if(this.play.entities.hasComponents('position')) {
      let entities = this.play.entities.components.position;
      let entityId = null;
      let clickX = e.offsetX;
      let clickY = e.offsetY;
      for(let i = 0; i < entities.length; i++) {
        let entity = entities[i];
        let entityX = entity.position.current.x;
        let entityY = entity.position.current.y;
        let entityWidth = entity.size.width;
        let entityHeight = entity.size.height;
        if(entityX < clickX && entityX + entityWidth > clickX && entityY < clickY && entityY + entityHeight > clickY) {
          entityId = entity.id;
          break;
        }
      }
      if(entityId) {
        this.play.dispatch.emit('click', null, entityId);
      }
    }
  }

  /**
   * The Key Down event listener for the canvas.
   * @param {KeyEvent} e - The Key event.
   */
  onKeyDown(e) {
    let code = e.code;
    if(this.play.inputs.store.hasOwnProperty(code)) {
      let item = this.play.inputs.store[code];
      if(item.type === 'action' && !item.seen) {
        item.value = true;
      }
      if(item.type === 'state') {
        item.value = true;
      }
    }
  }

  /**
   * The Key Up event listener for the canvas.
   * @param {KeyEvent} e - The Key event.
   */
  onKeyUp(e) {
    let code = e.code;
    if(this.play.inputs.store.hasOwnProperty(code)) {
      let item = this.play.inputs.store[code];
      if(item.type === 'action') {
        item.seen = false;
      }
      item.value = false;
    }
  }
}
