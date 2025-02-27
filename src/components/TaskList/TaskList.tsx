import TaskForm from "../TaskForm/TaskForm";
import React, { useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { useTaskList } from "../../hooks/useTasks";
import TaskControls from "../TaskControl/TaskControls";
import TaskCard from "../TaskCard/TaskCard";
import TaskModal from "../TaskModal/TaskModal";
import { Task } from "../../types/TaskTypes";

const TaskList: React.FC = () => {
  const { state } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Task>({} as Task);

  const {
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
  } = useTaskList();

  return (
    <div className="task-list">
      <h1>Task Manager</h1>

      {state?.tasks.length === 0 ? (
        <div className="text-center">
          <p>No tasks available. Add a new task below.</p>
          <TaskForm />
        </div>
      ) : (
        <div className="flex">
          <TaskForm />

          <div className="task-list-container">
            <TaskControls
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterPriority={filterPriority}
              setFilterPriority={setFilterPriority}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            <div className="task-list">
              {sortedTasks.length > 0 ? (
                sortedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="draggable-task"
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(task.id)}
                    onClick={() => setModalData(task)}
                  >
                    <TaskCard task={task} setIsModalOpen={setIsModalOpen} />
                  </div>
                ))
              ) : (
                <p className="no-tasks">No tasks found.</p>
              )}
            </div>

            {isModalOpen && (
              <TaskModal
                task={modalData}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
