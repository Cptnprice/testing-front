const getText = async () => {
    const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary");
    const myJson = response.json();
    return myJson;
}

export { getText }