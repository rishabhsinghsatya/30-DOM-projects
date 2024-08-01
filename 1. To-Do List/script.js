// script.js
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  // Function to create a new task item
  function createTaskItem(taskText) {
    const li = document.createElement("li");

    // Create elements for displaying and editing the task
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.classList.add("task-text");

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskText;
    editInput.classList.add("edit-input");
    editInput.style.display = "none"; // Initially hidden

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => {
      if (editInput.style.display === "none") {
        editInput.style.display = "inline";
        taskSpan.style.display = "none";
        editInput.focus();
        editBtn.textContent = "Save";
      } else {
        taskSpan.textContent = editInput.value;
        editInput.style.display = "none";
        taskSpan.style.display = "inline";
        editBtn.textContent = "Edit";
      }
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => {
      taskList.removeChild(li);
    });

    li.appendChild(taskSpan);
    li.appendChild(editInput);
    li.appendChild(editBtn);
    li.appendChild(removeBtn);
    return li;
  }

  // Add task on button click
  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      const taskItem = createTaskItem(taskText);
      taskList.appendChild(taskItem);
      taskInput.value = "";
    }
  });

  // Add task on Enter key press
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTaskBtn.click();
    }
  });
});
