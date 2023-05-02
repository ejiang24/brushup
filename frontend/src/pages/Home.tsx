import React from "react";
import "../styles/HomeStyle.css";
import { Link, Navigate } from "react-router-dom";
import socket from "../Socket";

const Home = () => {
  //fix structurally, state for name should exist across whole app prob once joined or something
  const [name, setName] = React.useState("");
  return (
    <div className="homeVerticalContainer">
      <div className="appTitleContainer">
        <h1 className="appTitle">🖌Brush Up🦊</h1>
      </div>

      {/* <input
        type="text"
        className="input"
        name=""
        id=""
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="enter your name!"
      /> */}

      <Link to="/joinroom" className="buttonLink">
        <button className="joinButton">
          <div className="buttonText">join room</div>
        </button>
      </Link>
      <Link to="/createroom" className="buttonLink">
        <button className="createButton">
          <div className="buttonText">create room</div>
        </button>
      </Link>

      {/* <Link to="/waitingroom" className="buttonLink">
        <button
          className="createButton"
          onClick={() => {
            console.log("create clicked");
            socket.emit("create_room", "1111", name);
          }}
        >
          <div className="buttonText">create room</div>
        </button>
      </Link> */}

      {/* todo: make conditional */}
      {/* <button
        className="createButton"
        onClick={() => {
          console.log("create clicked");
          socket.emit("create_room", "1111", name);
          return <Navigate to="/waitingroom" />;
        }}
      >
        <div className="buttonText">create room</div>
      </button> */}
    </div>
  );
};

export default Home;
