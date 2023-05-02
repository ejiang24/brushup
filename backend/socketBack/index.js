const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

var players = [];
var playersReady = 0;
var rooms = [];

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3233",
    origin: "http://127.0.0.1:5173", //front end
    //what methods are we requesting?
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  //todo: differentiate between create and join
  socket.on("create_room", (code, name) => {
    socket.join(code); //joins socket id (player) to the room

    players.push(name); //adds to player
    if (rooms.indexOf(code) === -1) {
      //check if room code is unique
      rooms.push(code);
    } else {
      console.log("somehow randomly generated room code that already exists");
    }
    io.to(socket.id).emit("joined_room", players); //let other players know
  });

  socket.on("join_room", (code, name) => {
    socket.join(code); //joins socket id (player) to the room
    if (players.indexOf(name) === -1) {
      players.push(name); //adds to player
    }
    if (rooms.indexOf(code) === -1) {
      rooms.push(code);
    }
    console.log(name + " joined " + code);
    console.log(players);

    io.in(code).emit("joined_room", players); //let other players know
    //todo make sure it's to(room)
  });

  socket.on("player_ready", (code) => {
    playersReady += 1;
    if (playersReady === players.length) {
      io.in(code).emit("start_game", code); //todo: fix lmfao
    }
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
