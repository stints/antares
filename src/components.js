/*
  Parent class for all components
  All components must be a subclass of this
*/
class Component {

  // Helper method to remove `component` from class name
  name() {
    return this.constructor.name.toLowerCase().replace('component','');
  }
}
