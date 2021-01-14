let storage = window.localStorage;

let bookListing = document.getElementById("book-listing");

let getBook = async (searchQueryPart) => {
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQueryPart}`);
    let myJson = await response.json();
    return myJson;
}

let createCommonFields = (book) => {
    let bookTitle = document.createElement('h3');
    bookTitle.classList.add("book-title");
    bookTitle.innerHTML = book.volumeInfo.title;
    let authors = document.createElement('p');
    authors.innerHTML = `<span class="bold-span">Authors</span>: ${book.volumeInfo.authors.join(',')}`;
    let publishDate = document.createElement('p');
    publishDate.innerHTML = `<span class="bold-span">Publish Date</span>: ${book.volumeInfo.publishedDate}`;
    let publisher = document.createElement('p');
    publisher.innerHTML = `<span class="bold-span">Publisher</span>: ${book.volumeInfo.publisher ? book.volumeInfo.publisher : ""}`;
    return [bookTitle, authors, publishDate, publisher];
}

let createBooks = async (searchQueryPart) => {
    let myJson = JSON.parse(storage.getItem("books")) ? JSON.parse(storage.getItem("books")) : (searchQueryPart ? await getBook(searchQueryPart) : null);
    storage.setItem("books", JSON.stringify(myJson));
    if (myJson) {
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
    }
}

export { getBook, createCommonFields, createBooks, bookListing };