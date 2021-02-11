const getText = async () => {
    let textToType = "";
    let tempText; // temporarily fetched text variable, if regex check is successful, textToType will be asigned to it
    while (!textToType) {
        const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary");
        const myJson = await response.json();
        tempText = myJson["extract"];
        // regex to check if text to type contains only english character and also some special characters
        if (tempText.match(/["a-zA-Z0-9!?\-,\.\&\$\%\@\#\^\*\(\)\_\+\=\ "]+/g)[0] == tempText) {
            textToType = tempText;
        }
    }
    return textToType;
}

export { getText }