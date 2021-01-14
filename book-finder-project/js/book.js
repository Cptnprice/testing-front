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

export { getBook, createCommonFields };