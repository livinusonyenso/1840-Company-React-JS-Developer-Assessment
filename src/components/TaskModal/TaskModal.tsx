import React from "react";
import { TaskModalProps } from "../../types/TaskTypes";
import { useTaskContext } from "../../context/TaskContext";

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
  const { dispatch } = useTaskContext();

  if (!task) return null;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "EDIT_TASK",
      payload: { ...task, status: e.target.value },
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "EDIT_TASK",
      payload: { ...task, priority: e.target.value },
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>
          <strong>Due Date:</strong> {task.dueDate}
        </p>

        <label>Status:</label>
        <select value={task.status} onChange={handleStatusChange}>
          <option value="to-do">To-Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <label>Priority:</label>
        <select value={task.priority} onChange={handlePriorityChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
