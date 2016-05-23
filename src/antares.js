/**
 * Main class for the library.
 */
class AntaresECS {
  /**
   * Creates a new instance of AntaresECS.  This should never be called.
   */
  constructor() {
    this._projects = {};
    this._keys = new KeyInput();
    this.dispatch = new Dispatch();
  }

  /**
   * Getter function for the `private` variable _keys.
   * @return {KeyInput} An object that holds all key mappings.
   */
  get keys() {
    return this._keys;
  }

  /**
   * Creates a new game project.  Should be the first thing called when starting.
   * @param {string} name - The name of the project being created.
   * @return {Project} A Project object used to build your game.
   */
  createproject(name) {
    let project = new Project(name);
    project.dispatch = this.dispatch;

    this._projects[name] = project;

    return project;
  }
}

/**
 * A global variable used to start the library.  Do not create your own AntaresECS object.
 */
var Antares = new AntaresECS();
