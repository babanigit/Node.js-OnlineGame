const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const socket = io();

const scoreEl = document.querySelector("#scoreEl");

const devicePixelRatio= window.devicePixelRatio || 1
canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio

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
