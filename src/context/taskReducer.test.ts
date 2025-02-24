import { taskReducer } from "./TaskContext";
import { TaskState, TaskAction } from "../types/TaskTypes";

describe("Task Reducer", () => {
  const initialState: TaskState = { tasks: [] };

  test("should add a task", () => {
    const action: TaskAction = {
      type: "ADD_TASK",
      payload: { id: "1", title: "Test Task", description: "Test Desc", dueDate: "2025-02-25", priority: "high", status: "to-do" }
    };

    const newState = taskReducer(initialState, action);
    expect(newState.tasks.length).toBe(1);
    expect(newState.tasks[0].title).toBe("Test Task");
  });

  test("should edit a task", () => {
    const initialState: TaskState = {
      tasks: [{ id: "1", title: "Old Title", description: "Old Desc", dueDate: "2025-02-25", priority: "medium", status: "to-do" }]
    };

    const action: TaskAction = {
      type: "EDIT_TASK",
      payload: { id: "1", title: "New Title" }
    };

    const newState = taskReducer(initialState, action);
    expect(newState.tasks[0].title).toBe("New Title");
  });

  test("should delete a task", () => {
    const initialState: TaskState = {
      tasks: [{ id: "1", title: "Task to Delete", description: "Some Desc", dueDate: "2025-02-25", priority: "low", status: "to-do" }]
    };

    const action: TaskAction = { type: "DELETE_TASK", payload: "1" };
    const newState = taskReducer(initialState, action);
    expect(newState.tasks.length).toBe(0);
  });
});
