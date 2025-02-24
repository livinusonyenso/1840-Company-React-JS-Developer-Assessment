import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "./TaskCard";
import { TaskProvider } from "../../context/TaskContext";
import { Task } from "../../types/TaskTypes";

const mockTask: Task = {
  id: "1",
  title: "Test Task",
  description: "This is a test task",
  dueDate: "2025-02-28",
  priority: "high",
  status: "to-do",
};

describe("TaskCard Component", () => {
  test("renders task details correctly", () => {
    render(
      <TaskProvider>
        <TaskCard task={mockTask} />
      </TaskProvider>
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("This is a test task")).toBeInTheDocument();
    expect(screen.getByText("Due: 2025-02-28")).toBeInTheDocument();
    expect(screen.getByText("Status: to-do")).toBeInTheDocument();
    expect(screen.getByText("HIGH")).toBeInTheDocument();
  });

  test("opens modal when clicking on the task", () => {
    render(
      <TaskProvider>
        <TaskCard task={mockTask} />
      </TaskProvider>
    );

    fireEvent.click(screen.getByText("Test Task"));
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  test("deletes task when delete button is clicked", () => {
    const { container } = render(
      <TaskProvider>
        <TaskCard task={mockTask} />
      </TaskProvider>
    );

    const deleteButton = screen.getByText("❌ Delete");
    fireEvent.click(deleteButton);

    expect(container).not.toHaveTextContent("Test Task");  
  });
});
