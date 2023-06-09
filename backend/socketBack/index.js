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
    // origin: "http://localhost:5174", //caroline's origin
    //origin: "http://127.0.0.1:5173", //front end
    origin: "http://localhost:5173",
    //what methods are we requesting?
    methods: ["GET", "POST"],
  },
});

//todo: handle player joining running game (gameLive boolean)

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  //WHEN A PLAYER CREATES A NEW ROOM
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

  //WHEN A PLAYER ATTEMPTS TO JOIN A ROOM
  socket.on("join_room", (code, name) => {
    var error = false;
    //if room doesn't exist
    if (rooms.indexOf(code) === -1) {
      error = true;
      io.to(socket.id).emit("join_room_error", "room_code");
    } else if (name === "") {
      io.to(socket.id).emit("join_room_error", "empty_name");
      error = true;
    }
    //if player name already exists
    else if (players.indexOf(name) !== -1) {
      io.to(socket.id).emit("join_room_error", "name_already_exists");
      error = true;
    }
    if (!error) {
      io.to(socket.id).emit("can_join_room", code, name);
    }
  });

  //WHEN A PLAYER SUCCESSFULY JOINS A ROOM
  socket.on("join_room_success", (code, name) => {
    socket.join(code); //joins socket id (player) to the room
    var error = false;

    if (!error) {
      players.push(name);
      playerToScore[name] = 0;
      console.log(name + " joined " + code);
      console.log(players);

      io.in(code).emit("joined_room", players); //let other players know
    }
  });

  //WHEN A PLAYER IS READY
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
        );
      }
    }
  });

  //WHEN A PLAYER ANSWERS A QUESTION
  socket.on("player_answer", (code, answer, playerName) => {
    playersReady += 1;
    console.log("players ready to move on to next question: " + playersReady);
    console.log("this player answered: " + answer);
    let isCorrect = answer === currQuiz.questions[questionIndex].corrAns;
    if (isCorrect) {
      console.log("this player is correct");
      playerToCorrect[playerName] = true;
      playerToScore[playerName] += 100;
    } else {
      console.log("this player is incorrect");
      playerToCorrect[playerName] = false;
    }

    //if everyone is ready to move on
    if (playersReady === players.length) {
      console.log("everyone ready!");
      console.log("current scores:");
      console.log(playerToScore);
      playersReady = 0;

      //sort the leaderboard
      const playerToScoreSorted = Object.entries(playerToScore)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      console.log("players sorted:");
      console.log(playerToScoreSorted);

      //move on to leaderboard
      io.in(code).emit(
        "all_answered",
        code,
        playerToCorrect,
        playerToScore,
        Object.keys(playerToScoreSorted)
      );
    }
  });

  //WHEN A PLAYER QUITS THE GAME AFTER IT ENDS
  socket.on("player_quit", (playerName) => {
    console.log("players before quitting: ");
    console.log(players);
    players.splice(players.indexOf(playerName), 1);
    console.log("players after quitting: ");
    console.log(players);
    console.log(players.length);

    //if everyone left the room, reset state
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
