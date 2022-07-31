import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { replaceCapitalCamelcaseColorName } from "./App";

test("button has initial color", () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(button).toHaveStyle("background-color:MediumVioletRed");
});

test("button turns to blue when click it", () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  fireEvent.click(button);
  expect(button).toHaveStyle("background-color:MidnightBlue");
  expect(button).toHaveTextContent("Change to Medium Violet Red");
});

test("button and checkbox initial conditions", () => {
  render(<App />);

  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(button).toBeEnabled();

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("when checkbox checked, button should be disabled", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(button).toBeDisabled();
});

test("when checkbox unchecked, button should be enabled", () => {
  render(<App />);

  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(button).toBeEnabled();

  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  fireEvent.click(checkbox);

  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test("button turns gray when disabled", () => {
  render(<App />);

  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  fireEvent.click(checkbox);

  expect(button).toHaveStyle("background-color:gray");

  fireEvent.click(checkbox);
  expect(button).toHaveStyle("background-color:MediumVioletRed");

  fireEvent.click(checkbox);
  expect(button).toHaveStyle("background-color:gray");
});

describe("space before camel-case capital letters", () => {
  test("works for single word", () => {
    expect(replaceCapitalCamelcaseColorName("Red")).toBe("Red");
  });

  test("works for two camelcase words", () => {
    expect(replaceCapitalCamelcaseColorName("MidnightBlue")).toBe(
      "Midnight Blue"
    );
  });

  test("works for multiple camel case words", () => {
    expect(replaceCapitalCamelcaseColorName("MediumVioletRed")).toBe(
      "Medium Violet Red"
    );
  });
});
