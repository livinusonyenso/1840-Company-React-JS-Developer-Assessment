import React, { createContext, useContext, ReactNode } from "react";
import { TaskAction, TaskState } from "../types/TaskTypes";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState: TaskState = { tasks: [] };

export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "ADD_TASK":
      return { tasks: [...state.tasks, action.payload] };
    case "EDIT_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "REORDER_TASKS":
      return { tasks: action.payload };
    default:
      return state;
  }
};

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}>({ state: initialState, dispatch: () => null });

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useLocalStorage("tasks", taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
