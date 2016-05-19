class Project {
  constructor(name) {
    this._name = name;
    this._plays = {};
    this.dispatch = null;
    this.currentPlay = null;
  }

  play(name) {
    let play = new Play(name);
    play.project = this;

    this._plays[name] = play;
    return play;
  }

  playbook(name) {
    if(this._plays.hasOwnProperty(name)) {
      this.currentPlay = this._plays[name];
    }
  }
}
