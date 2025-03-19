document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("task");
    let taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("task-list");
    let li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskText}</span>
        <button onclick="deleteTask(this)">❌</button>
    `;
    
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = ""; 
}

function toggleComplete(task) {
    task.classList.toggle("completed");
    saveTasks();
}

function deleteTask(task) {
    task.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#task-list li").forEach(task => {
        tasks.push({ text: task.textContent.replace("❌", "").trim(), completed: task.firstChild.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("task-list");
    
    storedTasks.forEach(taskData => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span onclick="toggleComplete(this)" class="${taskData.completed ? "completed" : ""}">${taskData.text}</span>
            <button onclick="deleteTask(this)">❌</button>
        `;
        taskList.appendChild(li);
    });
}
