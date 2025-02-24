import React from "react";
import { TaskControlsProps } from "../../types/TaskTypes";

const TaskControls: React.FC<TaskControlsProps> = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  sortBy,
  setSortBy,
}) => {

  return (
    <div className="task-controls">
      <input
        type="text"
        placeholder="Search by title or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="">Filter by All Status</option>
        <option value="to-do">To-Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
      >
        <option value="">Filter by All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort All By</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
  
};

export default TaskControls;
