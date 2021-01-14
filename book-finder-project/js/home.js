let bookListing = document.getElementById("book-listing");
let bookCriteria = document.getElementById("book-criteria");
let bookSearchButton = document.getElementById("book-search");
let storage = window.localStorage;

bookSearchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    bookListing.innerHTML = "";
    let bookCriteriaValue = bookCriteria.value;
    let searchQueryPart = bookCriteriaValue.split(' ').join('+');
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQueryPart}`);
    let myJson = await response.json();
    myJson.items.forEach((book) => {
        let bookContainer = document.createElement('div');
        bookContainer.classList.add("each-book");
        let bookImage = document.createElement('img');
        bookImage.classList.add("book-image");
        bookImage.src = book.volumeInfo.imageLinks.thumbnail;
        let bookOtherInformation = document.createElement('div');
        bookOtherInformation.classList.add("book-other-information");
        let bookTitle = document.createElement('h3');
        bookTitle.classList.add("book-title");
        bookTitle.innerHTML = book.volumeInfo.title;
        let authors = document.createElement('p');
        authors.innerHTML = `<span class="bold-span">Authors</span>: ${book.volumeInfo.authors.join(',')}`;
        let publishDate = document.createElement('p');
        publishDate.innerHTML = `<span class="bold-span">Publish Date</span>: ${book.volumeInfo.publishedDate}`;
        let publisher = document.createElement('p');
        publisher.innerHTML = `<span class="bold-span">Publisher</span>: ${book.volumeInfo.publisher ? book.volumeInfo.publisher : ""}`;
        let moreInformationButton = document.createElement('button');
        moreInformationButton.classList.add("more-information");
        moreInformationButton.innerHTML = "More";
        moreInformationButton.addEventListener("click", () => {
            console.log(book.volumeInfo);
            storage.setItem("currentBook", JSON.stringify(book));
            window.location.href = "detail.html";
        })
        bookOtherInformation.appendChild(bookTitle);
        bookOtherInformation.appendChild(authors);
        bookOtherInformation.appendChild(publishDate);
        bookOtherInformation.appendChild(publisher);
        bookOtherInformation.appendChild(moreInformationButton);
        bookContainer.appendChild(bookImage);
        bookContainer.appendChild(bookOtherInformation);
        bookListing.appendChild(bookContainer);
    });
});