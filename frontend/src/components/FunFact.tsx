import React from "react";
import { Link } from "react-router-dom";
import "../styles/FunFact.css";
import { APIQuestion } from "../interfaces/APIQuestion";
import { APIQuiz } from "../interfaces/APIQuiz";

interface FactPageProps {
  quiz: APIQuiz;
  questionNum: number;
  correct: boolean;
}

function displayCorrectAns(correct: boolean, corrAns: string){
  if(correct == false){
    var toReturn : string = "Sorry! The correct answer was " + corrAns;
    return toReturn;
  }else{
    return "Correct!"
  }
}

const FunFact = (props: FactPageProps) => {

  let currQuestion: APIQuestion = props.quiz.quiz[props.questionNum];


  return (
    <div className="page">
      <h1 className="finalAnswer">{displayCorrectAns(props.correct, currQuestion.corrAns)}</h1>
      <div className="fact">
        Did you know... {currQuestion.funFact}
      </div>
      <div className="leaderboardColumn">
        <p>Leaderboard</p>
        <p>Caroline Hwang</p>
        <p>Caroline Hwang</p>
        <p>Caroline Hwang</p>
        <p>Caroline Hwang</p>
      </div>
    </div>
  );
};

export default FunFact;
