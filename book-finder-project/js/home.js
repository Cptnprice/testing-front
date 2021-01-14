import { getBook, createCommonFields, createBooks } from "./book.js";

let bookListing = document.getElementById("book-listing");
let bookCriteria = document.getElementById("book-criteria");
let bookSearchButton = document.getElementById("book-search");

bookSearchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    bookListing.innerHTML = "";
    let bookCriteriaValue = bookCriteria.value;
    let searchQueryPart = bookCriteriaValue.split(' ').join('+');
    createBooks(searchQueryPart);
});

window.onload = () => {
    createBooks();
}