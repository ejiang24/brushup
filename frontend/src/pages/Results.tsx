import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../Socket";
import "../styles/Results.css";

/**
 * This page is the results page. Here the leaderboard, the player's name, and the score
 * will all be displayed
 */
interface ResultsProps {
  myPlayer: string;
}

const Results = (props: ResultsProps) => {
  let location = useLocation();
  let navigate = useNavigate();
  var winners = location.state.winnersList;
  var playerToScore = location.state.playerToScore;

  const winnerItems = winners.map((winner: string) => {
    return (
      <div>
        <p>{winner}</p>
      </div>
    );
  });

  /**
   * This function handles the click of the quit button and takes the player
   * back to the home screen
   */
  function handleClick() {
    socket.emit("player_quit", props.myPlayer);
    navigate("/");
  }

  return (
    <div className="verticalBox">
      <h1 className="title">🖌Results🦊</h1>
      <h1 className ="message">
        Congrats, {props.myPlayer}. Your score is:{" "}
        {playerToScore[props.myPlayer]}.
      </h1>
      <div className="winner">
        <h2>Winner:</h2>
        {winnerItems}
      </div>

      <button
        data-testid="returnButton"
        onClick={handleClick}
        className="quitButton"
      >
        Quit
      </button>
    </div>
  );
};

export default Results;
