import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders successfully", () => {
    render(<App />);
    expect(document.querySelector("#headerText")).toBeInTheDocument();
    expect(document.querySelector("#search_input")).toBeInTheDocument();
    expect(document.querySelector("#search_button")).toBeInTheDocument();
    expect(document.querySelector(".gallery")).toBeInTheDocument();
  });

  it("calls search handler when form is submitted", () => {
    const searchHandler = jest.fn();
    const { getByTestId, getByText } = render(<App />);
    const formElement = getByTestId("form");
    formElement.onsubmit = searchHandler;
    const inputElement = getByTestId("search_input");
    fireEvent.change(inputElement, { target: { value: "chuck norris" }});
    fireEvent.click(getByText(/search/i));
    expect(searchHandler).toHaveBeenCalledTimes(1);
  });

  it("when clear search is clicked", () => {
    const { getByTestId, getByText } = render(<App />);
    const inputElement = getByTestId("search_input");
    fireEvent.change(inputElement, { target: { value: "chuck norris" }});
    fireEvent.click(getByText(/search/i));
    fireEvent.click(getByText(/Clear/i));
    expect(screen.getByTestId("search_input")).toHaveValue("");
  });
});
