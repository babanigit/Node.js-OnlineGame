import { IPlayer } from "./interface/Player";


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
const io = new Server(server);

app.use(express.static("public"));

console.log(dirname);

app.get("/", (req, res) => {
  res.sendFile(dirname + "/public/index.html");
});


const players: Record<string, IPlayer> ={

}

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");

    players[socket.id]={
      x:100,
      y:100
    }

    io.emit("updatePlayers",players)

    console.log(players)

  });
});

server.listen(port, () => {
  console.log(`express serve is live on http://localhost:${port}`);
});

