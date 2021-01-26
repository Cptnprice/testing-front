import { getText } from "./TextToType.js";
import { stopwatchStarted, timerId, timer, setStopwatchStarted } from "./Stopwatch.js";
import { wordsPerMinuteTimerId, wordsPerMinute, wordsPerMinuteTimer, increaseTotalTypedCharacters } from "./WordsPerMinuteTimer.js";

let textToType;
let words;
let typedWords;
let i = 0;
let testing;
let testing2 = 0;
let incorrectTyped = false;
let first;
let typedText;
let temp;

let loader = document.getElementById("loading-text");

function measure(e) {
    if (!stopwatchStarted) {
        timer();
        wordsPerMinuteTimer();
        setStopwatchStarted();
    }
    testing = words[i].length;
    temp = document.getElementById(i);
    if (testing2 < testing) {
        if (e.data == words[i][testing2]) {
            if (typedText.value == words[i].substring(0, testing2+1)) {
                increaseTotalTypedCharacters();
                temp.innerHTML = temp.innerHTML.substring(0, temp.innerHTML.includes("</span>") ? (temp.innerHTML.lastIndexOf("</span>")+7) : -1) + `<span class="typed-character">${words[i][testing2]}</span>` + words[i].substring(testing2+1);
                incorrectTyped = false;
                testing2++;
            }
        }
        else {
            if (!e.data) {
                if (!incorrectTyped) {
                    testing2--;
                }
                let spanElements = temp.querySelectorAll("span");
                let lastIndexOfOpenSpan = temp.innerHTML.lastIndexOf("<span ");
                let lastIndexOfCloseSpan = temp.innerHTML.lastIndexOf("</span>");
                temp.innerHTML = temp.innerHTML.replace(temp.innerHTML.substr(lastIndexOfOpenSpan, lastIndexOfCloseSpan - lastIndexOfOpenSpan + 7), spanElements[spanElements.length - 1].innerHTML);
            }
            else {
                temp.innerHTML = temp.innerHTML.substring(0, temp.innerHTML.includes("</span>") ? (temp.innerHTML.lastIndexOf("</span>")+7) : -1) + `<span class="incorrect-character">${words[i][testing2]}</span>` + words[i].substring(testing2+1);
                incorrectTyped = true;
            }
        }
    }
    else {
        document.getElementById(i).classList.remove("underline-word");
        typedWords++;
        if (typedWords == words.length) {
            let result = document.getElementById("test");
            result.classList.add("completed");
            result.innerHTML = `Your WPM is ${wordsPerMinute}. <a href=".">New one</a>`;
            clearTimeout(timerId);
            clearTimeout(wordsPerMinuteTimerId);
            typedText.removeEventListener("input", measure);
        }
        else {
            i++;
            document.getElementById(i).classList.add("underline-word");
            testing2 = 0;
            typedText.value = "";
            incorrectTyped = false;
        }
    }
}

getText().then((result) => {
    textToType = result["extract"];
    textToType = textToType.substring(0, textToType.length - 1);
    let textToTypeTest = document.getElementById("text-to-type-test");
    words = textToType.split(" ");
    words.forEach((word, i) => {
        let temp = document.createElement("p");
        temp.innerHTML = word;
        temp.id = i;
        textToTypeTest.appendChild(temp);
    });
    loader.style.display = "none";
    typedWords = 0;
    testing = words[i].length;
    first = document.getElementById(i);
    first.classList.add("underline-word");

    typedText = document.getElementById("typed-text");

    typedText.addEventListener("input", measure)
})