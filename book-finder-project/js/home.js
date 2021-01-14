import { getBook, createCommonFields } from "./book.js";

let bookListing = document.getElementById("book-listing");
let bookCriteria = document.getElementById("book-criteria");
let bookSearchButton = document.getElementById("book-search");
let storage = window.localStorage;

bookSearchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    bookListing.innerHTML = "";
    let bookCriteriaValue = bookCriteria.value;
    let searchQueryPart = bookCriteriaValue.split(' ').join('+');
    let myJson = await getBook(searchQueryPart);
    myJson.items.forEach((book) => {
        let bookContainer = document.createElement('div');
        bookContainer.classList.add("each-book");
        let bookImage = document.createElement('img');
        bookImage.classList.add("book-image");
        bookImage.src = book.volumeInfo.imageLinks.thumbnail;
        let bookOtherInformation = document.createElement('div');
        bookOtherInformation.classList.add("book-other-information");
        let commonFields = createCommonFields(book);
        let moreInformationButton = document.createElement('button');
        moreInformationButton.classList.add("more-information");
        moreInformationButton.innerHTML = "More";
        moreInformationButton.addEventListener("click", () => {
            console.log(book.volumeInfo);
            storage.setItem("currentBook", JSON.stringify(book));
            window.location.href = "detail.html";
        });
        commonFields.forEach((field) => {
            bookOtherInformation.appendChild(field);
        });
        bookOtherInformation.appendChild(moreInformationButton);
        bookContainer.appendChild(bookImage);
        bookContainer.appendChild(bookOtherInformation);
        bookListing.appendChild(bookContainer);
    });
});