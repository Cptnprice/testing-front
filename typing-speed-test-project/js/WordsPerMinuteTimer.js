import { totalTime } from "./Stopwatch.js";

let wordsPerMinuteContainer = document.getElementById("words-per-minute");
let totalTypedCharacters = 0;
let wordsPerMinuteTimerId;
let wordsPerMinute = 0;

function setWordsPerMinute() {
    wordsPerMinute = Number.parseFloat((totalTypedCharacters/5)/(totalTime/60)).toFixed(2);
    wordsPerMinuteContainer.innerHTML = `WPM: ${wordsPerMinute}`;
    wordsPerMinuteTimer();
}

function wordsPerMinuteTimer() {
    wordsPerMinuteTimerId = setTimeout(setWordsPerMinute, 3000);
}

function increaseTotalTypedCharacters() {
    totalTypedCharacters++;
}

export { wordsPerMinuteContainer, totalTypedCharacters, wordsPerMinuteTimerId, wordsPerMinute, setWordsPerMinute, wordsPerMinuteTimer, increaseTotalTypedCharacters }