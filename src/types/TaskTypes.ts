import { Dispatch, ReactNode, SetStateAction } from "react";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "to-do" | "in-progress" | "done";
};

export interface TaskControlsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  filterPriority: string;
  setFilterPriority: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export interface TaskState {
  tasks: Task[];
}

export interface TaskAction {
  type: "ADD_TASK" | "EDIT_TASK" | "DELETE_TASK"  | "REORDER_TASKS";
  payload: any;
}

export interface TaskCardProps {
  task: Task;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}