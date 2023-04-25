import React from "react";
import Style from "./src/style/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import WaitingRoom from "./components/WaitingRoom";
import JoinRoom from "./components/JoinRoom";
import Question from "./components/Question";
import FunFact from "./components/FunFact";
import Results from "./components/Results";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";


function App() {
  return (
    //<button onClick=""></button>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/waitingroom" element={<WaitingRoom />}></Route>
          <Route path="/joinroom" element={<JoinRoom />}></Route>
          <Route path="/question" element={<Question />}></Route>
          <Route path="/funfact" element={<FunFact />}></Route>
          <Route path="/results" element={<Results />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
