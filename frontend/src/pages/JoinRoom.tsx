import React from "react";
import { Link } from "react-router-dom";
import "../styles/JoinRoom.css";

const JoinRoom = () => {
  return (
    <div>
      <div className="joinVerticalContainer">
        <div className="joinTitleContainer">
          <h1 className="joinTitle">join a room!</h1>
        </div>

        <input type="text" className="input" name="" id="" placeholder="enter the join code!"/>

        <Link to="/waitingroom" className="buttonLink">
          <button className="joinButton">
            <div className="buttonText">join room</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JoinRoom;
