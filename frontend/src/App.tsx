import React from "react";
import Style from "./src/style/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import WaitingRoom from "./components/WaitingRoom";

// import * as React from "react";
// import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// const root = createRoot(document.getElementById("root"));

// root.render(
//   <BrowserRouter>{/* The rest of your app goes here */}</BrowserRouter>
// );


function App() {
  return (
    //<button onClick=""></button>
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/waitingroom" element={<WaitingRoom />} />
          {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/sign-up" element={<SignUp />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
