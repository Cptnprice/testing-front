let firstBox = document.getElementById("testing");
let secondBox = document.getElementById("testing2");
let boxes = [firstBox, secondBox];
let previousX;
let previousY;

let testingFunction = (e1) => {
    box = e1.target;
    box.style.top = box.offsetTop + (e1.clientY - previousY) + "px";
    box.style.left = box.offsetLeft + (e1.clientX - previousX) + "px";
    previousX = e1.clientX;
    previousY = e1.clientY;
}

boxes.forEach((box) => {
    box.addEventListener("mousedown", (e) => {
        previousX = e.clientX;
        previousY = e.clientY;
        box.addEventListener("mousemove", testingFunction);
    })
});

// firstBox.addEventListener("mousedown", (e) => {
//     previousX = e.clientX;
//     previousY = e.clientY;
//     firstBox.addEventListener("mousemove", testingFunction);
    // console.log("screenX : ", e.clientX, "screenY : ", e.clientY);
    // if ((e.clientX >= firstBox.offsetLeft - 100 && e.clientX <= firstBox.offsetLeft + 100) && (e.clientY >= firstBox.offsetTop - 100 && e.clientY <= firstBox.offsetTop + 100)) {
    //     console.log("test9");
    //     console.log("top : ", firstBox.offsetTop, "left : ", firstBox.offsetLeft, "screenX : ", e.clientX, "screenY : ", e.clientY);
    // }
    // else {
    //     console.log("x coordinate : ", e.clientX >= firstBox.offsetLeft && e.clientX <= firstBox.offsetLeft + 200, "offsetLeft : ", firstBox.offsetLeft);
    //     console.log("y coordinate : ", e.clientY >= firstBox.offsetTop && e.clientY <= firstBox.offsetTop + 200, "offsetTop : ", firstBox.offsetTop);
    // }
// });


boxes.forEach((box) => {
    box.addEventListener("mouseup", () => {
        box.removeEventListener("mousemove", testingFunction);
    });
});