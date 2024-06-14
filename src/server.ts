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
const io = new Server(server,{ pingInterval: 2000, pingTimeout: 5000});

app.use(express.static("public"));

console.log(dirname);

app.get("/", (req, res) => {
  res.sendFile(dirname + "/public/index.html");
});

const players: Record<string, IPlayer> = {} //backend players object

io.on('connection', (socket) => {
  console.log("a user connected");
  players[socket.id] = {
    x: 500 * Math.random(),
    y: 500 * Math.random()
    
  }
  // sending to frontend
  io.emit('updatePlayers', players)
  console.log("sending this objects to the frontend ", players)

  socket.on("disconnect", (reason) => {
    console.log("user disconnected ",reason);

    delete players[socket.id]
    io.emit('updatePlayers', players)

  });

});

server.listen(port, () => {
  console.log(`express serve is live on http://localhost:${port}`);
});

