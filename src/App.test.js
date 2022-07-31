import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has initial color', () => {
  render(<App />);
  const button = screen.getByRole("button", {name: "Change to blue"});
  expect(button).toHaveStyle('background-color:red');
});

test('button turns to blue when click it', ()=> {
  render(<App />)
  const button = screen.getByRole("button", {name: "Change to blue"})
  fireEvent.click(button)
  expect(button).toHaveStyle('background-color:blue')
  expect(button.textContent).toBe("Change to red")
});

test('button and checkbox initial conditions', () => {
  render(<App />)

  const button = screen.getByRole("button", {name: "Change to blue"})
  expect(button).toBeEnabled();

  const checkbox = screen.getByRole("checkbox")
  expect(checkbox).not.toBeChecked()
})

test("when checkbox checked, button should be disabled", ()=>{

  render(<App />)
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  const button = screen.getByRole("button", {name: "Change to blue"})
  expect(button).toBeDisabled();
})

test("when checkbox unchecked, button should be enabled", ()=>{
  render(<App />)

  const button = screen.getByRole("button", {name: "Change to blue"})
  expect(button).toBeEnabled();

  const checkbox = screen.getByRole("checkbox", {name: "Disable button"});
  fireEvent.click(checkbox)

  expect(button).toBeDisabled()

  fireEvent.click(checkbox)
  expect(button).toBeEnabled()
})

test("button turns gray when disabled", ()=>{
  render(<App />)

  const button = screen.getByRole("button", {name: "Change to blue"})
  const checkbox = screen.getByRole("checkbox", {name: "Disable button"})
  fireEvent.click(checkbox)

  expect(button).toHaveStyle('background-color:gray')

  fireEvent.click(checkbox)
  expect(button).toHaveStyle('background-color:red')

  fireEvent.click(checkbox)
  expect(button).toHaveStyle('background-color:gray')
})