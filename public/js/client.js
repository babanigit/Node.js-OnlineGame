const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const socket = io();

const scoreEl = document.querySelector("#scoreEl");

const devicePixelRatio = window.devicePixelRatio || 1;
canvas.width = innerWidth * devicePixelRatio;
canvas.height = innerHeight * devicePixelRatio;

const x = canvas.width / 2;
const y = canvas.height / 2;

// const player = new Player(x, y, 10, "white");
const frontEndPlayers = {}; // frontend players object

socket.on("updatePlayers", (backEndPlayers) => {
  //add the backend players into frontend players object
  for (const id in backEndPlayers) {
    const backEndPlayer = backEndPlayers[id];

    if (!frontEndPlayers[id]) {
      frontEndPlayers[id] = new Player({
        x: backEndPlayer.x,
        y: backEndPlayer.y,
        radius: 10,
        color: backEndPlayer.color,
      });
    } else {
      //if player exists
      frontEndPlayers[id].x = backEndPlayer.x;
      frontEndPlayers[id].y = backEndPlayer.y;
    }
  }

  //deleting frontendPlayer with comparing to backendPlayers
  for (const id in frontEndPlayers) {
    if (!backEndPlayers[id]) {
      delete frontEndPlayers[id];
    }
  }

  console.log("the Players in the frontend is ", frontEndPlayers);
});

let animationId;
let score = 0;
function animate() {
  animationId = requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  // drawing the players
  for (const id in frontEndPlayers) {
    const frontendPlayer = frontEndPlayers[id];
    frontendPlayer.draw();
  }
}

animate();

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const SPEED= 30
setInterval(() => {
  if (keys.w.pressed) {
    frontEndPlayers[socket.id].y -= SPEED;
    socket.emit("keydown", "KeyW");
    keys.w.pressed=false;
  }
  if (keys.a.pressed) {
    frontEndPlayers[socket.id].x -= SPEED;
    socket.emit("keydown", "KeyA");
    keys.a.pressed=false;

  }
  if (keys.s.pressed) {
    frontEndPlayers[socket.id].y += SPEED;
    socket.emit("keydown", "KeyS");
    keys.s.pressed=false;
  }
  if (keys.d.pressed) {
    frontEndPlayers[socket.id].x += SPEED;
    socket.emit("keydown", "KeyD");
    keys.d.pressed=false;

  }
}, 15);

window.addEventListener("keydown", (event) => {
  if (!frontEndPlayers[socket.id]) return;

  switch (event.code) {
    case "KeyW":
      keys.w.pressed = true;
      break;
    case "KeyA":
      keys.a.pressed = true;
      break;
    case "KeyS":
      keys.s.pressed = true;
      break;
    case "KeyD":
      keys.d.pressed = true;
      break;
  }
  
});
