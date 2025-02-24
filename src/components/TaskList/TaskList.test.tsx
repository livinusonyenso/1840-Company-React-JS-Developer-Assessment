import { render, screen, fireEvent } from "@testing-library/react";
import { TaskProvider } from "../../context/TaskContext";
import TaskList from "./TaskList";
import { useTaskList } from "../../hooks/useTasks";

jest.mock("../../hooks/useTasks", () => ({
  useTaskList: jest.fn(),
}));

describe("TaskList Component", () => {
  const mockTaskList = {
    searchTerm: "",
    setSearchTerm: jest.fn(),
    filterStatus: "",
    setFilterStatus: jest.fn(),
    filterPriority: "",
    setFilterPriority: jest.fn(),
    sortBy: "",
    setSortBy: jest.fn(),
    sortedTasks: [],
    handleDragStart: jest.fn(),
    handleDragOver: jest.fn(),
    handleDrop: jest.fn(),
  };

  beforeEach(() => {
    (useTaskList as jest.Mock).mockReturnValue(mockTaskList);
  });

  test("renders task manager header", () => {
    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    );

    expect(screen.getByText("Task Manager")).toBeInTheDocument();
  });

  test("displays 'No tasks available' message when task list is empty", () => {
    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    );

    expect(
      screen.getByText("No tasks available. Add a new task below.")
    ).toBeInTheDocument();
  });

  test("renders task cards when tasks are available", () => {
    (useTaskList as jest.Mock).mockReturnValue({
      ...mockTaskList,
      sortedTasks: [
        { id: 1, title: "Task 1", description: "Description 1", dueDate: "2025-03-01", priority: "medium", status: "to-do" },
        { id: 2, title: "Task 2", description: "Description 2", dueDate: "2025-03-02", priority: "high", status: "in-progress" },
      ],
    });

    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  test("calls drag-and-drop handlers", () => {
    (useTaskList as jest.Mock).mockReturnValue({
      ...mockTaskList,
      sortedTasks: [{ id: 1, title: "Task 1", description: "Description 1", dueDate: "2025-03-01", priority: "medium", status: "to-do" }],
    });

    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    );

    const draggableTask = screen.getByText("Task 1").closest(".draggable-task");
    
    fireEvent.dragStart(draggableTask!);
    fireEvent.dragOver(draggableTask!);
    fireEvent.drop(draggableTask!);

    expect(mockTaskList.handleDragStart).toHaveBeenCalledWith(1);
    expect(mockTaskList.handleDragOver).toHaveBeenCalled();
    expect(mockTaskList.handleDrop).toHaveBeenCalledWith(1);
  });

  test("renders task controls for filtering and sorting", () => {
    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    );

    expect(screen.getByPlaceholderText("Search by title or description...")).toBeInTheDocument();
    expect(screen.getByText("Filter by All Status")).toBeInTheDocument();
    expect(screen.getByText("Filter by All Priority")).toBeInTheDocument();
    expect(screen.getByText("Sort All By")).toBeInTheDocument();
  });
});
