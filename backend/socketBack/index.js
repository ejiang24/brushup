const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

var players = [];
var playersReady = 0;
var rooms = [];
var currQuiz = [];

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3233",
    //origin: "http://localhost:5174/", //this is the origin that works for caroline lol
    origin: "http://127.0.0.1:5173", //front end
    // origin: "http://localhost:5173",
    //what methods are we requesting?
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  //todo: differentiate between create and join
  socket.on("create_room", (code, name, quiz) => {
    socket.join(code); //joins socket id (player) to the room

    players.push(name); //adds to player
    if (rooms.indexOf(code) === -1) {
      //check if room code is unique
      rooms.push(code);
    } else {
      console.log("somehow randomly generated room code that already exists");
    }

    currQuiz = quiz;
    console.log("create room, quiz: " + currQuiz);
    console.log("create room, first question: " + currQuiz.questions[0]);

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
    console.log("players ready: " + playersReady);
    if (playersReady === players.length) {
      console.log("everyone ready!");
      playersReady = 0; //reset player ready
      console.log("question: " + currQuiz.questions[0]);
      io.in(code).emit("start_game", currQuiz.questions[0]); //todo: fix lmfao
    }
  });

  socket.on("player_answer", (code, question) => {
    //prob something that denotes if it's correct or not
    //which means answer data should store the number question and the number answer (0-3)

    playersReady += 1;
    console.log("players ready to move on to next question: " + playersReady);
    console.log("this player answered: " + question);
    if (playersReady === players.length) {
      console.log("everyone ready!");
      playersReady = 0;
      io.in(code).emit("all_answered", code); //todo: fix lmfao
    }
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
