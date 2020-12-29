import { getText } from "./TextToType.js";
import { time, stopwatchStarted, hours, minutes, seconds, totalTime, timerId, increment, timer, setStopwatchStarted } from "./StopWatch.js";

let textToType;
let words;
let typedWords;
let wordsPerMinuteContainer;
let i;
let totalTypedCharacters;
let wordsPerMinuteTimerId;
let wordsPerMinute;
let testing;
let testing2;
let incorrectTyped;
let first;
let typedText;
let temp;

function setWordsPerMinute() {
    wordsPerMinute = Number.parseFloat((totalTypedCharacters/5)/(totalTime/60)).toFixed(2);
    wordsPerMinuteContainer.innerHTML = `WPM: ${wordsPerMinute}`;
    wordsPerMinuteTimer();
}

function wordsPerMinuteTimer() {
    wordsPerMinuteTimerId = setTimeout(setWordsPerMinute, 3000);
}

function measure(e) {
    if (!stopwatchStarted) {
        timer();
        wordsPerMinuteTimer();
        setStopwatchStarted();
    }
    testing = words[i].length;
    console.log(e.data, testing, testing2);
    if (testing2 < testing) {
        if (e.data == words[i][testing2]) {
            if (typedText.value == words[i].substring(0, testing2+1)) {
                totalTypedCharacters++;
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
        if (typedWords == words.length) {
            let result = document.getElementById("test");
            result.classList.add("completed");
            result.innerHTML = `Your WPM is ${wordsPerMinute}`;
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
    })
    typedWords = 0;
    wordsPerMinuteContainer = document.getElementById("words-per-minute");
    i = 0;
    totalTypedCharacters = 0;
    wordsPerMinute = 0;
    testing = words[i].length;
    testing2 = 0;
    incorrectTyped = false;
    first = document.getElementById(i);
    first.classList.add("underline-word");

    typedText = document.getElementById("typed-text");

    typedText.addEventListener("input", measure)
})