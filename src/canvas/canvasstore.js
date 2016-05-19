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
    element.appendChild(canvas);

    this.canvases[name] = canvas;

    canvas.onclick = (e) => this.onClick(e);

    return canvas;
  }

  onClick(e) {
    if(this.play.entities.components.hasOwnProperty('position')) {
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
}
