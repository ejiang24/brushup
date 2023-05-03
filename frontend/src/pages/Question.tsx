import React from "react";
import { Link } from "react-router-dom";
import "../styles/Question.css";
import { APIQuestion } from "../interfaces/APIQuestion";
import { APIQuiz } from "../interfaces/APIQuiz";
import { mockQuestion} from "../../tests/mocks/mockQuiz";
import socket from "../Socket";

let firstQuestion = "";
interface QuestionPageProps {
  quiz: APIQuiz;
  questionNum: number;
  setCorrect: (correct: boolean) => void;
}

const Question = (props: QuestionPageProps) => {
  
  let currQuestion: APIQuestion = props.quiz.quiz[props.questionNum];

  function handleClick(thisAnswer: string) {
    if (thisAnswer != currQuestion.corrAns) {
      props.setCorrect(false);
    } else {
      props.setCorrect(true);
    }
  }
  // socket.on("question", question1 => {
  //   let firstQuestion = question1;
  // });

  return (
    <div className="page">
      <p className="logo">Brush Up</p>
      <div className="column">
        {/* <h1 className="question">{firstQuestion}</h1> */}
        <h1 className="question">{currQuestion.question}</h1>
        {/* <img src="starrynight.png"></img> */}
        <div className="image"></div>
        <div className="grid">
          <Link to="/funfact" className="buttonLink">
            <button
              className="answer"
              onClick={() => handleClick(currQuestion.answer[0])}
            >
              {currQuestion.answer[0]}
            </button>
          </Link>

          <Link to="/funfact" className="buttonLink">
            <button
              className="answer"
              onClick={() => handleClick(currQuestion.answer[1])}
            >
              {currQuestion.answer[1]}
            </button>
          </Link>

          <Link to="/funfact" className="buttonLink">
            <button
              className="answer"
              onClick={() => handleClick(currQuestion.answer[2])}
            >
              {currQuestion.answer[2]}
            </button>
          </Link>

          <Link to="/funfact" className="buttonLink">
            <button
              className="answer"
              onClick={() => handleClick(currQuestion.answer[3])}
            >
              {currQuestion.answer[3]}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Question;
