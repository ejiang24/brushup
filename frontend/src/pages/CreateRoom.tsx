import React from "react";
import { useNavigate } from "react-router-dom";
import socket from "../Socket";
import "../styles/JoinRoom.css";

const CreateRoom = () => {
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
          id=""
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter your name!"
        />

        <button
          className="createButton"
          onClick={() => {
            console.log("create clicked");
            socket.emit("create_room", "1111", name);
            return navigate("/waitingroom");
          }}
        >
          create room
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
