import React from "react";
import "../styles/Question.css";
import { constants } from "../Constants";
//todo: change^^^

/**
 * This class sets up the header at the top of the screen containing the logo and the
 * users score.
*/

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
