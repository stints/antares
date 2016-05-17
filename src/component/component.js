/**
 * Base class for all components.
 */
class Component {
  /**
   * Returns the objects `class` name while removing the word component.
   * @return {string} The name of the subclass.
   */
  name() {
    return this.constructor.name.toLowerCase().replace('component','');
  }
}
