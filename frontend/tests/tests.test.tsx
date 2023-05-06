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
  render(<App initPath="/createmockroom" />);
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
  expect(
    await screen.findByText("caroline")
  ).toBeInTheDocument();


});