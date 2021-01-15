import { createBooks, storage } from "./book.js";

let bookListing = document.getElementById("book-listing");
let bookCriteria = document.getElementById("book-criteria");
let bookSearchButton = document.getElementById("book-search");
let loaderContainer = document.getElementById("loading-process");

bookSearchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    bookListing.innerHTML = "";
    loaderContainer.style.display = "flex";
    let bookCriteriaValue = bookCriteria.value;
    if (!storage.getItem("searchValue")) {
        storage.setItem("searchValue", bookCriteriaValue);
    }
    let searchQueryPart = bookCriteriaValue.split(' ').join('+');
    createBooks(searchQueryPart);
});

window.onload = () => {
    let temp = document.referrer.split("/");
    if (temp[temp.length - 1] == "detail.html") {
        bookCriteria.value = storage.getItem("searchValue");
        createBooks();
    }
}