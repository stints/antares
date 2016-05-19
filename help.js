// Create a new game project, passing the projects name.
// In this example, we'll create a turn based RPG
project = Antares.createproject('Turn based RPG Project');

// A project is broken up into plays.  These handle the different game states.
// In this example, our RPG has 3 main plays.
// startmenu will handle the start menu state
// Game will handle the game play state
// Credits will handle the credits state
startmenu = project.play('startmenu');
game = project.play('game');
credits = project.play('credits');

// Each play can hold subplays.  These are plays can inherit systems and entities from their parents.
// World handles the state when the player is walking around in the world.
// Gamemenu handles the state when a player brings up the menu during the game.
// battle handles the state when the player starts a fight with an enemy.
// Any entities created in the game state are shared with it's subplays.  However, the reverse is not allowed.
// Any entities created in the subplay will be not available to the upper play.
world = game.play('world');
gamemenu = game.play('gamemenu');
battle = game.play('battle');

//A play also handles its own canvas or canvases.
startMenuCanvas = startmenu.canvas.create('startmenucanvas', 800, 600, 'body');

// Each play has its own entitystore and systemstore.
startBtn = startmenu.entities.create('buttons', 'start game');
startmenu.entities.addComponent(startBtn, new PositionComponent(new Vector(300, 300)), new RenderComponent(startMenuCanvas));

// Events can be added to entities.
startmenu.entities.onClick(startBtn, function() {
  // When the button has been clicked, start the game by moving to the Game state.
  project.playbook('game');
});

// Events can also be added to plays.
world.onKeyAction(Antares.keys.I, function() {
  if(!project.activeplay != 'game.gamemenu')
    project.playbook('game.gamemenu');
  else
    project.playbook('game.world');
});
