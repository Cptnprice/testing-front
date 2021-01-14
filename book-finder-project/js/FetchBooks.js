let getBook = async (searchQueryPart) => {
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQueryPart}`);
    let myJson = await response.json();
    return myJson;
}

export { getBook };