import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/FunFact.css";
import socket from "../Socket";
import Header from "../components/Header";

/**
 * This class sets up the page after all users have answered a question. It tells them whether they had the correct answer and
 * if not, tells them the correct answer. It also shows the leaderboard and a fun fact. Right now, the fun fact is mocked
 * because the MET API does not give that information, but ideally, the fun fact should change from question to question.
 * It asks the user to enter their name, and when
 * they click the "create room" button, it makes a call to the API server to generate the quiz. Additionally, we can
 * have a mock room created by setting the "mock" prop of the interface to true. Doing so will create a quiz using a mocked 
 * API response, and we can switch betweeen mocked quizzes by specifiying the "quiz 1" boolean. 
*/

interface FactPageProps {
  questionNum: number;
  correct: boolean;
  players: string[];
  myPlayer: string;
}

/**
 * If the answer was set as incorrect on the Question page, this method can be called
 * to display the correct nswer on the fun fact page
 * @param correct - the boolean representing if they answered correct or not from the
 * question page
 * @param corrAns - the actual correct answer to be displayed
 * @returns a string to be displayed on the page
 */
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
  const funFact = "taylor yay";
  const [disabled, setDisabled] = React.useState(false);

  //todo: in useEffect?
  let location = useLocation();
  var isCorrect = location.state.correct;
  var corrAns = location.state.corrAns;
  var score = location.state.score;
  var playerSorted = location.state.playerSorted;

  let navigate = useNavigate();

  const playerItems = playerSorted.map((player: string) => {
    console.log("making a new player <p>");
    console.log(player);
    return <p>{player}</p>;
  });


  React.useEffect(() => {
    /**
     * here the room interacts with the socket telling it to move to the next question
     * and then it naviagtes to the next question
     */
    socket.on("next_question", (nextQ, playerToScore) => {
      // getConvertedData();
      console.log("next_question received. next question is...");
      console.log(nextQ);
      navigate("/question", {
        state: { currQ: nextQ, score: playerToScore[props.myPlayer] },
      });
    });

    /**
     * If there are no more questions left, the socket will tell the room to navigate
     * to the results screen
     */
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
      </div>

      <button
        className="readyButton"
        data-testid="readyButton2"
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
