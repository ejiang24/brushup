import React from "react";
import { Link } from "react-router-dom";
import "../styles/WaitingRoom.css";
import socket from "../Socket";

const WaitingRoom = () => {
  const [players, setPlayers] = React.useState([socket.id]);

  const playerItems = players.map((player) => {
    console.log("making a new player <p>");
    console.log(player);
    return (
      <div>
        <p>{player}</p>
      </div>
    );
  });

  React.useEffect(() => {
    socket.off("joined_room").on("joined_room", (data) => {
      console.log("joined_room received");
      console.log(data);
      setPlayers([data]);
      socket.emit("join_room_final", socket.id);
    });

    socket.off("joined_room_final").on("joined_room_final", (data) => {
      console.log("joined room final");
      console.log(data);
      setPlayers([data]);
    });
    // socket.on("receive_reset", () => {
    //     reset();
    // });
  }, [socket]);

  return (
    <div>
      <div className="waitVerticalContainer">
        <div className="waitTitleContainer">
          <h1 className="codeTitle">room code: 1111</h1>
          <h1 className="waitTitle">waiting for other players to join...</h1>
        </div>

        <div className="players">{playerItems}</div>

        <Link to="/question" className="buttonLink">
          <button className="joinButton">
            <div className="buttonText">ready!</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WaitingRoom;
