import { IPlayer, IProjectTile } from "./interface/Player";

import express, { Express } from "express";
const app: Express = express();

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

import path from "path";
const dirname = path.resolve();

//socket.io setup
import http from "http";
const server = http.createServer(app);
import { Server, Socket } from "socket.io";
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 });

app.use(express.static("public"));
console.log(dirname);
app.get("/", (req, res) => {
  res.sendFile(dirname + "/public/index.html");
});

const players: Record<string, IPlayer> = {}; //backend players object
const projectTiles: Record<number, IProjectTile> = {};

let projectTilesId = 0;

const SPEED: number = 10;
const INTERVAL = 15;

io.on("connection", (socket) => {
  console.log("a user connected");
  players[socket.id] = {
    x: 500 * Math.random(),
    y: 500 * Math.random(),
    color: `hsl(${360 * Math.random()},100%,50%)`,
    sequenceNumber: 0,
  };
  // sending to frontend
  io.emit("updatePlayers", players);

  //get canvas
  socket.on("initCanvas", ({ width, height }) => {
    players[socket.id].canvas = {
      width,
      height,
    };
  });

  //get shoot
  socket.on("shoot", ({ x, y, angle }) => {
    projectTilesId++;

    const velocity = {
      x: Math.cos(angle) * 5,
      y: Math.sin(angle) * 5,
    };

    projectTiles[projectTilesId] = {
      x,
      y,
      velocity,
      playerId: socket.id,
    };
  });

  console.log("sending this objects to the frontend ", players);

  socket.on("disconnect", (reason) => {
    console.log("user disconnected ", reason);

    delete players[socket.id];
    io.emit("updatePlayers", players);
  });

  //coming from frontend
  socket.on("keydown", ({ keycode, sequenceNumber }) => {
    players[socket.id].sequenceNumber = sequenceNumber;

    switch (keycode) {
      case "KeyW":
        players[socket.id].y -= SPEED;
        break;
      case "KeyA":
        players[socket.id].x -= SPEED;
        break;
      case "KeyS":
        players[socket.id].y += SPEED;
        break;
      case "KeyD":
        players[socket.id].x += SPEED;
        break;
    }
  });
});

setInterval(() => {
  // update projectTile Position
  for (const id in projectTiles) {
    projectTiles[id].x += projectTiles[id].velocity.x;
    projectTiles[id].y += projectTiles[id].velocity.y;
  }

  io.emit("updateProjectTiles", projectTiles); //update projectTiles

  io.emit("updatePlayers", players); //update players
}, INTERVAL);

server.listen(port, () => {
  console.log(`express serve is live on http://localhost:${port}`);
});
