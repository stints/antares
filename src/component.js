class Component {
  name() {
    return this.constructor.name.toLowerCase().replace('component','');
  }
}
