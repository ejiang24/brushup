import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WaitingRoom.css";
import socket from "../Socket";
import { APIQuiz } from "../interfaces/APIQuiz";

interface WaitingRoomProps {
  players: string[];
  setPlayers: (data: string[]) => void;
}

const WaitingRoom = (props: WaitingRoomProps) => {
  let navigate = useNavigate();
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    /**
     * This socket interaction listens for the joined_room emission and then adds
     * the players names to the players array
     */
    socket.off("joined_room").on("joined_room", (data) => {
      console.log("joined_room received");
      console.log("data:" + data);
      props.setPlayers(data);
    });

    /**
     * This socket interaction gets the firstQ from the socket and moves the user
     * to the question to the question page displaying this firstQ
     */
    socket.on("next_question", (firstQ) => {
      console.log("start game received, first question is...");
      console.log(firstQ);
      navigate("/question", { state: { currQ: firstQ, score: 0 } });
    });
  }, [socket]);

  //creating the inner html for the list of players
  var playersInnerHTML: string = "";
  for (var player of props.players) {
    console.log(player);
    playersInnerHTML += "<p>" + player + "</p>";
  }

  return (
    <div>
      <div className="waitVerticalContainer">
        <div className="waitTitleContainer">
          <h1 className="codeTitle">room code: 1111</h1>
          <h1 className="waitTitle">waiting for other players to join...</h1>
        </div>

        <div
          className="players"
          dangerouslySetInnerHTML={{ __html: playersInnerHTML }}
        ></div>

        {/* <Link to="/question" className="buttonLink">
         <button className="joinButton">
           <div className="buttonText">ready!</div>
         </button>
       </Link> */}

        <button
          className="joinButton"
          data-testid="joinButton"
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
    </div>
  );
};

export default WaitingRoom;
