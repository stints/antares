class Input {
  constructor() {
    this.actions = {}
  }

  addAction(key, handler) {
    this.actions[key] = {'fired': false, 'handler': handler};
  }
}

class KeyInput {
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
