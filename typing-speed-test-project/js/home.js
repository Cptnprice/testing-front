let textToType = "When writing client-side JavaScript for web sites or applications, you won't go very far before you start to use APIs";
let words = textToType.split(" ");
let typedWords = 0;
let wordsPerMinuteContainer = document.getElementById("words-per-minute");
let i = 0;
let totalTypedCharacters = 0;
let wordsPerMinuteTimerId;
let time = document.getElementById("time");
let wordsPerMinute = 0;
let stopwatchStarted = false;
let hours = 0;
let minutes = 0;
let seconds = 0;
let totalTime = 0;
let timerId;
let testing = words[i].length;
let testing2 = 0;
let incorrectTyped = false;
let first = document.getElementById(i);
first.classList.add("underline-word");

let typedText = document.getElementById("typed-text");

function increment() {
    totalTime++;
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    time.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
                      (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
                      (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00");

    timer();
}

function timer() {
    timerId = setTimeout(increment, 1000);
}

function setWordsPerMinute() {
    wordsPerMinute = (totalTypedCharacters/5)/(totalTime/60);
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
        stopwatchStarted = true;
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

typedText.addEventListener("input", measure)