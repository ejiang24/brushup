import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Question.css";
import { APIQuestion } from "../interfaces/APIQuestion";
import { APIQuiz } from "../interfaces/APIQuiz";
import { mockQuestion } from "../../tests/mocks/mockQuiz";
import socket from "../Socket";

let firstQuestion = "";
interface QuestionPageProps {
  quiz: APIQuiz;
  questionNum: number;
  setCorrect: (correct: boolean) => void;
}

const Question = (props: QuestionPageProps) => {
  // let currQuestion: APIQuestion = props.quiz.quiz[props.questionNum];
  // const [currQuestion, setCurrQuestion] = React.useState<APIQuestion>();

  let navigate = useNavigate();
  let location = useLocation();
  var currQuestion = location.state.currQ;
  console.log("Question, currQuestion: " + currQuestion);

  function handleClick(thisAnswer: string) {
    if (thisAnswer != currQuestion.corrAns) {
      props.setCorrect(false);
    } else {
      props.setCorrect(true);
    }

    socket.emit("player_answer", "1111", thisAnswer);
  }
  // socket.on("question", question1 => {
  //   let firstQuestion = question1;
  // });

  React.useEffect(() => {
    socket.on("all_answered", (data) => {
      navigate("/funfact");
      //todo: how are we gonna tell front end to load the next question
    });
  }, [socket]);

  return (
    <div className="page">
      <p className="logo">Brush Up</p>
      <div className="column">
        {/* <h1 className="question">{firstQuestion}</h1> */}
        <h1 className="question">{currQuestion.question}</h1>
        {/* <img src="starrynight.png"></img> */}
        <div className="image"></div>
        <div className="grid">
          {/* todo: we can just use a map probably for this */}
          <button
            className="answer"
            onClick={() => {
              handleClick(currQuestion.ans[0]);
            }}
          >
            {currQuestion.ans[0]}
          </button>
          <button
            className="answer"
            onClick={() => {
              handleClick(currQuestion.ans[1]);
            }}
          >
            {currQuestion.ans[1]}
          </button>
          <button
            className="answer"
            onClick={() => {
              handleClick(currQuestion.ans[2]);
            }}
          >
            {currQuestion.ans[2]}
          </button>
          <button
            className="answer"
            onClick={() => {
              handleClick(currQuestion.ans[3]);
            }}
          >
            {currQuestion.ans[3]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;

{
  /* <Link to="/funfact" className="buttonLink">
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
          </Link> */
}
