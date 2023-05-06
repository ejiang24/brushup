import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import { useNavigate } from "react-router-dom";
import CreateRoom from "../src/pages/CreateRoom";
import React, { useEffect, useState } from "react";
import { MemoryRouter } from "react-router-dom";

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  render(<App initPath="/createmockroom2" />);
  // // let navigate = useNavigate();
  // render(
  //   <MemoryRouter initialEntries={["/createmockroom"]}>
  //     <App />
  //   </MemoryRouter>
  // );
});

test("textCreateRoom", async () => {
  let user = userEvent.setup();
  let createButton = screen.getByTestId("createButton");

  let inputBox = screen.getByTestId("input");
  await userEvent.type(inputBox, "caroline");
  await user.click(createButton);
  expect(await screen.findByText("caroline")).toBeInTheDocument();
  let joinButton = screen.getByTestId("joinButton");
  await userEvent.click(joinButton);
  expect(await screen.findByText("Fav cs32 professor")).toBeInTheDocument();
  let answerButton = screen.getByTestId("answer1");
  await userEvent.click(answerButton);
  expect(await screen.findByText("Correct!")).toBeInTheDocument();
  let readyButton2 = screen.getByTestId("readyButton2");
  await userEvent.click(readyButton2);
  expect(
    await screen.findByText("Least favorite cs32 professor")
  ).toBeInTheDocument();
  let answerButton2 = screen.getByTestId("answer4");
  await userEvent.click(answerButton2);
  expect(
    await screen.findByText("Sorry! The correct answer was null.")
  ).toBeInTheDocument();
  let readyButton3 = screen.getByTestId("readyButton2");
  await userEvent.click(readyButton3);
  let returnButton = screen.getByTestId("returnButton");
  await userEvent.click(returnButton);
  expect(await screen.findByText("🖌Brush Up🦊")).toBeInTheDocument();
});
