let storage = window.localStorage;
let toDoList = document.getElementById("notes-list");
let submitButton = document.getElementById("submit-note");
let titleInput = document.getElementById("note-title");
let titles = JSON.parse(storage.getItem("titles")) ? JSON.parse(storage.getItem("titles")) : [];
let addedNew = false;

function createOrUpdateList() {
    if (!storage.length || addedNew) {
        storage.setItem("titles", JSON.stringify(titles));
        addedNew = false;
    }
}

function createToDoList() {
    createOrUpdateList();
    if (titles) {
        titles.forEach((title) => {
            createToDo(title);
        })
    }
}

function createToDo(newTitle) {
    let eachToDo = document.createElement('div');
    eachToDo.classList.add("each-to-do");
    let title = document.createElement("li");
    title.innerHTML = newTitle;
    let checkButton = document.createElement("button");
    checkButton.classList.add("check-to-do");
    checkButton.innerHTML = '<i class="far fa-check-square"></i>';
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-to-do");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    eachToDo.appendChild(title);
    eachToDo.appendChild(checkButton);
    eachToDo.appendChild(deleteButton);
    toDoList.appendChild(eachToDo);
}

function saveToDo(newTitle) {
    createToDo(newTitle);
    titleInput.value = "";
    titles.push(newTitle);
    addedNew = true;
    createOrUpdateList();
}

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let newTitle = titleInput.value;
    saveToDo(newTitle);
})

window.onload = createToDoList;