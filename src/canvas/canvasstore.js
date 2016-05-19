class CanvasStore {
  constructor() {
    this.canvases = {};
    this.project = null;
    this.play = null;
  }

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
        this.project.dispatch.emit('click', null, entityId);
      }
    }
  }

  onKeyDown(e) {
    let code = e.code;
    if(this.play.inputs.actions.hasOwnProperty(code)) {
      if(!this.play.inputs.actions[code].fired) {
        this.project.inputs.actions[code].fired = true;
        this.project.inputs.actions[code].handler();
      }
    }
  }

  onKeyUp(e) {
    let code = e.code;
    if(this.play.inputs.actions.hasOwnProperty(code)) {
      if(this.play.inputs.actions[code].fired) {
        this.project.inputs.actions[code].fired = false;
      }
    }
  }
}
