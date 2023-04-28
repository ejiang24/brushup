import React from "react";
import { Link } from "react-router-dom";
import socket from "../Socket";
import "../styles/JoinRoom.css";

const JoinRoom = () => {
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
          placeholder="enter the join code!"
        />

        <Link to="/waitingroom" className="buttonLink">
          <button
            className="joinButton"
            onClick={() => {
              socket.emit("join_join", code, name);
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
