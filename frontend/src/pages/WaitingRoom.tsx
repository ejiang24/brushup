import React from "react";
import { Link } from "react-router-dom";
import "../styles/WaitingRoom.css";

const WaitingRoom = () => {
  return (
    <div>
      <div className="waitVerticalContainer">
        <div className="waitTitleContainer">
          <h1 className="codeTitle">room code: 1111</h1>
          <h1 className="waitTitle">waiting for other players to join...</h1>
        </div>

        <div className="players">Caroline Hwang</div>

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
