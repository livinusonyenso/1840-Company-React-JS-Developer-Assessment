import { render, screen } from "@testing-library/react";
import { TaskProvider, useTaskContext } from "./TaskContext";
import "@testing-library/jest-dom";

const TestComponent = () => {
  const { state } = useTaskContext();
  return <p>Task count: {state.tasks.length}</p>;
};

test("TaskProvider initializes with empty tasks", () => {
  render(
    <TaskProvider>
      <TestComponent />
    </TaskProvider>
  );

  expect(screen.getByText("Task count: 0")).toBeInTheDocument();
});
