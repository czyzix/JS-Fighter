const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const gravity = 0.2;

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor({ position, velocity, color, offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.color = color;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: offset,
      width: 100,
      height: 50,
    };
    this.isAttacking;
  }

  drawSprite() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // attack box
    if (this.isAttacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  updatePosition() {
    this.drawSprite();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const player1 = new Sprite({
  color: "red",
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  offset: {
    x: 0,
    y: 0,
  },
});
const player2 = new Sprite({
  color: "blue",
  position: {
    x: 974,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  offset: {
    x: -50,
    y: 0,
  },
});

// creating infinite loop to enable animating
function worldAnimation() {
  window.requestAnimationFrame(worldAnimation);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player1.updatePosition();
  player2.updatePosition();

  // players movement
  player1Movement();
  player2Movement();
}

function attackCollision({ player, enemy }) {
  return (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.x <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height
  );
}

function player1Movement() {
  player1.velocity.x = 0;
  if (keys.a.pressed && player1.lastKey === "a") {
    player1.velocity.x = -playersSpeed;
  } else if (keys.d.pressed && player1.lastKey === "d") {
    player1.velocity.x = playersSpeed;
  }

  if (
    attackCollision({ player: player1, enemy: player2 }) &&
    player1.isAttacking
  ) {
    player1.isAttacking = false;
    console.log("player1 attack");
  }

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "w":
        player1.velocity.y = playersJumpHeight;
        break;
      case "a":
        keys.a.pressed = true;
        player1.lastKey = "a";
        break;
      case "d":
        keys.d.pressed = true;
        player1.lastKey = "d";
        break;
      case "s":
        player1.attack();
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

function player2Movement() {
  player2.velocity.x = 0;
  if (keys.ArrowLeft.pressed && player2.lastKey === "ArrowLeft") {
    player2.velocity.x = -playersSpeed;
  } else if (keys.ArrowRight.pressed && player2.lastKey === "ArrowRight") {
    player2.velocity.x = playersSpeed;
  }

  if (
    attackCollision({ player: player2, enemy: player1 }) &&
    player2.isAttacking
  ) {
    player2.isAttacking = false;
    console.log("player2 attack");
  }

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        player2.velocity.y = playersJumpHeight;
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        player2.lastKey = "ArrowLeft";
        break;
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        player2.lastKey = "ArrowRight";
        break;
      case "ArrowDown":
        player2.attack();
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
