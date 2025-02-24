import React, { useState } from "react";
import { Task } from "../../types/TaskTypes";
import { useTaskContext } from "../../context/TaskContext";

const TaskForm: React.FC = () => {

  const { dispatch } = useTaskContext();
  
  const [task, setTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "to-do",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    if (!task.title.trim() || !task.description.trim() || !task.dueDate) {
      alert("Please fill in all fields.");
      return;
    }
    dispatch({ type: "ADD_TASK", payload: { id: Math.random(), ...task } });
    setTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      status: "to-do",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Add New Task</h2>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        required
      />

      <label>Priority:</label>
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
