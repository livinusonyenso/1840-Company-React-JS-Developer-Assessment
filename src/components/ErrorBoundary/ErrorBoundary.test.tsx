import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const ErrorComponent = () => {
  throw new Error("Test error");
};

test("displays error message when a component crashes", () => {
  render(
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>
  );

  expect(screen.getByText("Something went wrong 😢")).toBeInTheDocument();
});
