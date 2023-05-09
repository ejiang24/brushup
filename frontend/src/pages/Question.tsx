import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Question.css";
import { APIQuestion } from "../interfaces/APIQuestion";
import { APIQuiz } from "../interfaces/APIQuiz";
import { mockQuestion } from "../../tests/mocks/mockQuiz";
import Header from "../components/Header";
import socket from "../Socket";
import { constants } from "../Constants";

let firstQuestion = "";
interface QuestionPageProps {
  questionNum: number;
  setCorrect: (correct: boolean) => void;
  myPlayer: string;
}

const Question = (props: QuestionPageProps) => {

  let navigate = useNavigate();
  let location = useLocation();
  var currQuestion = location.state.currQ;
  var score = location.state.score;
  console.log("Question, currQuestion: " + currQuestion);

  /**
   * This function is called when an answer is chosen
   * @param thisAnswer - This is the answer of the button that was clicked, and will set
   * the Correct boolean to true or false and then emit a message to the socket giving it
   * the answer that was chosen and the player name
   */
  function handleClick(thisAnswer: string) {
    if (thisAnswer != currQuestion.corrAns) {
      props.setCorrect(false);
    } else {
      props.setCorrect(true);
    }

    socket.emit("player_answer", "1111", thisAnswer, props.myPlayer);
  }

  React.useEffect(() => {
    /**
     * This socket interaction listens to wait until all the players have answered. It
     * then navigates the user to the funfact page
     */
    socket.on(
      "all_answered",
      (code, playerToCorrect, playerToScore, playerSorted) => {
        console.log("on all_answered");
        console.log(playerToCorrect[props.myPlayer]);
        let isCorrect = playerToCorrect[props.myPlayer];
        navigate("/funfact", {
          state: {
            correct: isCorrect,
            corrAns: currQuestion.corrAns,
            score: playerToScore[props.myPlayer],
            playerSorted: playerSorted,
          },
        });
        //todo: how are we gonna tell front end to load the next question
      }
    );
  }, [socket]);

  return (
    <div className="page">
      {/* <p className="logo">Brush Up</p> */}
      <Header myPlayer={props.myPlayer} score={score} />
      <div className="column">
        {/* <h1 className="question">{firstQuestion}</h1> */}
        <h1
          className="question"
          aria-label={constants.QUESTION_ACC_NAME}
          tabIndex={0}
        >
          {currQuestion.question}
        </h1>
        {/* <img src="starrynight.png"></img> */}
        <div className="image">
          <img className="painting" src={currQuestion.imgPath} />
        </div>
        <div className="grid">
          {/* todo: we can just use a map probably for this */}
          <button
            className="answer"
            data-testid="answer1"
            aria-label={constants.ANS_BUTTON_ACC_NAME}
            onClick={() => {
              handleClick(currQuestion.ans[0]);
            }}
          >
            {currQuestion.ans[0]}
          </button>
          <button
            className="answer"
            data-testid="answer2"
            aria-label={constants.ANS_BUTTON_ACC_NAME}
            onClick={() => {
              handleClick(currQuestion.ans[1]);
            }}
          >
            {currQuestion.ans[1]}
          </button>
          <button
            className="answer"
            data-testid="answer3"
            aria-label={constants.ANS_BUTTON_ACC_NAME}
            onClick={() => {
              handleClick(currQuestion.ans[2]);
            }}
          >
            {currQuestion.ans[2]}
          </button>
          <button
            className="answer"
            data-testid="answer4"
            aria-label={constants.ANS_BUTTON_ACC_NAME}
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


