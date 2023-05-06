import React from "react";
import { useNavigate } from "react-router-dom";
import socket from "../Socket";
import { APIQuiz } from "../interfaces/APIQuiz";
import "../styles/JoinRoom.css";
import { mockQuiz, mockQuiz2 } from "../../tests/mocks/mockQuiz";
import { constants } from "../Constants";
interface CreateRoomProps {
  setPlayers: (data: string[]) => void;
  setMyPlayer: (data: string) => void;
  mock: boolean;
  quiz1: boolean;
}

// React.Dispatch<React.SetStateAction<boolean>>

const CreateRoom = (props: CreateRoomProps) => {
  //   const [code, setCode] = React.useState("");
  const [name, setName] = React.useState("");
  let navigate = useNavigate();
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
      </div>
    </div>
  );

  async function handleClick() {
    console.log("create clicked");
    var quizPromise = await Promise.resolve(
      getQuiz(props.mock, props.quiz1)
        .then((quiz) => {
          console.log("quiz inside of handle click");
          console.log(quiz);
          return quiz;
        })
        .then((quizToSend) => {
          console.log("quiz to send:");
          console.log(quizToSend);
          console.log("name:");
          console.log(name);
          props.setPlayers([name]);
          props.setMyPlayer(name);
          socket.emit("create_room", "1111", name, quizToSend);
        })
    );

    return navigate("/waitingroom");
  }
};

async function getQuiz(mock: boolean, quiz1:boolean) {
  if (mock == true && quiz1 == true) {
    return mockQuiz.quiz;
  } 
  if (mock == true && quiz1 != true) {
    return mockQuiz2.quiz;
  } else {
    return fetch("http://localhost:3235/makequiz")
      .then((response) => response.json())
      .then((ResponseObject) => {
        console.log("QUIZ:");
        console.log(ResponseObject.quiz);
        return ResponseObject.quiz;
      });
  }
  // .then((data) => {
  //   console.log("data: " + data);
  //   console.log("quiz now??? " + quiz);
  //   socket.emit("create_room", "1111", name, quiz);
  //   return navigate("/waitingroom");
  // });
}

export default CreateRoom;
