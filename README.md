# Antares ECS

A simple ECS library written in ES6 javascript.  Only works with Chrome v.50+.

### Systems
Systems must declare either an update or render method.  Failure will result in an error.
The library uses a dynamic fixed timestep to update and render your game.
All systems must a subclass of System.
```javascript
class RenderSystem extends System {
  render() {
    // Your update and render methods has access to the System entities property.
    // This array is filled with the entities your system defined when
    // registering to the SystemManager.
    console.log(this.entities);

    // render logic goes here
  }
}

class CollisionSystem extends System {
  update() {
    console.log(this.entities);

    // collision logic goes here
  }
}

// Registering your system with the SystemManager sets everything up to allow your update method to function correctly.
// The additional arguments are the components your system requires to function.
// These arguments allow your system to know which entities to include in the entities property.
managers.system.register(new RenderSystem()
  'render',
  'position'
)

// Once the game is ready, you can loop over each systems update method.
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
    super(); // must be called to have access to 'this'
    this.x = x;
    this.y = y;
  }
}
```

### Entities
Entities are your game objects that live in the game.
Entities are not handled directly except in your system update methods. They are created and modified via the EntityManager.
```javascript
// Creating an entity is easy! The method returns the newly created entities unique ID.
// The group name is required.  The tag is optional.
entityId = managers.entity.create('required-group-name', 'optional-tag');

// To add components to your entity, pass the unique ID of your entity and the components you wish to add.
managers.entity.addComponent(entityId,
  new PositionComponent(1, 1),
  new VelocityComponent(),
  new RenderComponent()
);
```
---
### Order
There is a required order for the library to function correctly.
All systems must be registered with the SystemManager before adding any components to your entities via the EntityManager.
When you register your system and it's required components, the Manager adds an event listener for the event 'addComponent'.
This event is fired when an entity adds a new component(s).

Please review the example.html to better understand the order.
