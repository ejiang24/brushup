import React from "react";
import Style from "./src/style/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import WaitingRoom from "./components/WaitingRoom";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

{/* <Routes>
  <Route index element={<Home />} />
  <Route path="/waitingroom" element={<WaitingRoom />} />
  /* <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/blogs" element={<Blogs />} />
  <Route path="/sign-up" element={<SignUp />} /> 
</Routes>; */}


function App() {
  return (
    //<button onClick=""></button>
    <div>
      <BrowserRouter>
        
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/waitingroom">Waiting Room</Link>
          </li>
        
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/waitingroom" element={<WaitingRoom />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
