import React from "react";
import "../styles/HomeStyle.css";
import { Link, Navigate } from "react-router-dom";
import socket from "../Socket";
import { constants } from "../Constants";

/**
 * This class sets up the home page page where the user can click a button to create a new game or join an existing game.
*/

const Home = () => {
  //fix structurally, state for name should exist across whole app prob once joined or something
  const [name, setName] = React.useState("");
  return (
    <div className="homeVerticalContainer">
      <div className="appTitleContainer">
        <h1 className="appTitle">🖌Brush Up🦊</h1>
      </div>

      <Link to="/joinroom" className="buttonLink">
        <button
          className="joinButton"
          aria-label={constants.JOIN_ROOM_ACC_NAME}
        >
          <div className="buttonText">join room</div>
        </button>
      </Link>
      <Link to="/createroom" className="buttonLink">
        <button
          className="createButton"
          aria-label={constants.CREATE_ROOM_ACC_NAME}
        >
          <div className="buttonText">create room</div>
        </button>
      </Link>
    </div>
  );
};

export default Home;
