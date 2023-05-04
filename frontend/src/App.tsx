import Style from "./src/style/App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WaitingRoom from "./pages/WaitingRoom";
import JoinRoom from "./pages/JoinRoom";
import Question from "./pages/Question";
import FunFact from "./pages/FunFact";
import Results from "./pages/Results";
import CreateRoom from "./pages/CreateRoom";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { APIQuiz } from "./interfaces/APIQuiz";
import { mockQuiz } from "../tests/mocks/mockQuiz";

// const [currQuiz, setQuiz] = useState<APIQuiz>(mockQuiz);
// const [currNum, setNum] = useState<number>(0);
// const [correct, setCorr] = useState<boolean>(true);

function App() {
  const [currQuiz, setQuiz] = useState<APIQuiz>(mockQuiz);
  const [currNum, setNum] = useState<number>(0);
  const [correct, setCorr] = useState<boolean>(true);

  const [players, setPlayers] = useState<string[]>([]);
  const [myPlayer, setMyPlayer] = useState<string>("");

  return (
    //<button onClick=""></button>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/waitingroom"
            element={<WaitingRoom players={players} setPlayers={setPlayers} />}
          ></Route>
          <Route
            path="/joinroom"
            element={<JoinRoom setMyPlayer={setMyPlayer} />}
          ></Route>
          <Route
            path="/createroom"
            element={
              <CreateRoom setPlayers={setPlayers} setMyPlayer={setMyPlayer} />
            }
          ></Route>
          <Route
            path="/question"
            element={
              <Question
                questionNum={currNum}
                quiz={currQuiz}
                setCorrect={setCorr}
                myPlayer={myPlayer}
              />
            }
          ></Route>
          <Route
            path="/funfact"
            element={
              <FunFact
                questionNum={currNum}
                quiz={currQuiz}
                correct={correct}
                players={players}
              />
            }
          ></Route>
          <Route path="/results" element={<Results />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
