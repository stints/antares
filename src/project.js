/**
 * The main object used in creating a game.
 */
class Project {
  /**
   * Creates a Project object.
   * @param {string} name - The name of the project.
   */
  constructor(name) {
    this._name = name;
    this._plays = {};
    this.dispatch = null;
    this.currentPlay = null;
  }

  /**
   * Create a new play that will be a top level play object.
   * @param {string} name - The name of the play.
   * @return {Play} The newly created Play object.
   */
  play(name) {
    let play = new Play(name);
    play.project = this;

    this._plays[name] = play;
    return play;
  }

  //TODO: finish...
  playbook(name) {
    if(this._plays.hasOwnProperty(name)) {
      this.currentPlay = this._plays[name];
    }
  }
}
