class DynamicSystem extends RenderSystem {
  render(dt) {
    for(let i = 0; i < this.entities.length; i++) {
      let entity = this.entities[i];
      let ctx = managers.canvas.ctx(entity.render.canvas);
      let x = null;
      let y = null;

      if(entity.position.past) {
        x = (entity.position.current.x - entity.position.past.x) * dt + entity.position.past.x;
        y = (entity.position.current.y - entity.position.past.y) * dt + entity.position.past.y;
      } else {
        x = entity.position.current.x;
        y = entity.position.current.y;
      }

      ctx.save();

      if(entity.hasOwnProperty('rect')) {
        let width = entity.rect.width;
        let height = entity.rect.height;
        ctx.clearRect(entity.position._renderedPast.x, entity.position._renderedPast.y, width, height);

        if(entity.rect.stroke && entity.hasOwnProperty('border')) {
          ctx.strokeStyle = entity.border.color;
          ctx.lineWidth = entity.border.width;
        }
        if(entity.rect.fill && entity.hasOwnProperty('color')) {
          ctx.fillStyle = entity.color.color;
        }

        ctx.translate(x + width / 2, y + height / 2);
        ctx.beginPath();
        ctx.rect(-width / 2, -height / 2, width, height);

        if(entity.rect.stroke && entity.hasOwnProperty('border')) {
          ctx.stroke();
        }
        if(entity.rect.fill && entity.hasOwnProperty('color')) {
          ctx.fill();
        }

      } else if(entity.hasOwnProperty('circle')) {
        let radius = entity.circle.radius;
        ctx.clearRect(entity.position._renderedPast.x - radius, entity.position.past.y - radius, radius * 2, radius * 2);

        if(entity.circle.stroke && entity.hasOwnProperty('border')) {
          ctx.strokeStyle = entity.border.color;
          ctx.lineWidth = entity.border.width;
        }
        if(entity.circle.fill && entity.hasOwnProperty('color')) {
          ctx.fillStyle = entity.color.color;
        }

        ctx.translate(x, y);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);

        if(entity.circle.stroke && entity.hasOwnProperty('border')) {
          ctx.stroke();
        }
        if(entity.circle.fill && entity.hasOwnProperty('color')) {
          ctx.fill();
        }

      } else {
        console.log('Entity without shape');
        console.log(entity);
      }

      entity.position._renderedPast = new Vector(x, y);

      ctx.restore();
    }
  }
}
