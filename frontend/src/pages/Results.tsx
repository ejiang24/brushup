import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../Socket";
//import "../styles/WaitingRoom.css";

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

  function handleClick() {
    socket.emit("player_quit", props.myPlayer);
    navigate("/");
  }

  return (
    <div>
      <h1>Results</h1>
      <h1>
        Congrats, {props.myPlayer}. Your score is:{" "}
        {playerToScore[props.myPlayer]}.
      </h1>
      <h2>Winner:</h2>
      {winnerItems}

      <button data-testid="returnButton" onClick={handleClick}>Quit</button>
    </div>
  );
};

export default Results;
