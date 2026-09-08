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
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = new Vector(0,0);
    this.acceleration = new Vector(0,0);
    this.isPlayer = false;
  }
}

export class Player extends Entity {
  constructor( x , y , radius, owner, speed) {
    super(x , y , radius);
    this.isPlayer = true;
    this.stats = {
      bulletSpeed: 20,
      speed: speed
    }
    this.barrel = []
    this.owner = owner;
/* new Barrel(barrelInfo, this) */
  }
}


export class Barrel {
  constructor(info, owner) {
    this.length = info.length
    this.width = owner.radius/4
    this.angle = 0
    this.bulletstats = {
      size: this.width,
      speed: owner.stats.bulletSpeed,
    }
    
    this.lastShot = 0

    this.cooldown = info.cooldown
      

  }
}

