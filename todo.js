"use strict";

// ======================================================
// Лабораторна робота №5
// Task Manager: DOM, події та API
// ======================================================

const API_URL = "https://jsonplaceholder.typicode.com";

const taskForm = document.querySelector(".task-form");
const taskInput = document.querySelector(".task-input");
const addTaskButton = document.querySelector(".task-add-button");
const taskList = document.querySelector(".task-list");
const searchInput = document.querySelector(".search-input");
const filterButtons = document.querySelectorAll(".filter-button");
const activeTaskCount = document.querySelector(".active-task-count");
const loader = document.querySelector(".task-loader");
const errorMessage = document.querySelector(".task-error");
const userInfo = document.querySelector(".task-user-info");
const emptyMessage = document.querySelector(".task-empty");

let tasks = [];
let currentFilter = "all";
let currentSearchText = "";
let temporaryTaskId = 1000;

// ======================================================
// Допоміжні функції
// ======================================================

function showLoader() {
    loader.classList.remove("hidden");
}

function hideLoader() {
    loader.classList.add("hidden");
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

function hideError() {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
}

function updateAddButtonState() {
    addTaskButton.disabled = taskInput.value.trim() === "";
}

function updateTaskCounter() {
    const activeTasks = tasks.filter((task) => !task.completed);

    activeTaskCount.textContent =
        `Активних завдань: ${activeTasks.length}`;
}

function updateEmptyMessage(filteredTasks) {
    if (filteredTasks.length === 0) {
        emptyMessage.classList.remove("hidden");
    } else {
        emptyMessage.classList.add("hidden");
    }
}

// ======================================================
// Створення DOM-елемента завдання
// ======================================================

function createTaskElement(task) {
    const taskItem = document.createElement("li");

    taskItem.classList.add("task-item");
    taskItem.dataset.id = task.id;

    if (task.completed) {
        taskItem.classList.add("completed");
    }

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.classList.add("task-checkbox");
    checkbox.setAttribute(
        "aria-label",
        `Змінити статус завдання: ${task.title}`
    );

    const taskTitle = document.createElement("span");

    taskTitle.textContent = task.title;
    taskTitle.classList.add("task-title");

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.textContent = "Видалити";
    deleteButton.classList.add("task-delete");

    taskItem.append(
        checkbox,
        taskTitle,
        deleteButton
    );

    return taskItem;
}

// ======================================================
// Фільтрація та відображення завдань
// ======================================================

function getFilteredTasks() {
    return tasks.filter((task) => {
        const matchesStatus =
            currentFilter === "all" ||
            (currentFilter === "active" && !task.completed) ||
            (currentFilter === "completed" && task.completed);

        const matchesSearch = task.title
            .toLowerCase()
            .includes(currentSearchText.toLowerCase());

        return matchesStatus && matchesSearch;
    });
}

function renderTasks() {
    const filteredTasks = getFilteredTasks();

    taskList.textContent = "";

    filteredTasks.forEach((task) => {
        const taskElement = createTaskElement(task);

        taskList.appendChild(taskElement);
    });

    updateTaskCounter();
    updateEmptyMessage(filteredTasks);
}

// ======================================================
// Відображення інформації про користувача
// ======================================================

function renderUserInfo(user) {
    userInfo.textContent =
        `Користувач: ${user.name} — ${user.email}`;
}
// ======================================================
// Завантаження початкових даних
// Promise.all: завдання + користувач
// ======================================================

async function loadInitialData() {
    showLoader();
    hideError();

    try {
        const [todosResponse, userResponse] = await Promise.all([
            fetch(`${API_URL}/todos?_limit=20`),
            fetch(`${API_URL}/users/1`)
        ]);

        if (!todosResponse.ok || !userResponse.ok) {
            throw new Error("Помилка завантаження даних");
        }

        const [loadedTasks, user] = await Promise.all([
            todosResponse.json(),
            userResponse.json()
        ]);

        tasks = loadedTasks;

        renderUserInfo(user);
        renderTasks();
    } catch (error) {
        showError(
            "Не вдалося завантажити дані. Спробуйте пізніше."
        );

        console.error("Помилка завантаження:", error);
    } finally {
        hideLoader();
    }
}

// ======================================================
// POST — додавання нового завдання
// ======================================================

async function addTask(title) {
    showLoader();
    hideError();

    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                title,
                completed: false,
                userId: 1
            })
        });

        if (!response.ok) {
            throw new Error(
                `Помилка HTTP: ${response.status}`
            );
        }

        const createdTask = await response.json();

        const newTask = {
            ...createdTask,
            id: temporaryTaskId
        };

        temporaryTaskId += 1;

        tasks.unshift(newTask);

        taskInput.value = "";
        updateAddButtonState();
        renderTasks();
    } catch (error) {
        showError("Не вдалося створити завдання.");

        console.error("Помилка створення:", error);
    } finally {
        hideLoader();
    }
}

// ======================================================
// PATCH — зміна статусу завдання
// ======================================================

async function toggleTask(id, completed) {
    hideError();

    try {
        const response = await fetch(
            `${API_URL}/todos/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type":
                        "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    completed
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                `Помилка HTTP: ${response.status}`
            );
        }

        const task = tasks.find(
            (currentTask) => currentTask.id === id
        );

        if (!task) {
            return;
        }

        task.completed = completed;

        renderTasks();
    } catch (error) {
        showError("Не вдалося оновити завдання.");

        console.error("Помилка оновлення:", error);

        renderTasks();
    }
}

// ======================================================
// DELETE — видалення завдання
// ======================================================

async function deleteTask(id) {
    hideError();

    try {
        const response = await fetch(
            `${API_URL}/todos/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error(
                `Помилка HTTP: ${response.status}`
            );
        }

        tasks = tasks.filter(
            (task) => task.id !== id
        );

        renderTasks();
    } catch (error) {
        showError("Не вдалося видалити завдання.");

        console.error("Помилка видалення:", error);
    }
}
// ======================================================
// Debounce для пошуку
// ======================================================

function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// ======================================================
// Подія submit форми
// ======================================================

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = taskInput.value.trim();

    if (title === "") {
        return;
    }

    addTask(title);
});

// ======================================================
// Стан кнопки "Додати"
// ======================================================

taskInput.addEventListener("input", () => {
    updateAddButtonState();
});

// ======================================================
// Події клавіатури
// Enter — додати завдання
// Escape — очистити поле
// ======================================================

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        const title = taskInput.value.trim();

        if (title !== "") {
            addTask(title);
        }
    }

    if (event.key === "Escape") {
        taskInput.value = "";
        updateAddButtonState();
    }
});

// ======================================================
// Делегування подій для списку завдань
// ======================================================

taskList.addEventListener("click", (event) => {
    const target = event.target;
    const taskItem = target.closest(".task-item");

    if (!taskItem) {
        return;
    }

    const taskId = Number(taskItem.dataset.id);

    if (target.classList.contains("task-delete")) {
        deleteTask(taskId);
    }

    if (target.classList.contains("task-checkbox")) {
        toggleTask(taskId, target.checked);
    }
});

// ======================================================
// Фільтри: всі / активні / виконані
// ======================================================

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        filterButtons.forEach((currentButton) => {
            currentButton.classList.remove("active");
        });

        button.classList.add("active");

        renderTasks();
    });
});

// ======================================================
// Пошук із debounce
// ======================================================

const handleSearch = debounce((event) => {
    currentSearchText = event.target.value.trim();

    renderTasks();
}, 300);

searchInput.addEventListener("input", handleSearch);

// ======================================================
// Початкова ініціалізація
// ======================================================

updateAddButtonState();
loadInitialData();