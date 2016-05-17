// create game project
pong = new Antares().createProject('pong');

// create the game world
arena = pong.worlds.create('arena', 1000, 600);

// set up required systems
arena.systems.load('position', 'dynamic', 'static', 'text', 'collision', 'input');

// load a custom system
arena.systems.register(new ScoringSystem(), 'position');

// set up camera
arenaCamera = arena.camera.create(500, 500);

// create entities in world
ball = arena.entities.create('balls', 'ball1',
  new PositionComponent(new Vector(arena.width/2, arena.height/2))
);
// etc...

// register players to input
arena.input.register(player1, 30, false, 'north', 'south');
arena.input.register(player2, 30, false, 'north', 'south');

// set camera to follow ball
arenaCamera.follow(ball, arenaCamera.width / 2, arenaCamera.height / 2);

// set up events for scoring and changing text
arena.events.on('playerScore', function(entity) {
  // update player score text
  // set ball to center
  // check for winner
});

// set up events for winner
arena.events.on('playerWin', function(entity) {
  // display winner via new text entity
});

pong.play(arena);

---------------------

breakout = new Antares().createProject('breakout');
levels = breakout.worlds.load('levels.json');
