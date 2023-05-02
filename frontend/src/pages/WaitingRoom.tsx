import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WaitingRoom.css";
import socket from "../Socket";

const WaitingRoom = () => {
  //todo: change to name state
  const [players, setPlayers] = React.useState([socket.id]);
  let navigate = useNavigate();

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
    });

    socket.on("start_game", (data) => {
      navigate("/question");
    });
  }, [socket]);

  return (
    <div>
      <div className="waitVerticalContainer">
        <div className="waitTitleContainer">
          <h1 className="codeTitle">room code: 1111</h1>
          <h1 className="waitTitle">waiting for other players to join...</h1>
        </div>

        <div className="players">{playerItems}</div>

        {/* <Link to="/question" className="buttonLink">
          <button className="joinButton">
            <div className="buttonText">ready!</div>
          </button>
        </Link> */}

        <button
          className="joinButton"
          onClick={() => {
            console.log("ready button clicked");
            socket.emit("player_ready", "1111");
          }}
        >
          <div className="buttonText">ready!</div>
        </button>
      </div>
    </div>
  );
};

export default WaitingRoom;
