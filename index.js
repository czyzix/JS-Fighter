//// BASIC SETUP ////
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const gravity = 0.7;
const playersJumpHeight = -20;
const playersSpeed = 5;
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey;
  }

  drawSprite() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  updatePosition() {
    this.drawSprite();
    this.position.x += this.velocity.x;
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

worldAnimation();

//// FUNCTIONS ////

// creating infinite loop to enable animating
function worldAnimation() {
  window.requestAnimationFrame(worldAnimation);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.updatePosition();
  enemy.updatePosition();

  playerMovement();
  enemyMovement();
}

function playerMovement() {
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -playersSpeed;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = playersSpeed;
  }

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "w":
        player.velocity.y = playersJumpHeight;
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
    }
  });

  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "a":
        keys.a.pressed = false;
        break;
      case "d":
        keys.d.pressed = false;
        break;
    }
  });
}

function enemyMovement() {
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -playersSpeed;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = playersSpeed;
  }

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        enemy.velocity.y = playersJumpHeight;
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
    }
  });

  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        break;
      case "ArrowRight":
        keys.ArrowRight.pressed = false;
        break;
    }
  });
}
