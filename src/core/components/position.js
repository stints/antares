class PositionComponent extends Position {
  constructor(position) {
    super();
    this.current = position;
    this.past = position;

    // Where was this actually rendered?
    this._renderedPast = position;
  }
}
