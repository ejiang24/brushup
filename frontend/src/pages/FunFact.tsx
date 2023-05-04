import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/FunFact.css";
import { APIQuestion } from "../interfaces/APIQuestion";
import { APIQuiz } from "../interfaces/APIQuiz";

interface FactPageProps {
  quiz: APIQuiz;
  questionNum: number;
  correct: boolean;
  players: string[];
}

function displayCorrectAns(correct: boolean, corrAns: string) {
  console.log("correct: " + correct);
  if (correct == false) {
    var toReturn: string = "Sorry! The correct answer was " + corrAns + ".";
    return toReturn;
  } else {
    return "Correct!";
  }
}

const FunFact = (props: FactPageProps) => {
  let currQuestion: APIQuestion = props.quiz.quiz[props.questionNum];

  //todo: in useEffect?
  let location = useLocation();
  var isCorrect = location.state.correct;

  const playerItems = props.players.map((player) => {
    console.log("making a new player <p>");
    console.log(player);
    return <p>{player}</p>;
  });

  return (
    <div className="page">
      <h1 className="finalAnswer">
        {/* {displayCorrectAns(props.correct, currQuestion.corrAns)} */}
        {displayCorrectAns(isCorrect, currQuestion.corrAns)}
      </h1>
      <div className="fact">Did you know... {currQuestion.funFact}.</div>
      <div className="leaderboardColumn">
        <p>Leaderboard</p>
        {playerItems}
        {/* <p>Caroline Hwang</p>
       <p>Caroline Hwang</p>
       <p>Caroline Hwang</p>
       <p>Caroline Hwang</p> */}
      </div>
    </div>
  );
};

export default FunFact;
