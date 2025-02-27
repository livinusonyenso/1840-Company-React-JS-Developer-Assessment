import React from "react";
import { TaskCardProps } from "../../types/TaskTypes";
import { useTaskContext } from "../../context/TaskContext";

const TaskCard: React.FC<TaskCardProps> = ({ task, setIsModalOpen }) => {
  const { dispatch } = useTaskContext();

  return (
    <>
      <div
        className={`task-card task-card-${task.priority}`}
        onClick={() => setIsModalOpen(true)}
      >
        <h3>{task.title}</h3>
        <p>{task.description}</p>

        <p className="task-meta">
          <span>
            <b>Due: </b>
            {task.dueDate}
          </span>
        </p>
        <p className="task-meta">
          <span>
            <b>Status: </b>
            {task.status}
          </span>
        </p>

        <div className="task-meta">
          <span className={`priority priority-${task.priority}`}>
            {task.priority.toUpperCase()}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "DELETE_TASK", payload: task.id });
            }}
          >
            ❌ Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
