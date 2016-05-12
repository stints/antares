# Antares ECS

A simple ECS library for javascript written in ES6.  Only works with chrome v.50+.

### Systems
Systems and their update method handle the logic that modifies and uses your entities components.
All systems must be subclassed with the System class.
```javascript
class RenderSystem extends System {
  update() {
    // your update method has access to the parent entities properties.
    // this array is filled with the entities your system defined when
    // registering your system with the SystemManager
    console.log(this.entities);

    // render logic would go here
  }
}

// registering your system with the SystemManager sets everything up, allowing the entities property to be filled.
// The additional arguments after the system are the components your system requires to function.
// This allows your system to know which entities to include in the entities property
managers.system.register(new RenderSystem()
  'render',
  'position'
)

// once you're ready to start your game, you can loop over each systems update method
function gameLoop() { // simple game loop
  while(true) {
    managers.system.updateLoop();
  }
}
```

### Components
Components hold your entities data.
All components must be subclass the Component class.
```javascript
class PositionComponent extends Component {
  constructor(x, y) {
    super(); // must be called to access 'this'
    this.x = x;
    this.y = y;
  }
}
```

### Entities
Entities are you game objects.
Entities are not handled directly except in your system update methods. They are created and modified via the EntityManager.
```javascript
// EntityManager.create will create your entity, returning its unique ID
// The group name is required.  The tag is optional.
entityId = managers.entity.create('required-group-name', 'optional-tag');

// To add components to your entity, pass the id of your entity and the components you wish to add.
managers.addComponent(entityId,
  new PositionComponent(1, 1),
  new VelocityComponent(),
  new RenderComponent()
);
```
---
### Order
There is a required order for the library to function correctly.  This is due to how the custom event manager works currently.
All systems must be registered with the manager before adding any components to your entities.  Failure to do so will cause your system to miss some entities during update.
