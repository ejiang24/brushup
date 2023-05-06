import React from "react";
import "../styles/Question.css";
import { constants } from "../Constants";
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
      <div
        className="playerName"
        tabIndex={0}
        aria-label={constants.HEADER_ACC_NAME}
      >
        <h3>
          {props.myPlayer} : {props.score}
        </h3>
      </div>
    </div>
  );
}
