import React from "react";
import { Link } from "react-router-dom";
import "../styles/Question.css";

const Question = () => {
  return (
    <div className="page">
      <p className="logo">Brush Up</p>
      <div className="column">
        <h1 className="question">Who made this?</h1>
        {/* <img src="starrynight.png"></img> */}
        <div className="image"></div>
        <div className="grid">
          <Link to="/funfact" className="buttonLink">
            <button className="answer">
              Caroline Hwang
              <div className="answer">join room</div>
            </button>
          </Link>
          <Link to="/funfact" className="buttonLink">
            <button className="answer">
              Caroline Hwang
              <div className="answer">join room</div>
            </button>
          </Link>
          <Link to="/funfact" className="buttonLink">
            <button className="answer">
              Caroline Hwang
              <div className="answer">join room</div>
            </button>
          </Link>
          <Link to="/funfact" className="buttonLink">
            <button className="answer">
              Caroline Hwang
              <div className="answer">join room</div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Question;
