import React from "react";
import { Link, useNavigate } from "react-router-dom";
import socket from "../Socket";
import "../styles/JoinRoom.css";
import { constants } from "../Constants";

/**
 * This class sets up the join room page where the user can input their name and a room code (currently only 1111) and join
 * an existing game. By joining a game, they are added to the list of players and taken to the waiting room.
*/

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
    /**
     * This socket interaction will tell the room to throw an error and provide
     * an informative answer as to what the issue is with joining a room
     */
    socket.on("join_room_error", (error) => {
      if (error === "room_code") {
        //If the user enters a code that does not exist or the server has not started
        console.log("join room, room doesn't exist");
        setErrorMessage(
          (v) =>
            "Sorry! A room with that code does not exist. Please try again."
        );
        setIsError(true);
      } else if (error === "empty_name") {
        //If the user did not enter their name
        console.log("join room, no name input");
        setErrorMessage((v) => "Please enter a player name.");
        setIsError(true);
      } else if (error === "name_already_exists") {
        //If the user enters a name that is taken
        console.log("join room, name already exists");
        setErrorMessage(
          (v) =>
            "Sorry, there is another player with that name. Please try a different a name!"
        );
        setIsError(true);
      }
    });
    /**
     * This socket interaction allows the user to join a room and navigate to the
     * waiting room
     */
    socket.on("can_join_room", (code, name) => {
      console.log("join room, we can join a room!");
      console.log("name: " + name);
      console.log("code : " + code);
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
          data-testid="nameInput"
          aria-label={constants.INPUT_NAME_ACC_NAME}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            console.log("name state changed to:" + name);
          }}
          placeholder="enter your name!"
        />

        <input
          type="text"
          className="input"
          data-testid="codeInput"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          name=""
          id=""
          aria-label={constants.INPUT_JOIN_CODE_ACC_NAME}
          placeholder="enter the join code!"
        />

        <button
          className="joinButton"
          data-testid="joinPageJoinButton"
          aria-label={constants.JOIN_ROOM_ACC_NAME}
          onClick={() => {
            console.log("button clicked, name:" + name);
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
