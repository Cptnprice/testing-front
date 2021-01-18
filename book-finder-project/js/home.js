import { createBooks, localStorage } from "./book.js";

let bookListing = document.getElementById("book-listing");
let bookCriteria = document.getElementById("book-criteria");
let bookSearchButton = document.getElementById("book-search");
let loaderContainer = document.getElementById("loading-process");

let sessionStorage = window.sessionStorage;

bookSearchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    bookListing.innerHTML = "";
    sessionStorage.setItem("alreadySearched", JSON.stringify(true));
    loaderContainer.style.display = "flex";
    let bookCriteriaValue = bookCriteria.value;
    if (!localStorage.getItem("searchValue")) {
        localStorage.setItem("searchValue", bookCriteriaValue);
    }
    let searchQueryPart = bookCriteriaValue.split(' ').join('+');
    createBooks(searchQueryPart);
});

window.onload = () => {
    let temp = document.referrer.split("/");
    if (temp[temp.length - 1] == "detail.html" || JSON.parse(sessionStorage.getItem("alreadySearched"))) {
        bookCriteria.value = localStorage.getItem("searchValue");
        loaderContainer.style.display = "flex";
        createBooks();
    }
}