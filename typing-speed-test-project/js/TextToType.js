const getText = async () => {
    let textToType = "";
    let temp;
    while (!textToType) {
        const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary");
        const myJson = await response.json();
        temp = myJson["extract"];
        if (temp.match(/["a-zA-Z0-9!?\-,\.\&\$\%\@\#\^\*\(\)\_\+\=\ "]+/g)[0] == temp) {
            textToType = temp;
        }
    }
    return textToType;
}

export { getText }