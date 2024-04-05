import React, { useEffect, useState } from "react";
import { useHover } from "@uidotdev/usehooks";
function TodoList() {
  const taskList = JSON.parse(localStorage.getItem("tasks")) || [];

  const [tasks, setTasks] = useState(taskList);
  const [newTask, setNewTask] = useState("");
  const [hoverRef, isHovered] = useHover();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.title = isHovered
      ? "CoDeD By AnAnT"
      : `You have ${tasks.length} tasks`;
  }, [isHovered, tasks]);
  
  function handleInputChange(e) {
    if (e.target.value === "Enter"){
      addTask();
    }
    setNewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim().length === 0) {
      return;
    }
    setTasks((t) => [...t, newTask]);
    setNewTask("");
  }

  function deleteTask(index) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  function moveTaskUp(index) {
    if (index === 0) {
      return;
    }
    const newTasks = [...tasks];
    [newTasks[index - 1], newTasks[index]] = [
      newTasks[index],
      newTasks[index - 1],
    ];
    setTasks(newTasks);
  }

  function moveTaskDown(index) {
    if (index === tasks.length - 1) {
      return;
    }
    const newTasks = [...tasks];
    [newTasks[index + 1], newTasks[index]] = [
      newTasks[index],
      newTasks[index + 1],
    ];
    setTasks(newTasks);
  }

  return (
    <div className="todo-list">
      <h1 ref={hoverRef}>Todo List 🔥</h1>
      <div className="input-div">
        <input
          type="text"
          placeholder="Enter a Task"
          value={newTask}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ul className="task-list" style={{ listStyle: "none" }}>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="task">⭐ &nbsp;{task}</span>
            <button
              className="delete-button"
              onClick={() => {
                deleteTask(index);
              }}
            >
              Delete
            </button>
            <button
              className="move-button"
              onClick={() => {
                moveTaskUp(index);
              }}
            >
              🔺
            </button>
            <button
              className="move-button"
              onClick={() => {
                moveTaskDown(index);
              }}
            >
              🔻
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

