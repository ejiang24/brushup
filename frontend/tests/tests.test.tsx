import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import { useNavigate } from "react-router-dom";
import CreateRoom from "../src/pages/CreateRoom";
import React, { useEffect, useState } from "react";
import { MemoryRouter } from "react-router-dom";

// const [players, setPlayers] = useState<string[]>([]);
// const [myPlayer, setMyPlayer] = useState<string>("");

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  render(
    <MemoryRouter initialEntries={["/createmockroom"]}>
      <App />
    </MemoryRouter>
  );

});

test("textCreateRoom", async () => {
  let user = userEvent.setup();
  // let navigate = useNavigate();
  // navigate("/createmockroom");
  
  // render(
  //   <CreateRoom
  //     setPlayers={setPlayers}
  //     setMyPlayer={setMyPlayer}
  //     mock={true}
  //   ></CreateRoom>
  // );
  let createButton = screen.getByTestId("createButton");
  let inputBox = screen.getByTestId("input");
  await userEvent.type(inputBox, "caroline");
  await user.click(createButton);
  expect(
    await screen.findByText("caroline")
    ).toBeInTheDocument();

  //   await userEvent.type(input, "test");
  //   await user.click(button);
  //   expect(
  //     await screen.findByText("New function was correctly registered!")
  //   ).toBeInTheDocument();
});