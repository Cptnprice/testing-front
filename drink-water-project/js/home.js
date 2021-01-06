let remainedQuantity = document.getElementById("remained-quantity");
let doneQuantity = document.getElementById("done-quantity");

let glasses = document.getElementsByClassName("each-glass");
glasses = Array.from(glasses);

const checkActive = (x) => {
    return x.classList.contains("active");
}

for (let i = 0; i < glasses.length; i++) {
    let c = glasses[i];
    c.addEventListener("click", () => {
        if (!(c.classList.contains("active"))) {
            for (let k = 0; k < i; k++) {
                if (!(glasses[k].classList.contains("active"))) {
                    glasses[k].classList.add("active");
                }
            }
            c.classList.add("active");
        }
        else {
            if (glasses.slice(i+1).some(checkActive)) {
                for (let k = i+1; k < glasses.length; k++) {
                    if (glasses[k].classList.contains("active")) {
                        glasses[k].classList.remove("active");
                    }
                }
            }
            else {
                glasses[i].classList.remove("active");
            }
        }
    })
}