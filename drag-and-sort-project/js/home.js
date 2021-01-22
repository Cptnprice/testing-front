let firstBox = document.getElementById("first-box");
let secondBox = document.getElementById("second-box");
let thirdBox = document.getElementById("third-box");
let fourthBox = document.getElementById("fourth-box");
let fifthBox = document.getElementById("fifth-box");
let boxes = [firstBox, secondBox, thirdBox, fourthBox, fifthBox];
let boxes2 = [];
let previousX;
let previousY;
let temp1;

let moveBox = (e1) => {
    currentBox = e1.target;
    if (!boxes2.includes(currentBox)) {
        boxes2.push(currentBox);
    }
    currentBox.style.zIndex = 100;
    currentBoxIndex = boxes.indexOf(currentBox);
    currentBox.style.top = currentBox.offsetTop + (e1.clientY - previousY) + "px";
    currentBox.style.left = currentBox.offsetLeft + (e1.clientX - previousX) + "px";
    let boxes1 = boxes.filter((box) => box.offsetLeft < temp1);
    for (let i = 0; i < boxes1.length; i++) {
        let box = boxes1[i];
            if ((box.offsetLeft + 100 >= e1.clientX && box.offsetLeft <= temp1) && (e1.clientY >= box.offsetTop - 100 && e1.clientY <= box.offsetTop + 100)) {
                if (!boxes2.includes(box)) { 
                        box.classList.add("move");
                        box.style.left = box.offsetLeft + 200 + "px";
                        boxes2.push(box);
                }
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
        temp1 = box.offsetLeft + 200;
        box.addEventListener("mousemove", moveBox);
    });
});

boxes.forEach((box) => {
    box.addEventListener("mouseup", () => {
        box.removeEventListener("mousemove", moveBox);
        boxes2 = [];
        box.style.zIndex = 1;
    });
});