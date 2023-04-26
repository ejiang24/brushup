import Style from "./src/style/App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import WaitingRoom from "./components/WaitingRoom";
import JoinRoom from "./components/JoinRoom";
import Question from "./components/Question";
import FunFact from "./components/FunFact";
import Results from "./components/Results";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { APIQuiz } from "./interfaces/APIQuiz";
import { mockQuiz } from "../tests/mocks/mockQuiz";

let currQuiz = mockQuiz;
let currNum = 0;
let correct = true;

function App() {
  return (
    //<button onClick=""></button>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/waitingroom" element={<WaitingRoom />}></Route>
          <Route path="/joinroom" element={<JoinRoom />}></Route>
          <Route path="/question" element={<Question questionNum={currNum} quiz={currQuiz} correct={correct}/>}></Route>
          <Route path="/funfact" element={<FunFact questionNum={currNum} quiz={currQuiz} correct={correct}/>}></Route>
          <Route path="/results" element={<Results />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
