import { createBooks, localStorage } from "./book.js";

let bookListing = document.getElementById("book-listing");
let bookCriteria = document.getElementById("book-criteria");
let bookSearchButton = document.getElementById("book-search");
let loaderContainer = document.getElementById("loading-process");
let errorMessageContainer = document.getElementById("error-message");

let sessionStorage = window.sessionStorage;

bookSearchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    let bookCriteriaValue = bookCriteria.value;
    if (!bookCriteriaValue) {
        bookCriteria.classList.add("error-input-border");
        errorMessageContainer.style.display = "block";
    }
    else {
        if (errorMessageContainer.style.display != "none") {
            bookCriteria.classList.remove("error-input-border");
            errorMessageContainer.style.display = "none";
        }
        bookListing.innerHTML = "";
        sessionStorage.setItem("alreadySearched", JSON.stringify(true));
        loaderContainer.style.display = "flex";
        if (!localStorage.getItem("searchValue")) {
            localStorage.setItem("searchValue", bookCriteriaValue);
        }
        let searchQueryPart = bookCriteriaValue.split(' ').join('+');
        createBooks(searchQueryPart);
    }
});

window.onload = () => {
    let temp = document.referrer.split("/");
    if (temp[temp.length - 1] == "detail.html" || JSON.parse(sessionStorage.getItem("alreadySearched"))) {
        bookCriteria.value = localStorage.getItem("searchValue");
        loaderContainer.style.display = "flex";
        createBooks();
    }
}