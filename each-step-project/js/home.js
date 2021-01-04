let allDots = document.getElementsByClassName("each-dot");
let allHorizontalLines = document.getElementsByClassName("horizontal-line");
let previousButton = document.getElementById("previous");
let nextButton = document.getElementById("next");

let activeDots = 1;
let activeHorizontalLines = 0;

nextButton.addEventListener("click", () => {
    allHorizontalLines[activeHorizontalLines].classList.add("active-horizontal-line");
    activeHorizontalLines++;
    allDots[activeDots].classList.add("active-dot");
    activeDots++;
    if (activeDots > 1) {
        previousButton.disabled = false;
        previousButton.classList.remove("unavailable");
    }
    if (activeDots == 4) {
        nextButton.disabled = true;
        nextButton.classList.add("unavailable");
    }
});

previousButton.addEventListener("click", () => {
    activeHorizontalLines--;
    allHorizontalLines[activeHorizontalLines].classList.remove("active-horizontal-line");
    activeDots--;
    allDots[activeDots].classList.remove("active-dot");
    if (activeDots == 1) {
        previousButton.disabled = true;
        previousButton.classList.add("unavailable");
    }
    if (activeDots < 4) {
        nextButton.disabled = false;
        nextButton.classList.remove("unavailable");
    }
});