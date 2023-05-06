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
var questionIndex = -1;
var playerToScore = {};
let playerToCorrect = {};
//todo: prob just make a player object that has fields that map to all the diff player things

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3233",
      origin: "http://localhost:5174", //this is the origin that works for caroline lol
    //origin: "http://127.0.0.1:5173", //front end
    //  origin: "http://localhost:5173",
    //what methods are we requesting?
    methods: ["GET", "POST"],
  },
});

//todo: handle player joining running game (gameLive boolean)

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  //todo: differentiate between create and join
  socket.on("create_room", (code, name, quiz) => {
    socket.join(code); //joins socket id (player) to the room
    console.log("create room, name: " + name);

    players.push(name); //adds to player
    if (rooms.indexOf(code) === -1) {
      //check if room code is unique
      rooms.push(code);
    } else {
      console.log("somehow randomly generated room code that already exists");
    }

    playerToScore[name] = 0;

    currQuiz = quiz;
    console.log("create room, quiz: " + currQuiz);

    io.to(socket.id).emit("joined_room", players); //let other players know
  });

  socket.on("join_room", (code, name) => {
    socket.join(code); //joins socket id (player) to the room

    //todo: error handle
    if (players.indexOf(name) === -1) {
      players.push(name); //adds to player
    }
    if (rooms.indexOf(code) === -1) {
      rooms.push(code);
    }
    playerToScore[name] = 0;
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

      //reset states
      playersReady = 0;
      playerToCorrect = {};
      questionIndex += 1;
      console.log("new question index = " + questionIndex);

      if (questionIndex >= currQuiz.questions.length) {
        console.log("game over");

        //https://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object
        const winners = Object.keys(playerToScore).filter((x) => {
          return (
            playerToScore[x] ==
            Math.max.apply(null, Object.values(playerToScore))
          );
        });

        console.log("winners: ");
        console.log(winners);

        io.in(code).emit("game_over", winners, playerToScore);
      } else {
        console.log("question: " + currQuiz.questions[questionIndex]);
        io.in(code).emit(
          "next_question",
          currQuiz.questions[questionIndex],
          playerToScore
        ); //todo: fix lmfao
      }
    }
  });

  socket.on("player_answer", (code, answer, playerName) => {
    //prob something that denotes if it's correct or not
    //which means answer data should store the number question and the number answer (0-3)

    playersReady += 1;
    console.log("players ready to move on to next question: " + playersReady);
    console.log("this player answered: " + answer);
    let isCorrect = answer === currQuiz.questions[questionIndex].corrAns;
    if (isCorrect) {
      // playerToCorrect.set(playerName, true);
      console.log("this player is correct");
      playerToCorrect[playerName] = true;
      playerToScore[playerName] += 100;
    } else {
      // playerToCorrect.set(playerName, false);
      console.log("this player is incorrect");
      playerToCorrect[playerName] = false;
    }

    if (playersReady === players.length) {
      console.log("everyone ready!");
      console.log("current scores:");
      console.log(playerToScore);
      playersReady = 0;
      io.in(code).emit("all_answered", code, playerToCorrect, playerToScore); //todo: fix lmfao
    }
  });

  socket.on("player_quit", (playerName) => {
    console.log("in player quit");
    console.log("players before quitting: ");
    console.log(players);
    players.splice(players.indexOf(playerName), 1);
    console.log("players after quitting: ");
    console.log(players);
    console.log(players.length);

    if (players.length === 0) {
      playersReady = 0;
      rooms.splice(rooms.indexOf("1111"), 1);
      currQuiz = 0; //currQuiz is not

      questionIndex = -1;
      playerToScore = {};
      playerToCorrect = {};

      console.log("EVERYONE QUIT!!!");
    }
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
