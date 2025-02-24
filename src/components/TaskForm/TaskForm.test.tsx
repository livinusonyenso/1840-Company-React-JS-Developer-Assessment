import { render, screen, fireEvent } from "@testing-library/react";
import { TaskProvider } from "../../context/TaskContext";
import TaskForm from "./TaskForm";

describe("TaskForm Component", () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();

    render(
      <TaskProvider>
        <TaskForm />
      </TaskProvider>
    );
  });

  test("renders form elements correctly", () => {
    expect(screen.getByText("Add New Task")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Task Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Task Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Priority:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument();
  });

  test("prevents submission if fields are empty", () => {
    const submitButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields.");
  });

  test("allows users to input task details", () => {
    fireEvent.change(screen.getByPlaceholderText("Task Title"), {
      target: { value: "New Task" },
    });

    fireEvent.change(screen.getByPlaceholderText("Task Description"), {
      target: { value: "This is a test task" },
    });

    fireEvent.change(screen.getByLabelText("Priority:"), {
      target: { value: "high" },
    });

    expect(screen.getByPlaceholderText("Task Title")).toHaveValue("New Task");
    expect(screen.getByPlaceholderText("Task Description")).toHaveValue("This is a test task");
    expect(screen.getByLabelText("Priority:")).toHaveValue("high");
  });

  test("dispatches ADD_TASK when submitting a valid task", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    fireEvent.change(screen.getByPlaceholderText("Task Title"), {
      target: { value: "New Task" },
    });

    fireEvent.change(screen.getByPlaceholderText("Task Description"), {
      target: { value: "This is a test task" },
    });

    fireEvent.change(screen.getByLabelText("Priority:"), {
      target: { value: "high" },
    });

    fireEvent.change(screen.getByRole("textbox", { name: /dueDate/i }), {
      target: { value: "2025-03-01" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_TASK",
      payload: expect.objectContaining({
        title: "New Task",
        description: "This is a test task",
        dueDate: "2025-03-01",
        priority: "high",
        status: "to-do",
      }),
    });
  });
});
