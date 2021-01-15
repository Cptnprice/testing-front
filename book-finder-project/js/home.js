import { createBooks } from "./book.js";

let bookListing = document.getElementById("book-listing");
let bookCriteria = document.getElementById("book-criteria");
let bookSearchButton = document.getElementById("book-search");
let loaderContainer = document.getElementById("loading-process");

bookSearchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    bookListing.innerHTML = "";
    loaderContainer.style.display = "flex";
    let bookCriteriaValue = bookCriteria.value;
    let searchQueryPart = bookCriteriaValue.split(' ').join('+');
    createBooks(searchQueryPart);
});

window.onload = () => {
    let temp = document.referrer.split("/");
    if (temp[temp.length - 1] == "detail.html") {
        createBooks();
    }
}