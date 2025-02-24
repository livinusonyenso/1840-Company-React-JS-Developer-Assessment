import { render, screen, fireEvent } from "@testing-library/react";
import { TaskProvider } from "../../context/TaskContext";
import TaskModal from "./TaskModal";
import { Task } from "../../types/TaskTypes";
import { useTaskContext } from "../../context/TaskContext";

jest.mock("../../context/TaskContext", () => ({
  useTaskContext: jest.fn(),
}));

describe("TaskModal Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useTaskContext as jest.Mock).mockReturnValue({ dispatch: mockDispatch });
  });

  const mockTask: Task = {
    id: '1',
    title: "Sample Task",
    description: "This is a test task",
    dueDate: "2025-03-01",
    priority: "medium",
    status: "to-do",
  };

  test("renders modal with task details", () => {
    render(
      <TaskProvider>
        <TaskModal task={mockTask} onClose={jest.fn()} />
      </TaskProvider>
    );

    expect(screen.getByText("Sample Task")).toBeInTheDocument();
    expect(screen.getByText("This is a test task")).toBeInTheDocument();
    expect(screen.getByText("Due Date: 2025-03-01")).toBeInTheDocument();
    expect(screen.getByLabelText("Status:")).toHaveValue("to-do");
    expect(screen.getByLabelText("Priority:")).toHaveValue("medium");
  });

  test("calls dispatch when status is changed", () => {
    render(
      <TaskProvider>
        <TaskModal task={mockTask} onClose={jest.fn()} />
      </TaskProvider>
    );

    const statusSelect = screen.getByLabelText("Status:");
    fireEvent.change(statusSelect, { target: { value: "in-progress" } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "EDIT_TASK",
      payload: { ...mockTask, status: "in-progress" },
    });
  });

  test("calls dispatch when priority is changed", () => {
    render(
      <TaskProvider>
        <TaskModal task={mockTask} onClose={jest.fn()} />
      </TaskProvider>
    );

    const prioritySelect = screen.getByLabelText("Priority:");
    fireEvent.change(prioritySelect, { target: { value: "high" } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "EDIT_TASK",
      payload: { ...mockTask, priority: "high" },
    });
  });

  test("closes the modal when close button is clicked", () => {
    const mockOnClose = jest.fn();

    render(
      <TaskProvider>
        <TaskModal task={mockTask} onClose={mockOnClose} />
      </TaskProvider>
    );

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test("does not render if task is null", () => {
    const { container } = render(
      <TaskProvider>
        <TaskModal task={null as unknown as Task} onClose={jest.fn()} />
      </TaskProvider>
    );

    expect(container.firstChild).toBeNull();
  });
});
