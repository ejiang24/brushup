const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

var players = [];

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

  socket.on("join_room", (code, id) => {
    socket.join(code); //joins socket id (player) to the room
    if (players.indexOf(id) === -1) {
      players.push(id); //adds to player
    }
    console.log("joined " + code);
    console.log(players);

    socket.broadcast.emit("joined_room", players); //let other players know
  });

  socket.on("join_room_final", (id) => {
    socket.broadcast.emit("joined_room_final", players);
  });
});
// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   });

//   socket.on("drop_piece", (data) => {
//     socket.broadcast.emit("receive_drop_piece", data);
//   });

//   socket.on("send_message", (msg) => {
//     console.log("message received in server: " + msg);
//     socket.broadcast.emit("receive_message", msg);
//   });

//   socket.on("reset", () => {
//     socket.broadcast.emit("receive_reset");
//   });
// });

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
