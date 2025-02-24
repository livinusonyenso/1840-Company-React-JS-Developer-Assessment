# 📝 Task Management App

A simple and efficient **Task Management Application** built with **React, TypeScript, and Context API**. It allows users to **add, edit, delete, filter, sort, and manage tasks** with an intuitive drag-and-drop feature.

## ✨ Features

✅ **Add New Tasks** (Title, Description, Due Date, Priority, Status)  
✅ **View Task Details in a Modal**  
✅ **Edit Task Status & Priority**  
✅ **Delete Tasks**  
✅ **Filter Tasks by Status & Priority**  
✅ **Sort Tasks by Due Date & Priority**  
✅ **Drag and Drop Tasks to Reorder**  
✅ **Search Tasks by Title & Description**  
✅ **Persist Data with Context API**  
✅ **Error Handling with Error Boundaries**  
✅ **Unit & Integration Tests (Jest & React Testing Library)**  

---

## ⚡ Tech Stack

- **Frontend:** React (TypeScript), Context API  
- **State Management:** Context API  
- **Styling:** CSS  
- **Testing:** Jest, React Testing Library  
- **Build Tool:** Vite  

---

## 🚀 Getting Started

### 1⃣ **Clone the Repository**
```sh
git clone https://github.com/livinusonyenso/1840-Company-React-JS-Developer-Assessment.git
cd 1840-Company-React-JS-Developer-Assessment
```

### 2⃣ **Install Dependencies**
```sh
npm install
```

### 3⃣ **Run the Development Server**
```sh
npm run dev
```
This starts the app at **http://localhost:5173/** (Vite default).

---

## 🎮 How to Use

### 🏰 Adding a Task
1. Enter task **Title, Description, Due Date**  
2. Select **Priority (Low, Medium, High)**  
3. Click **"Add Task"**  

### 🔍 Searching Tasks
- Use the search bar to **find tasks by title or description**.

### 🔄 Filtering & Sorting
- **Filter by Status:** To-Do, In Progress, Done  
- **Filter by Priority:** Low, Medium, High  
- **Sort by:** Due Date or Priority  

### 🎯 Editing a Task
1. Click on a task to **open the modal**  
2. Change **Status or Priority**  
3. Changes are **auto-saved**  

### 🛢 Deleting a Task
- Click the **"❌ Delete"** button  

### 🖀 Drag and Drop
- Drag tasks to **reorder them**  

---

## ✅ Running Tests

### 🧪 Run Unit & Integration Tests
```sh
npm test
```

### 🔍 Debugging Test Issues
- Ensure Jest is installed:
  ```sh
  npm install --save-dev jest @testing-library/react @testing-library/jest-dom
  ```
- Run tests with **watch mode**:
  ```sh
  npm test --watch
  ```

---

## 🛠 Folder Structure

```
📺 src
 ├📂 components
 ┃ ├📂 TaskForm       # Task creation form
 ┃ ├📂 TaskCard       # Individual task UI
 ┃ ├📂 TaskList       # Main task list UI
 ┃ ├📂 TaskModal      # Task details modal
 ┃ ├📂 TaskControls   # Search, filter, and sort controls
 ┃ ├📂 ErrorBoundary  # Error handling
 ├📂 context
 ┃ └📝 TaskContext.ts # Context API for state management
 ├📂 hooks
 ┃ └📝 useTasks.ts    # Custom hook for task operations
 ┃ └📝 useLocalStorage.ts
 ├📂 types
 ┃ └📝 TaskTypes.ts   # TypeScript types
 ├📝 App.tsx
 ├📝 main.tsx
 └📝 index.css
```

---
---

## 💡 Future Improvements
- ✅ **Integrating third party css lib like tailwindCss and animations**  
- ✅ **User Authentication (Login/Signup)**  
- ✅ **Database Integration (Firebase or Supabase)**  
- ✅ **Dark Mode Theme**  
- ✅ **Export Tasks to CSV or PDF**  

---

## 🤝 Contributing
Feel free to contribute! Fork the repo and submit a pull request.  

---

## 🐜 License
This project is **MIT licensed**.

---

## 📞 Contact
- **GitHub:** [@livinusonyenso](https://github.com/livinusonyenso)
- **Email:** livinusonyenso@gmail.com

