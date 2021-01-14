let storage = window.localStorage;
let bookInformation = document.getElementById("book-information");
let previousButton = document.getElementById("previous-button");

previousButton.addEventListener("click", () => {
    window.history.back();
})

let book = JSON.parse(storage.getItem("currentBook"));
let bookDetailsInformation = document.createElement('div');
let bookDescriptionContainer = document.createElement('div');
bookDetailsInformation.classList.add("book-details-information");
bookDescriptionContainer.classList.add("book-description");
let bookTitle = document.createElement("h3");
bookTitle.innerHTML = book.volumeInfo.title;
let bookImage = document.createElement("img");
bookImage.classList.add("book-detail-image");
bookImage.src = book.volumeInfo.imageLinks.thumbnail;
let authors = document.createElement('p');
authors.innerHTML = `<span class="bold-span">Authors</span>: ${book.volumeInfo.authors.join(',')}`;
let publisher = document.createElement('p');
publisher.innerHTML = `<span class="bold-span">Publisher</span>: ${book.volumeInfo.publisher ? book.volumeInfo.publisher : ''}`;
let publishDate = document.createElement('p');
publishDate.innerHTML = `<span class="bold-span">Publish date</span>: ${book.volumeInfo.publishedDate}`;
let numberOfPages = document.createElement('p');
numberOfPages.innerHTML = `<span class="bold-span">Number of pages</span>: ${book.volumeInfo.pageCount}`;
bookDetailsInformation.appendChild(bookTitle);
bookDetailsInformation.appendChild(bookImage);
bookDetailsInformation.appendChild(authors);
bookDetailsInformation.appendChild(publisher);
bookDetailsInformation.appendChild(publishDate);
bookDetailsInformation.appendChild(numberOfPages);
let bookDescriptionTitle = document.createElement('h3');
bookDescriptionTitle.innerHTML = "Book Description";
let bookDescription = document.createElement('p');
bookDescription.innerHTML = book.volumeInfo.description ? book.volumeInfo.description : '';
bookDescriptionContainer.appendChild(bookDescriptionTitle);
bookDescriptionContainer.appendChild(bookDescription);
bookInformation.appendChild(bookDetailsInformation);
bookInformation.appendChild(bookDescriptionContainer);