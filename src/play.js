/**
 * The play is a container for a specific area or state of your game.
 */
class Play {
  /**
   * Creates a new Play object.
   * @param {string} name - The name of the play.
   */
  constructor(name) {
    this._name = name;
    this._project = null;
    this._parent = null;
    this._plays = {};

    this.canvas = new CanvasStore();
    this.canvas.play = this;
    this.entities = new EntityStore();
    this.entities.play = this;
    this.inputs = new Input();
    this.inputs.play = this;
    this.systems = new SystemStore();
    this.systems.play = this;
    this.dispatch = new Dispatch();
  }

  /**
   * Getter method to get the parent Project object.
   * @return {Project} The project this play is part of.
   */
  get project() {
    return this._project;
  }

  /**
   * Setter method to set the parent Project object.
   * @param {Project} project - THe parent project this play belongs to.
   */
  set project(project) {
    this._project = project;
    this.canvas.project = project;
  }

  /**
   * Getter method to get the parent Play object. Set if play is a subplay.
   * @return {Play} The parent play object this subplay belongs to.
   */
  get parent() {
    return this._parent;
  }

  /**
   * Setter method to set the parent Play object.  The parent play object sets this itself.
   * @param {Play} parent - The parent play object.
   */
  set parent(parent) {
    this._parent = parent;
  }

  /**
   * Creates a subplay.
   * @param {string} name - The name of the subplay.
   * @return {Play} The newly created subplay.
   */
  play(name) {
    let play = new Play(name);
    play.project = this._project;
    play.parent = this;

    this._plays[name] = play;
    return play;
  }

  // TODO: remove?
  onActionKeys(key, handler) {
    this._project.inputs.addAction(key, handler);
  }
}
