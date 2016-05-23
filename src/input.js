/**
 * Input registration class.
 */
class Input {
  /**
   * Creates a new Input object.
   */
  constructor() {
    this.store = {};
    this.play = null;
  }

  /**
   * Creates a new action input type.  Actions are only true the first time viewed.  Afterwards, they'll return false until the key is pressed again.
   * @param {KeyInput} input - The key being registered as an action.
   */
  action(input, entity = null) {
    this._set(input, entity, 'action');
  }

  /**
   * Creates a new state input type.  States are only true while the key is being pressed.
   * @param {KeyInput} input - The key being registered as an action.
   */
  state(input, entity = null) {
    this._set(input, entity, 'state');
  }

  /**
   * Private method to help register the action and state inputs.
   * @param {KeyInput} input - The key being registered.
   * @param {string} type - The type of input being regiestered.
   */
  _set(input, entity, type) {
    let item = {};
    item.type = type;
    item.value = false;
    item.seen = false;
    item.entity = entity != null ? this.play.entities.get(entity) : null;
    this.store[input] = item;
  }

  /**
   * Gets the correct value of the input.
   * @param {KeyInput} input - The key to check the value of.
   * @return {boolean} The value of the action or state of the key.
   */
  get(input) {
    if(this.store.hasOwnProperty(input)) {
      let item = this.store[input];
      if(item.type === 'action') {
        if(item.value && !item.seen) {
          item.seen = true;
          return true;
        } else {
          return false;
        }
      }
      if(item.type === 'state') {
        return item.value;
      }
    }
    return false;
  }

  entity(input) {
    if(this.store.hasOwnProperty(input)) {
      return this.store[input].entity;
    }
    return null;
  }
}

/**
 * A collection of key mappings.
 */
class KeyInput {
  /**
   * Create a new KeyInput object.
   */
  constructor() {
    this.A  = 'KeyA';
    this.B  = 'KeyB';
    this.C  = 'KeyC';
    this.D  = 'KeyD';
    this.E  = 'KeyE';
    this.F  = 'KeyF';
    this.G  = 'KeyG';
    this.H  = 'KeyH';
    this.I  = 'KeyI';
    this.J  = 'KeyJ';
    this.K  = 'KeyK';
    this.L  = 'KeyL';
    this.M  = 'KeyM';
    this.N  = 'KeyN';
    this.O  = 'KeyO';
    this.P  = 'KeyP';
    this.Q  = 'KeyQ';
    this.R  = 'KeyR';
    this.S  = 'KeyS';
    this.T  = 'KeyT';
    this.U  = 'KeyU';
    this.V  = 'KeyV';
    this.W  = 'KeyW';
    this.X  = 'KeyX';
    this.Y  = 'KeyY';
    this.Z  = 'KeyZ';
    this.ONE  = 'Digit1';
    this.TWO  = 'Digit2';
    this.THREE  = 'Digit3';
    this.FOUR  = 'Digit4';
    this.FIVE  = 'Digit5';
    this.SIX  = 'Digit6';
    this.SEVEN  = 'Digit7';
    this.EIGHT  = 'Digit8';
    this.NINE  = 'Digit9';
    this.ZERO  = 'Digit0';
    this.LSHIFT  = 'ShiftLeft';
    this.RSHIFT = 'ShiftRight';
    this.SPACE  = 'Space';
    this.ENTER  = 'Enter';
    this.ESCAPE = 'Escape';
    this.TAB = 'Tab';
    this.BACK = 'Backspace';
    this.UP  = 'ArrowUp';
    this.DOWN  = 'ArrowDown';
    this.LEFT  = 'ArrowLeft';
    this.RIGHT  = 'ArrowRight';
  }
}
