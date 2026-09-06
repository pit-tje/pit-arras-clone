export class Vector {
  constructor(x,y) {
    this.x = x
    this.y = y
  }
  null() {
    this.x = 0
    this.y = 0
  }
}

export class Entity {
  constructor(x, y, radius, speed, owner) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = new Vector(0,0);
    this.acceleration = new Vector(0,0);
    this.speed = speed;
    this.owner = owner;
    this.barrel = [];
    this.isPlayer = true;
  }
}