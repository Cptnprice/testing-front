let firstBox = document.getElementById("testing");
let previousX;
let previousY;

let testingFunction = (e1) => {
    firstBox.style.top = firstBox.offsetTop + (e1.clientY - previousY) + "px";
    firstBox.style.left = firstBox.offsetLeft + (e1.clientX - previousX) + "px";
    previousX = e1.clientX;
    previousY = e1.clientY;
}

firstBox.addEventListener("mousedown", (e) => {
    previousX = e.clientX;
    previousY = e.clientY;
    firstBox.addEventListener("mousemove", testingFunction);
    // console.log("screenX : ", e.clientX, "screenY : ", e.clientY);
    // if ((e.clientX >= firstBox.offsetLeft - 100 && e.clientX <= firstBox.offsetLeft + 100) && (e.clientY >= firstBox.offsetTop - 100 && e.clientY <= firstBox.offsetTop + 100)) {
    //     console.log("test9");
    //     console.log("top : ", firstBox.offsetTop, "left : ", firstBox.offsetLeft, "screenX : ", e.clientX, "screenY : ", e.clientY);
    // }
    // else {
    //     console.log("x coordinate : ", e.clientX >= firstBox.offsetLeft && e.clientX <= firstBox.offsetLeft + 200, "offsetLeft : ", firstBox.offsetLeft);
    //     console.log("y coordinate : ", e.clientY >= firstBox.offsetTop && e.clientY <= firstBox.offsetTop + 200, "offsetTop : ", firstBox.offsetTop);
    // }
});

firstBox.addEventListener("mouseup", () => {
    firstBox.removeEventListener("mousemove", testingFunction);
})