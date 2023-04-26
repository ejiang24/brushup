import React from "react";
import  "../styles/HomeStyle.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homeVerticalContainer">
      <div className="appTitleContainer">
        <h1 className="appTitle">Brush Up</h1>
      </div>
      
        <input type="text" className="input" name="" id="" placeholder="enter your name!"/>

        <Link to="/joinroom" className="buttonLink">
          <button className="joinButton">
            <div className="buttonText">join room</div>
          </button>
        </Link>


        <Link to="/waitingroom" className="buttonLink">
          <button className="createButton">
            <div className="buttonText">create room</div>
          </button>
        </Link>
   
    </div>
  );
};

export default Home;