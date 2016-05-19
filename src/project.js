class Project {
  constructor(name) {
    this._name = name;
    this._plays = {};
    this.dispatch = null;
  }

  play(name) {
    let play = new Play(name);
    play.project = this;

    this._plays[name] = play;
    return play;
  }
}
