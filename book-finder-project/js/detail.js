import { createCommonFields } from "./book.js";

let localStorage = window.localStorage;
let bookInformation = document.getElementById("book-information");
let previousButton = document.getElementById("previous-button");
let loaderContainer = document.getElementById("loading-process");

previousButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "index.html";
    loaderContainer.style.display = "flex";
})

let getCurrentBook = async () => {
    return JSON.parse(localStorage.getItem("currentBook"));
}

window.onload = async () => {
    loaderContainer.style.display = "flex";
    let book = await getCurrentBook();
    loaderContainer.style.display = "none";
    let bookDetailsInformation = document.createElement('div');
    let bookDescriptionContainer = document.createElement('div');
    bookDetailsInformation.classList.add("book-details-information");
    bookDescriptionContainer.classList.add("book-description");
    let commonFields = createCommonFields(book);
    let bookImage = document.createElement("img");
    bookImage.classList.add("book-detail-image");
    bookImage.src = book.volumeInfo.imageLinks.thumbnail;
    let numberOfPages = document.createElement('p');
    numberOfPages.innerHTML = `<span class="bold-span">Number of pages</span>: ${book.volumeInfo.pageCount}`;
    bookDetailsInformation.appendChild(bookImage);
    commonFields.forEach((field) => {
        bookDetailsInformation.appendChild(field);
    });
    bookDetailsInformation.appendChild(numberOfPages);
    let bookDescriptionTitle = document.createElement('h3');
    bookDescriptionTitle.innerHTML = "Book Description";
    let bookDescription = document.createElement('p');
    bookDescription.innerHTML = book.volumeInfo.description ? book.volumeInfo.description : '';
    bookDescriptionContainer.appendChild(bookDescriptionTitle);
    bookDescriptionContainer.appendChild(bookDescription);
    bookInformation.appendChild(bookDetailsInformation);
    bookInformation.appendChild(bookDescriptionContainer);
}