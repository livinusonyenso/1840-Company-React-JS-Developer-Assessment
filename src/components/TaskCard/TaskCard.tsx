import React, { useState } from "react";
import { TaskCardProps } from "../../types/TaskTypes";
import { useTaskContext } from "../../context/TaskContext";
import TaskModal from "../TaskModal/TaskModal";

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { dispatch } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}
          >
            ❌ Delete
          </button>
        </div>
      </div>

      {isModalOpen && (
        <TaskModal task={task} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default TaskCard;
