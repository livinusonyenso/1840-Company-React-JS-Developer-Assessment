import { render, screen, fireEvent } from "@testing-library/react";
import TaskControls from "./TaskControls";

describe("TaskControls Component", () => {
  let mockSetSearchTerm: jest.Mock;
  let mockSetFilterStatus: jest.Mock;
  let mockSetFilterPriority: jest.Mock;
  let mockSetSortBy: jest.Mock;

  beforeEach(() => {
    mockSetSearchTerm = jest.fn();
    mockSetFilterStatus = jest.fn();
    mockSetFilterPriority = jest.fn();
    mockSetSortBy = jest.fn();

    render(
      <TaskControls
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        filterStatus=""
        setFilterStatus={mockSetFilterStatus}
        filterPriority=""
        setFilterPriority={mockSetFilterPriority}
        sortBy=""
        setSortBy={mockSetSortBy}
      />
    );
  });

  test("renders search input and dropdowns", () => {
    expect(
      screen.getByPlaceholderText("Search by title or description...")
    ).toBeInTheDocument();
    expect(screen.getByText("Filter by All Status")).toBeInTheDocument();
    expect(screen.getByText("Filter by All Priority")).toBeInTheDocument();
    expect(screen.getByText("Sort All By")).toBeInTheDocument();
  });

  test("allows users to type in the search input", () => {
    const searchInput = screen.getByPlaceholderText(
      "Search by title or description..."
    );

    fireEvent.change(searchInput, { target: { value: "Test Task" } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("Test Task");
  });

  test("allows users to filter by status", () => {
    const statusDropdown = screen.getByText("Filter by All Status");

    fireEvent.change(statusDropdown, { target: { value: "in-progress" } });

    expect(mockSetFilterStatus).toHaveBeenCalledWith("in-progress");
  });

  test("allows users to filter by priority", () => {
    const priorityDropdown = screen.getByText("Filter by All Priority");

    fireEvent.change(priorityDropdown, { target: { value: "high" } });

    expect(mockSetFilterPriority).toHaveBeenCalledWith("high");
  });

  test("allows users to sort tasks", () => {
    const sortDropdown = screen.getByText("Sort All By");

    fireEvent.change(sortDropdown, { target: { value: "dueDate" } });

    expect(mockSetSortBy).toHaveBeenCalledWith("dueDate");
  });
});