import React from "react";
import { Link, useNavigate } from "react-router-dom";
import socket from "../Socket";
import "../styles/JoinRoom.css";
import { constants } from "../Constants";

interface JoinRoomProps {
  setMyPlayer: (data: string) => void;
}

const JoinRoom = (props: JoinRoomProps) => {
  const [code, setCode] = React.useState("");
  const [name, setName] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  let navigate = useNavigate();

  const errorMessageItem = <h4>{errorMessage}</h4>;

  React.useEffect(() => {
    socket.on("join_room_error", (error) => {
      if (error === "room_code") {
        console.log("join room, room doesn't exist");
        setErrorMessage(
          (v) =>
            "Sorry! A room with that code does not exist. Please try again."
        );
        setIsError(true);
      } else if (error === "empty_name") {
        console.log("join room, no name input");
        setErrorMessage((v) => "Please enter a player name.");
        setIsError(true);
      } else if (error === "name_already_exists") {
        console.log("join room, name already exists");
        setErrorMessage(
          (v) =>
            "Sorry, there is another player with that name. Please try a different a name!"
        );
        setIsError(true);
      }
    });
    socket.on("can_join_room", () => {
      console.log("join room, we can join a room!");
      socket.emit("join_room_success", code, name);
      navigate("/waitingroom");
    });
  }, [socket]);

  return (
    <div>
      <div className="joinVerticalContainer">
        <div className="joinTitleContainer">
          <h1 className="joinTitle">join a room!</h1>
        </div>

        <input
          type="text"
          className="input"
          name=""
          id=""
          aria-label={constants.INPUT_NAME_ACC_NAME}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter your name!"
        />

        <input
          type="text"
          className="input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          name=""
          id=""
          aria-label={constants.INPUT_JOIN_CODE_ACC_NAME}
          placeholder="enter the join code!"
        />

        {/* <Link to="/waitingroom" className="buttonLink">
          <button
            className="joinButton"
            aria-label={constants.JOIN_ROOM_ACC_NAME}
            onClick={() => {
              props.setMyPlayer(name);
              socket.emit("join_room", code, name);
            }}
          >
            <div className="buttonText">join room</div>
          </button>
        </Link> */}

        <button
          className="joinButton"
          aria-label={constants.JOIN_ROOM_ACC_NAME}
          onClick={() => {
            props.setMyPlayer(name);
            socket.emit("join_room", code, name);
          }}
        >
          <div className="buttonText">join room</div>
        </button>

        {isError && errorMessage}
      </div>
    </div>
  );
};

export default JoinRoom;
