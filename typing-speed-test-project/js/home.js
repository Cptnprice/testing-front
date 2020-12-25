let textToType = "When writing client-side JavaScript for web sites or applications, you won't go very far before you start to use APIs";
let words = textToType.split(" ");
let typedWords = 0;
let i = 0;
let testing = words[i].length;
let testing2 = 0;
let incorrectTyped = false;
let first = document.getElementById(i);
first.classList.add("underline-word");

let typedText = document.getElementById("typed-text");

typedText.addEventListener("input", (e) => {
    testing = words[i].length;
    console.log(e.data, testing, testing2);
    if (testing2 < testing) {
        if (e.data == words[i][testing2]) {
            if (typedText.value == words[i].substring(0, testing2+1)) {
                temp = document.getElementById(i);
                if (incorrectTyped) {
                    temp.innerHTML = temp.innerHTML.replace('class="incorrect-character', 'class="typed-character"');
                    incorrectTyped = false;
                }
                else{
                    temp.innerHTML = temp.innerHTML.substring(0, temp.innerHTML.includes("</span>") ? (temp.innerHTML.lastIndexOf("</span>")+7) : -1) + `<span class="typed-character">${words[i][testing2]}</span>` + words[i].substring(testing2+1);
                }
                // temp = document.getElementById(i);
                // console.log(temp.innerHTML);
                testing2++;
            }
        }
        else {
            if (!incorrectTyped) {
                temp = document.getElementById(i);
                temp.innerHTML = temp.innerHTML.substring(0, temp.innerHTML.includes("</span>") ? (temp.innerHTML.lastIndexOf("</span>")+7) : -1) + `<span class="incorrect-character">${words[i][testing2]}</span>` + words[i].substring(testing2+1);
                incorrectTyped = true;
            }
        }
    }
    else {
        document.getElementById(i).classList.remove("underline-word");
        typedWords++;
        i++;
        document.getElementById(i).classList.add("underline-word");
        testing2 = 0;
        typedText.value = "";
        incorrectTyped = false;
    }
})