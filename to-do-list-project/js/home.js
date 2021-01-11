let storage = window.localStorage;
let toDoList = document.getElementById("notes-list");

if (!storage.length) {
    storage.setItem("titles", JSON.stringify(["one", "two", "three"]));
}

function createToDoList() {
    let titles = JSON.parse(storage.getItem("titles"));
    titles.forEach((title) => {
        createToDo();
    })
}

function createToDo() {
    let eachToDo = document.createElement('div');
    eachToDo.classList.add("each-to-do");
    let title = document.createElement("li");
    title.innerHTML = "testing";
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

window.onload = createToDoList;