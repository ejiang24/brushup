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
import { MemoryRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { APIQuiz } from "./interfaces/APIQuiz";
import { mockQuiz } from "../tests/mocks/mockQuiz";

/**
 * This is the app where the program and router are set up!
 */

interface AppProps {
  initPath: string;
}

function App(props: AppProps) {
  const [currNum, setNum] = useState<number>(0);
  const [correct, setCorr] = useState<boolean>(true);

  const [players, setPlayers] = useState<string[]>([]);
  const [myPlayer, setMyPlayer] = useState<string>("");

  return (
    //<button onClick=""></button>
    <div>
      <MemoryRouter initialEntries={[props.initPath]}>
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
              <CreateRoom
                setPlayers={setPlayers}
                setMyPlayer={setMyPlayer}
                mock={false}
                quiz1={false}
              />
            }
          ></Route>
          <Route
            path="/createmockroom"
            element={
              <CreateRoom
                setPlayers={setPlayers}
                setMyPlayer={setMyPlayer}
                mock={true}
                quiz1={true}
              />
            }
          ></Route>
          <Route
            path="/createmockroom2"
            element={
              <CreateRoom
                setPlayers={setPlayers}
                setMyPlayer={setMyPlayer}
                mock={true}
                quiz1={false}
              />
            }
          ></Route>
          <Route
            path="/question"
            element={
              <Question
                questionNum={currNum}
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
                correct={correct}
                players={players}
                myPlayer={myPlayer}
              />
            }
          ></Route>
          <Route
            path="/results"
            element={<Results myPlayer={myPlayer} />}
          ></Route>
        </Routes>
      </MemoryRouter>
    </div>
  );
}

export default App;
