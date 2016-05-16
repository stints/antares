class CollisionComponent extends Component {
  constructor(...collidesWith) {
    // which entities does this entity collid with?
    this.collidesWith = collidesWith;
  }
}
