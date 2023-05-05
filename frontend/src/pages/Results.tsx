import React from "react";
import { useLocation } from "react-router-dom";
//import "../styles/WaitingRoom.css";

const Results = () => {
  let location = useLocation();
  var winners = location.state.winnersList;

  const winnerItems = winners.map((winner: string) => {
    return (
      <div>
        <p>{winner}</p>
      </div>
    );
  });

  return (
    <div>
      <h1>Results</h1>
      <h2>Winner:</h2>
      {winnerItems}
    </div>
  );
};

export default Results;
