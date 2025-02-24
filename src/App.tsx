import React from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskList from "./components/TaskList/TaskList";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./App.css";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <TaskProvider>
        <div className="app-container">
          <TaskList />
        </div>
      </TaskProvider>
    </ErrorBoundary>
  );
};

export default App;
