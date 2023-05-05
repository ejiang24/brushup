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
  //todo: change to name state
  // const [players, setPlayers] = React.useState([socket.id]);
  //todo: the synchronisity is breaking the name thing
  let navigate = useNavigate();
  const [disabled, setDisabled] = React.useState(false);

  // const playerItems = props.players.map((player) => {
  //   console.log("making a new player <p>");
  //   console.log(player);
  //   return (
  //     <p>
  //     {player}
  //     </p>
  //   );
  // });
  


  //   //API CALL
  //   async function getConvertedData(): Promise<APIQuiz> {
  //  let response: Response = await fetch("http://localhost:3233/dummy");
  //   let serverResponse: APIQuiz = await response.json();
  //    return new Promise<APIQuiz>((resolve) => {
  //     if (serverResponse.result === "success") {
  //       if (serverResponse.quiz) {
  //         if (serverResponse.quiz.length>0) {

  //             resolve(serverResponse);
  //             socket.emit(
  //               "server-response",
  //               serverResponse.quiz[0].question,
  //               serverResponse.quiz[0].answer,
  //               serverResponse.quiz[0].corrAns
  //             );
  //           }
  //         }
  //       }
  //      else {
  //       console.log("Error: " + serverResponse.result);
  //       //IDK//resolve({ type: "FeatureCollection", features: [] });
  //     }
  //   });
  // }

  // //API CALL

  React.useEffect(() => {
    socket.off("joined_room").on("joined_room", (data) => {
      console.log("joined_room received");
      console.log("data:"+ data);
      props.setPlayers(data);
    });

    socket.on("next_question", (firstQ) => {
      // getConvertedData();
      console.log("start game received, first question is...");
      console.log(firstQ);
      navigate("/question", { state: { currQ: firstQ } });
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

        <div className="players" dangerouslySetInnerHTML={{__html:playersInnerHTML}}>
        </div>

        {/* <Link to="/question" className="buttonLink">
         <button className="joinButton">
           <div className="buttonText">ready!</div>
         </button>
       </Link> */}

        <button
          className="joinButton"
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
