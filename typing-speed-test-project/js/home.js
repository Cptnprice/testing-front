let textToType = "When writing client-side JavaScript for web sites or applications, you won't go very far before you start to use APIs";
let words = textToType.split(" ");
let typedWords = 0;
let i = 0;
let testing = words[i].length;
let testing2 = 0;

let typedText = document.getElementById("typed-text");

typedText.addEventListener("keyup", (e) => {
    testing = words[i].length;
    if (testing2 < testing) {
        console.log(e.key, words[i][testing2]);
        if (e.key == words[i][testing2]) {
            temp = document.getElementById(i);
            temp.innerHTML = temp.innerHTML.substring(0, temp.innerHTML.includes("</span>") ? (temp.innerHTML.lastIndexOf("</span>")+7) : -1) + `<span style="color: green">${words[i][testing2]}</span>` + words[i].substring(testing2+1);
            testing2++;
        }
    }
    else {
        typedWords++;
        i++;
        testing2 = 0;
        console.log(typedText.value);
        // console.log(typedText.value);
    }
})