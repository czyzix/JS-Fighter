const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const gravity = 0.2;

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
  }

  drawSprite() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  updatePosition() {
    this.drawSprite();
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
});

const enemy = new Sprite({
  position: {
    x: 974,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
});

// creating infinite loop to enable animating
function worldAnimation() {
  window.requestAnimationFrame(worldAnimation);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.updatePosition();
  enemy.updatePosition();
}

worldAnimation();
