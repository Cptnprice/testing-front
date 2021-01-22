let firstBox = document.getElementById("first-box");
let secondBox = document.getElementById("second-box");
let thirdBox = document.getElementById("third-box");
let fourthBox = document.getElementById("fourth-box");
let fifthBox = document.getElementById("fifth-box");
let boxes = [firstBox, secondBox, thirdBox, fourthBox, fifthBox];
let previousX;
let previousY;
let moving = true;
let temp = undefined;
let temp1;
// let currentBoxOffsetLeft;

let moveBox = (e1) => {
    // console.log("testing");
    currentBox = e1.target;
    currentBox.style.zIndex = 100;
    currentBoxIndex = boxes.indexOf(currentBox);
    let currentBoxOffsetLeft = currentBox.offsetLeft;
    currentBox.style.top = currentBox.offsetTop + (e1.clientY - previousY) + "px";
    currentBox.style.left = currentBox.offsetLeft + (e1.clientX - previousX) + "px";
    let boxes1 = boxes.filter((box) => box.offsetLeft < temp1);
    for (let i = 0; i < boxes1.length; i++) {
        let box = boxes1[i];
        // console.log(i, box, box.offsetLeft, e1.clientX, (box.offsetLeft + 100 >= e1.clientX), (e1.clientY >= box.offsetTop - 100 && e1.clientY <= box.offsetTop + 100));
        // if ((e1.clientX <= box.offsetLeft + 100 && e1.clientX >= box.offsetLeft) && (e1.clientY >= box.offsetTop - 100 && e1.clientY <= box.offsetTop + 100)) {
            // console.log(box.offsetLeft, e1.clientX);
            if ((box.offsetLeft + 100 >= e1.clientX && box.offsetLeft <= e1.clientX) && (e1.clientY >= box.offsetTop - 100 && e1.clientY <= box.offsetTop + 100)) { 
            // temp = box;
            // if (temp == undefined) {
            //     temp = box;
            // }
            // else if (temp != box) {
            //     console.log(temp, box);
                // if (moving) {
                    box.classList.add("move");
                    box.style.left = box.offsetLeft + 200 + "px";
                    // moving = false;
                    // setTimeout(() => {
                    //     moving = true;
                    // }, 1000);
                // }
            // }
            }
            // else {
            //     console.log(boxes1);
            // }
    }
    previousX = e1.clientX;
    previousY = e1.clientY;
}

boxes.forEach((box) => {
    box.addEventListener("mousedown", (e) => {
        box.classList.remove("move");
        previousX = e.clientX;
        previousY = e.clientY;
        temp1 = e.clientX;
        // currentBoxOffsetLeft = box.offsetLeft;
        box.addEventListener("mousemove", moveBox);
    });
});

boxes.forEach((box) => {
    box.addEventListener("mouseup", () => {
        box.removeEventListener("mousemove", moveBox);
        // moving = true;
        box.style.zIndex = 1;
    });
});