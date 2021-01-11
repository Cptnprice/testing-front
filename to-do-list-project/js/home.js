let storage = window.localStorage;
let toDoList = document.getElementById("notes-list");
let submitButton = document.getElementById("submit-note");
let titleInput = document.getElementById("note-title");
let titles = JSON.parse(storage.getItem("titles")) ? JSON.parse(storage.getItem("titles")) : [];
let changedList = false;
let c = 0;

function createOrUpdateList() {
    if (!storage.length || changedList) {
        storage.setItem("titles", JSON.stringify(titles));
        changedList = false;
    }
}

function removeToDo(title, id) {
    titles.splice(titles.indexOf(title), 1);
    document.getElementById(id).remove();
    changedList = true;
}

function createToDoList() {
    console.log(c);
    createOrUpdateList();
    if (titles) {
        titles.forEach((title) => {
            createToDo(title);
        })
    }
}

function createToDo(newTitle) {
    console.log(c);
    let eachToDo = document.createElement('div');
    eachToDo.id = c;
    c++;
    eachToDo.classList.add("each-to-do");
    let title = document.createElement("li");
    title.innerHTML = newTitle;
    let checkButton = document.createElement("button");
    checkButton.classList.add("check-to-do");
    checkButton.innerHTML = '<i class="far fa-check-square"></i>';
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-to-do");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener("click", () => {
        removeToDo(newTitle, eachToDo.id);
        createOrUpdateList();
    });
    eachToDo.appendChild(title);
    eachToDo.appendChild(checkButton);
    eachToDo.appendChild(deleteButton);
    toDoList.appendChild(eachToDo);
}

function saveToDo(newTitle) {
    createToDo(newTitle);
    titleInput.value = "";
    titles.push(newTitle);
    changedList = true;
    createOrUpdateList();
}

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let newTitle = titleInput.value;
    saveToDo(newTitle);
})

window.onload = createToDoList;