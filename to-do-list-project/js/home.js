let storage = window.localStorage;
let toDoList = document.getElementById("notes-list");
let submitButton = document.getElementById("submit-note");
let titleInput = document.getElementById("note-title");
let notes = JSON.parse(storage.getItem("notes")) ? JSON.parse(storage.getItem("notes")) : [];
let filterNotes = document.getElementById("filter-notes");
let changedList = false;
let c = 0;

let filterObj = {
    'completed' : true,
    'uncompleted': false
};

function createOrUpdateList() {
    if (!storage.length || changedList) {
        storage.setItem("notes", JSON.stringify(notes));
        changedList = false;
    }
}

function removeToDo(note, id) {
    notes.splice(notes.indexOf(note), 1);
    document.getElementById(id).remove();
    changedList = true;
}

function updateToDo(title) {
    let temp = notes.find((x) => {
        return x['title'] == title;
    });
    temp['completed'] = !temp['completed'];
    changedList = true;
}

function createToDoList(filterValue) {
    createOrUpdateList();
    notesShow = filterValue == "all" ? notes : notes.filter((x) => x['completed'] == filterObj[filterValue]);
    if (notesShow) {
        toDoList.innerHTML = "";
        notesShow.forEach((note) => {
            createToDo(note);
        })
    }
}

function createToDo(note) {
    let newTitle = note['title'];
    let completed = note['completed'];
    let eachToDo = document.createElement('div');
    if (completed) {
        eachToDo.classList.add("completed");
    }
    eachToDo.id = c;
    c++;
    eachToDo.classList.add("each-to-do");
    let title = document.createElement("li");
    title.innerHTML = newTitle;
    let checkButton = document.createElement("button");
    checkButton.classList.add("check-to-do");
    checkButton.innerHTML = '<i class="far fa-check-square"></i>';
    checkButton.addEventListener("click", () => {
        eachToDo.classList.toggle("completed");
        updateToDo(newTitle);
        createOrUpdateList();
    })
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-to-do");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener("click", () => {
        removeToDo(note, eachToDo.id);
        createOrUpdateList();
    });
    eachToDo.appendChild(title);
    eachToDo.appendChild(checkButton);
    eachToDo.appendChild(deleteButton);
    toDoList.appendChild(eachToDo);
}

function saveToDo(newTitle) {
    let newNote = {
        title: newTitle,
        completed: false
    }
    createToDo(newNote);
    titleInput.value = "";
    notes.push(newNote);
    changedList = true;
    createOrUpdateList();
}

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let newTitle = titleInput.value;
    saveToDo(newTitle);
})

filterNotes.addEventListener("change", (e) => {
    console.log(e.target.value);
    createToDoList(e.target.value);
})

window.onload = () => {
    createToDoList("all");
}