let time = document.getElementById("time");
let stopwatchStarted = false;
let hours = 0;
let minutes = 0;
let seconds = 0;
let totalTime = 0;
let timerId;

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

function setStopwatchStarted() {
    stopwatchStarted = true;
}

export { time, stopwatchStarted, hours, minutes, seconds, totalTime, timerId, increment, timer, setStopwatchStarted }