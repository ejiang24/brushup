import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

/*
This tests a generic run through of creating a room using a mocked quiz, selecting incorrect and correct answers,
and returning to the home page at the end of the quiz to begin a new game.
*/
test("textCreateRoom", async () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  render(<App initPath="/createmockroom" />);
  
  let user = userEvent.setup();
  let createButton = screen.getByTestId("createButton");
  let inputBox = screen.getByTestId("input");
  await userEvent.type(inputBox, "caroline");
  await user.click(createButton);
  expect(
    await screen.findByText("caroline")
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



