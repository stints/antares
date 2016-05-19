class Play {
  constructor(name) {
    this._name = name;
    this._project = null;
    this._parent = null;
    this._plays = {};

    this.canvas = new CanvasStore();
    this.canvas.play = this;
    this.entities = new EntityStore();
    this.entities.play = this;
  }

  get project() {
    return this._project;
  }

  set project(project) {
    this._project = project;
    this.canvas.project = project;
  }

  get parent() {
    return this._parent;
  }

  set parent(parent) {
    this._parent = parent;
  }

  play(name) {
    let play = new Play(name);
    play.project = this._project;
    play.parent = this;

    this._plays[name] = play;
    return play;
  }
}
