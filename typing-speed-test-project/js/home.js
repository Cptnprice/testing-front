import { getText } from "./TextToType.js";
import { stopwatchStarted, timerId, timer, setStopwatchStarted } from "./Stopwatch.js";
import { wordsPerMinuteTimerId, wordsPerMinute, wordsPerMinuteTimer, increaseTotalTypedCharacters } from "./WordsPerMinuteTimer.js";

let textToType;
let words;
let typedWords;
let currentWordIndex = 0;
let currentWordLength;
let correctCharactersQuantity = 0;
let totalCharactersQuantity = 0;
let incorrectTyped = false;
let currentWord;
let typedText = document.getElementById("typed-text");
let typedWord;

let loader = document.getElementById("loading-text");

function measure(e) {
    if (!stopwatchStarted) {
        timer();
        wordsPerMinuteTimer();
        setStopwatchStarted();
    }
    currentWordLength = words[currentWordIndex].length;
    typedWord = document.getElementById(currentWordIndex);
    // word is not fully typed correctly yet
    if (correctCharactersQuantity < currentWordLength) {
        // typed character is correct
        if (e.data == words[currentWordIndex][correctCharactersQuantity]) {
            // make sure that not only typed characters is correct, but also previous characters as well
            if (typedText.value == words[currentWordIndex].substring(0, correctCharactersQuantity+1)) {
                increaseTotalTypedCharacters(); // increase total typed characters amount for whole text
                typedWord.innerHTML = typedWord.innerHTML.substring(0, typedWord.innerHTML.includes("</span>") ? (typedWord.innerHTML.lastIndexOf("</span>")+7) : -1) + `<span class="typed-character">${words[currentWordIndex][correctCharactersQuantity]}</span>` + words[currentWordIndex].substring(correctCharactersQuantity+1);
                incorrectTyped = false;
                correctCharactersQuantity++;
                totalCharactersQuantity++;
            }
        }
        else {
            // backspace(deleting character)
            if (!e.data && typedText.value.length < words[currentWordIndex].length) {
                if (!typedText.value) {
                    typedWord.innerHTML = words[currentWordIndex];
                    correctCharactersQuantity = 0;
                    totalCharactersQuantity = 0;
                }
                else {
                    let spanElements = typedWord.querySelectorAll("span");
                    let lastIndexOfOpenSpan = typedWord.innerHTML.lastIndexOf("<span ");
                    let lastIndexOfCloseSpan = typedWord.innerHTML.lastIndexOf("</span>");
                    typedWord.innerHTML = typedWord.innerHTML.substring(0, lastIndexOfOpenSpan) + spanElements[spanElements.length - 1].innerHTML + typedWord.innerHTML.substring(lastIndexOfCloseSpan+7, typedWord.innerHTML.length);
                    if (correctCharactersQuantity >= 1 && !incorrectTyped) {
                        correctCharactersQuantity--;
                    }
                    totalCharactersQuantity--;
                }
            }
            // typed character is incorrect
            else {
                if (totalCharactersQuantity < currentWordLength) {
                    typedWord.innerHTML = typedWord.innerHTML.substring(0, typedWord.innerHTML.includes("</span>") ? (typedWord.innerHTML.lastIndexOf("</span>")+7) : -1) + `<span class="incorrect-character">${words[currentWordIndex][totalCharactersQuantity]}</span>` + words[currentWordIndex].substring(totalCharactersQuantity+1);
                    incorrectTyped = true;
                    totalCharactersQuantity++;
                }
            }
        }
    }
    // word is fully typed correctly
    else {
        document.getElementById(currentWordIndex).classList.remove("underline-word");
        typedWords++;
        // whole text is typed
        if (typedWords == words.length) {
            let result = document.getElementById("result");
            result.classList.add("completed");
            result.innerHTML = `Your WPM is ${wordsPerMinute}. <a href=".">New one</a>`;
            clearTimeout(timerId);
            clearTimeout(wordsPerMinuteTimerId);
            typedText.removeEventListener("input", measure);
        }
        // whole text is not fully typed yet
        else {
            currentWordIndex++;
            document.getElementById(currentWordIndex).classList.add("underline-word");
            correctCharactersQuantity = 0;
            totalCharactersQuantity = 0;
            typedText.value = "";
            incorrectTyped = false;
        }
    }
}

// call API to get text and then show it
getText().then((result) => {
    textToType = result.substring(0, result.length - 1);
    let textToTypeTest = document.getElementById("text-to-type-test");
    words = textToType.split(" ");
    words.forEach((word, currentWordIndex) => {
        let typedWord = document.createElement("p");
        typedWord.innerHTML = word;
        typedWord.id = currentWordIndex;
        textToTypeTest.appendChild(typedWord);
    });
    loader.style.display = "none";
    typedWords = 0;
    currentWordLength = words[currentWordIndex].length;
    currentWord = document.getElementById(currentWordIndex);
    currentWord.classList.add("underline-word");

    typedText.addEventListener("input", measure)
});

window.onload = () => {
    typedText.value = "";
}