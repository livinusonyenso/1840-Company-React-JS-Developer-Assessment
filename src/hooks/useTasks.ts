import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

export const useTaskList = () => {
  const { state, dispatch } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredTasks = state.tasks
    .filter((task) =>
      searchTerm
        ? task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .filter((task) => (filterStatus ? task.status === filterStatus : true))
    .filter((task) =>
      filterPriority ? task.priority === filterPriority : true
    );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate")
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    if (sortBy === "priority") {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (targetTaskId: string) => {
    if (!draggedTaskId || draggedTaskId === targetTaskId) return;

    const updatedTasks = [...state.tasks];
    const draggedIndex = updatedTasks.findIndex(
      (task) => task.id === draggedTaskId
    );
    const targetIndex = updatedTasks.findIndex(
      (task) => task.id === targetTaskId
    );

    const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(targetIndex, 0, draggedTask);

    dispatch({ type: "REORDER_TASKS", payload: updatedTasks });
    setDraggedTaskId(null);
  };

  return {
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy,
    sortedTasks,
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
};
