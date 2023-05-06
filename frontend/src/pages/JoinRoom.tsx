import React from "react";
import { Link } from "react-router-dom";
import socket from "../Socket";
import "../styles/JoinRoom.css";
import { constants } from "../Constants";

interface JoinRoomProps {
  setMyPlayer: (data: string) => void;
}

const JoinRoom = (props: JoinRoomProps) => {
  const [code, setCode] = React.useState("");
  const [name, setName] = React.useState("");
  return (
    <div>
      <div className="joinVerticalContainer">
        <div className="joinTitleContainer">
          <h1 className="joinTitle">join a room!</h1>
        </div>

        <input
          type="text"
          className="input"
          name=""
          id=""
          aria-label={constants.INPUT_NAME_ACC_NAME}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter your name!"
        />

        <input
          type="text"
          className="input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          name=""
          id=""
          aria-label={constants.INPUT_JOIN_CODE_ACC_NAME}
          placeholder="enter the join code!"
        />

        <Link to="/waitingroom" className="buttonLink">
          <button
            className="joinButton"
            aria-label={constants.JOIN_ROOM_ACC_NAME}
            onClick={() => {
              props.setMyPlayer(name);
              socket.emit("join_room", code, name);
            }}
          >
            <div className="buttonText">join room</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JoinRoom;
