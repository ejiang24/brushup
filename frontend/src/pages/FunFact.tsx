import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/FunFact.css";
import { APIQuestion } from "../interfaces/APIQuestion";
import socket from "../Socket";
import Header from "../components/Header";
import { APIQuiz } from "../interfaces/APIQuiz";

interface FactPageProps {
  questionNum: number;
  correct: boolean;
  players: string[];
  myPlayer: string;
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
  //let currQuestion: APIQuestion = props.quiz.quiz.questions[props.questionNum];
  const funFact = "taylor yay";
  const [disabled, setDisabled] = React.useState(false);

  //todo: in useEffect?
  let location = useLocation();
  var isCorrect = location.state.correct;
  var corrAns = location.state.corrAns;
  var score = location.state.score;
  var playerSorted = location.state.playerSorted;
  // var isCorrect = props.correct;
  // var corrAns = currQuestion.corrAns;

  let navigate = useNavigate();

  const playerItems = playerSorted.map((player: string) => {
    console.log("making a new player <p>");
    console.log(player);
    return <p>{player}</p>;
  });
  // const playerItems = props.players.map((player) => {
  //   console.log("making a new player <p>");
  //   console.log(player);
  //   return <p>{player}</p>;
  // });

  React.useEffect(() => {
    socket.on("next_question", (nextQ, playerToScore) => {
      // getConvertedData();
      console.log("next_question received. next question is...");
      console.log(nextQ);
      navigate("/question", {
        state: { currQ: nextQ, score: playerToScore[props.myPlayer] },
      });
    });

    socket.on("game_over", (winners, playerToScore) => {
      navigate("/results", {
        state: { winnersList: winners, playerToScore: playerToScore },
      });
    });
  }, [socket]);

  return (
    <div className="page">
      <Header myPlayer={props.myPlayer} score={score} />
      <h1 className="finalAnswer">
        {/* {displayCorrectAns(props.correct, currQuestion.corrAns)} */}
        {displayCorrectAns(isCorrect, corrAns)}
      </h1>
      <div className="fact">Did you know... {funFact}.</div>
      <div className="leaderboardColumn">
        <p>Leaderboard</p>
        {playerItems}
        {/* <p>Caroline Hwang</p>
       <p>Caroline Hwang</p>
       <p>Caroline Hwang</p>
       <p>Caroline Hwang</p> */}
      </div>

      <button
        className="readyButton"
        disabled={disabled}
        onClick={() => {
          {
            setDisabled(!disabled);
          }
          console.log("ready button clicked");
          socket.emit("player_ready", "1111");
        }}
      >
        <div className="buttonText">ready!</div>
      </button>
    </div>
  );
};

export default FunFact;
