import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";

describe("Greeting component", () => {
  test("renders Hello World as a text", () => {
    render(<Greeting />);
    const helloWorldElement = screen.getByText(/Hello world/i);
    expect(helloWorldElement).toBeInTheDocument();
  });
  test("renders click button when button is not clicked", () => {
    render(<Greeting />);
    const element = screen.getByText("click button", { exact: false });
    expect(element).toBeInTheDocument();
  });
  test("renders good to see you when button is clicked", () => {
    render(<Greeting />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const element = screen.getByText("good to see", { exact: false });
    expect(element).toBeInTheDocument();
  });
  test("not renders click button when button is clicked", () => {
    render(<Greeting />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const element = screen.queryByText("click button", { exact: false });
    expect(element).toBeNull();
  });
});
