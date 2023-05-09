import "@testing-library/jest-dom";
import { getAllByTestId, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

/*
This tests when a user attempts to join a room, but the server is not running and no room has been created.
*/
test("join with no server", async () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  render(<App initPath="/joinroom" />);
  render;

  let user = userEvent.setup();
  let joinButton = screen.getByTestId("joinPageJoinButton");
  let codeInput = screen.getByTestId("codeInput");
  let nameInput = screen.getByTestId("nameInput");

  await userEvent.type(codeInput, "1111");
  await userEvent.type(nameInput, "team edward 4eva");
  await user.click(joinButton);

  expect(
    await screen.findByText(
      "Sorry! A room with that code does not exist. Please try again."
    )
  ).toBeInTheDocument();
});

/*
This tests when a user attempts to join a room with an invalid code.
*/
test("join with no room started", async () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
    render(<App initPath="/joinroom" />);
    render

    let user = userEvent.setup();
    let joinButton = screen.getByTestId("joinPageJoinButton");
    let codeInput = screen.getByTestId("codeInput");

    await userEvent.type(codeInput, "1112");
    await user.click(joinButton);

    expect(
      await screen.findByText(
        "Sorry! A room with that code does not exist. Please try again."
      )
    ).toBeInTheDocument();
});

/*
This tests when a user attempts to create a room, but the server is not running.
*/
test("create with no server", async() => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
    render(<App initPath="/createroom" />);

    let user = userEvent.setup();
    let createButton = screen.getByTestId("createButton");
    let nameInput = screen.getByTestId("input");

    await userEvent.type(nameInput, "timothee")
    await user.click(createButton);

    expect(
        await screen.findByText(
            "There is an issue with the server. Please try again later!"
        )
    ).toBeInTheDocument();
})

/*
This tests when a user attempts to create a room but has not input a name.
*/
test("create with no name", async () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  render(<App initPath="/createmockroom" />);

  let user = userEvent.setup();
  let createButton = screen.getByTestId("createButton");

  await user.click(createButton);

  expect(await screen.findByText("Please enter a name.")).toBeInTheDocument();
});

/*
This tests when a user attempts to join a valid room but has not input a name.
*/
test("join with no name", async () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  render(<App initPath="/createmockroom" />);

  let user = userEvent.setup();
  let createButton = screen.getByTestId("createButton");
  let inputBox = screen.getByTestId("input");
  await userEvent.type(inputBox, "caroline");
  await user.click(createButton);

  render(<App initPath="/joinroom" />);
  let codeInput = screen.getByTestId("codeInput");

  await userEvent.type(codeInput, "1111");

  let joinButton = screen.getByTestId("joinPageJoinButton");
  await user.click(joinButton);

  expect(
    await screen.findByText("Please enter a player name.")
  ).toBeInTheDocument();
});
