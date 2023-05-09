import React from "react";
import { useNavigate } from "react-router-dom";
import socket from "../Socket";
import "../styles/JoinRoom.css";
import { mockQuiz, mockQuiz2 } from "../../tests/mocks/mockQuiz";
import { constants } from "../Constants";

/**
 * This class sets up the page where the user creates a new game room. It asks the user to enter their name, and when
 * they click the "create room" button, it makes a call to the API server to generate the quiz. Additionally, we can
 * have a mock room created by setting the "mock" prop of the interface to true. Doing so will create a quiz using a mocked 
 * API response, and we can switch betweeen mocked quizzes by specifiying the "quiz 1" boolean. 
*/


interface CreateRoomProps {
  setPlayers: (data: string[]) => void;
  setMyPlayer: (data: string) => void;
  mock: boolean;
  quiz1: boolean;
}

const CreateRoom = (props: CreateRoomProps) => {
  const [name, setName] = React.useState("");
  let navigate = useNavigate();

  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const errorMessageItem = <h4>{errorMessage}</h4>;

  return (
    <div>
      <div className="joinVerticalContainer">
        <div className="joinTitleContainer">
          <h1 className="joinTitle">create a room!</h1>
        </div>

        <input
          type="text"
          className="input"
          name=""
          aria-label={constants.INPUT_JOIN_CODE_ACC_NAME}
          data-testid="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter your name!"
        />

        <button
          className="createButton"
          data-testid="createButton"
          onClick={handleClick}
          aria-label={constants.CREATE_ROOM_ACC_NAME}
        >
          create room
        </button>

        {isError && errorMessageItem}
      </div>
    </div>
  );

  //When "create room" is clicked, we get the quiz and tell the socket about the new room
  async function handleClick() {
    console.log("create clicked");
    var error = false;

    if (name === "") {
      error = true;
      setIsError(true);
      setErrorMessage((v) => "Please enter a name.");
    } else {
      var quizPromise = await Promise.resolve(
        getQuiz(props.mock, props.quiz1)
          .then((quiz) => {
            console.log("quiz inside of handle click");
            console.log(quiz);
            return quiz;
          })
          .then((quizToSend) => {
            if (quizToSend !== undefined) {
              console.log("quiz to send:");
              console.log(quizToSend);
              console.log("name:");
              console.log(name);
              props.setPlayers([name]);
              props.setMyPlayer(name);
              socket.emit("create_room", "1111", name, quizToSend);
            } else {
              console.log("quiz to send is undefined!!!");
              error = true;
            }
          })
      );
    }
    //If there is no error, automatically go to the waiting room
    if (!error) {
      return navigate("/waitingroom");
    }
  }

  async function getQuiz(mock: boolean, quiz1: boolean) {
    //If we want to use the mocked quiz1
    if (mock == true && quiz1 == true) {
      return mockQuiz.quiz;
    }
    //If we want to use the mocked quiz2
    if (mock == true && quiz1 != true) {
      return mockQuiz2.quiz;
    } else {
      //If we want to ask the server to generate our quiz
      return fetch("http://localhost:3235/makequiz")
        .then((response) => response.json())
        .then((ResponseObject) => {
          console.log("QUIZ:");
          console.log(ResponseObject.quiz);
          return ResponseObject.quiz;
        })
        //If the server returns an error or is not running, display an error message
        .catch((e) => {
          console.log("there was en error");
          setIsError(true);
          setErrorMessage(
            (v) => "There is an issue with the server. Please try again later!"
          );
        });
    }
  }
};

export default CreateRoom;
