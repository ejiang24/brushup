import React from "react";
import "../styles/Question.css";
//todo: change^^^

interface HeaderProps {
  myPlayer: string;
  score: number;
}

export default function Header(props: HeaderProps) {
  return (
    <div className="header">
      <div className="logo">
        <h1>BRUSH UP</h1>
      </div>
      <div className="playerName">
        <h3>
          {props.myPlayer} : {props.score}
        </h3>
      </div>
    </div>
  );
}
