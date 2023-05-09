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
  render(<App initPath="/" />);
  // // let navigate = useNavigate();
  // render(
  //   <MemoryRouter initialEntries={["/createmockroom"]}>
  //     <App />
  //   </MemoryRouter>
  // );

});

test("textCreateRoom", async () => {

  let user = userEvent.setup();
  let joinButton1 = screen.getByTestId("joinButton");
 await user.click(joinButton1);
  let inputBox = screen.getByTestId("joinNameInput");
  await userEvent.type(inputBox, "charlie");
  let inputBox2 = screen.getByTestId("joinCodeInput");
  await userEvent.type(inputBox2, "1111");
  let joinButton2 = screen.getByTestId("joinButton");
  await user.click(joinButton2);
  
  expect(
    await screen.findByText("charlie")
  ).toBeInTheDocument();
  
    let joinButton = screen.getByTestId("joinButton");
  await userEvent.click(joinButton);
  expect(
    await screen.findByText("What is Taylor Swift's most recent album?")
  ).toBeInTheDocument();
  let answerButton = screen.getByTestId("answer3");
  await userEvent.click(answerButton);
  expect(
    await screen.findByText("Correct!")
  ).toBeInTheDocument();
  let readyButton2 = screen.getByTestId("readyButton2");
  await userEvent.click(readyButton2);
   expect(
     await screen.findByText("What is the best Starbucks order?")
   ).toBeInTheDocument();
   let answerButton2 = screen.getByTestId("answer4");
   await userEvent.click(answerButton2);
    expect(
      await screen.findByText("Sorry! The correct answer was vsccb.")
    ).toBeInTheDocument();
     let readyButton3 = screen.getByTestId("readyButton2");
     await userEvent.click(readyButton3);
     let returnButton = screen.getByTestId("returnButton");
    await userEvent.click(returnButton);
    expect(await screen.findByText("🖌Brush Up🦊")).toBeInTheDocument();





});



