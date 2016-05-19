class AntaresECS {
  constructor() {
    this._projects = {};
    this._keys = new KeyInput();
    this.dispatch = new Dispatch();
  }

  get keys() {
    return this._keys;
  }

  createproject(name) {
    let project = new Project(name);
    project.dispatch = this.dispatch;

    this._projects[name] = project;

    return project;
  }
}

var Antares = new AntaresECS();
