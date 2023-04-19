import React from "react";
import  "../styles/HomeStyle.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="appTitleContainer">
        <h1 className="appTitle">Brush Up</h1>
      </div>
      <button className="joinButton">
        <li>
          <Link to="/waitingroom">join room</Link>
        </li>
      </button>
    </div>
  );
};

export default Home;
