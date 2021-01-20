let firstBox = document.getElementById("first-box");
let secondBox = document.getElementById("second-box");
let boxes = [firstBox, secondBox];
let previousX;
let previousY;

let moveBox = async (e1) => {
    box = e1.target;
    box.style.top = box.offsetTop + (e1.clientY - previousY) + "px";
    box.style.left = box.offsetLeft + (e1.clientX - previousX) + "px";
    if (box.id != "second-box") {
        if ((e1.clientX >= secondBox.offsetLeft - 100 && e1.clientX <= secondBox.offsetLeft + 100) && (e1.clientY >= secondBox.offsetTop - 100 && e1.clientY <= secondBox.offsetTop + 100)) {
            secondBox.classList.add('move');
            secondBox.style.left = secondBox.offsetLeft + 300 + "px";
        }
    }
    previousX = e1.clientX;
    previousY = e1.clientY;
}

boxes.forEach((box) => {
    box.addEventListener("mousedown", (e) => {
        box.classList.remove("move");
        previousX = e.clientX;
        previousY = e.clientY;
        box.addEventListener("mousemove", moveBox);
    });
});

boxes.forEach((box) => {
    box.addEventListener("mouseup", () => {
        box.removeEventListener("mousemove", moveBox);
    });
});