let remainedQuantity = document.getElementById("remained-quantity");
let doneQuantity = document.getElementById("done-quantity");
let completedContainer = document.getElementById("completed-container");
let remainedContainer = document.getElementById("remained-container");
let totalActive = 0;

let glasses = document.getElementsByClassName("each-glass");
glasses = Array.from(glasses);

const checkActive = (x) => {
    return x.classList.contains("active");
}

const measure = (c, i) => {
    if (!(c.classList.contains("active"))) {
        for (let k = 0; k < i; k++) {
            if (!(glasses[k].classList.contains("active"))) {
                glasses[k].classList.add("active");
                totalActive++;
            }
        }
        c.classList.add("active");
        totalActive++;
    }
    else {
        if (glasses.slice(i+1).some(checkActive)) {
            for (let k = i+1; k < glasses.length; k++) {
                if (glasses[k].classList.contains("active")) {
                    glasses[k].classList.remove("active");
                    totalActive--;
                }
            }
        }
        else {
            glasses[i].classList.remove("active");
            totalActive--;
        }
    }
}

for (let i = 0; i < glasses.length; i++) {
    let c = glasses[i];
    c.addEventListener("click", async () => {
        await measure(c, i);
        let newRemainedQuantity = Number.parseFloat(totalActive ? ((totalActive * 2) / 8) : 2).toFixed(2);
        let newDoneQuantity = (totalActive * 100) / 8;
        let newCompletedContainerHeight = (340 * newDoneQuantity) / 100;
        let newRemainedContainerHeight = (340 * (100 - newDoneQuantity)) / 100;
        remainedQuantity.innerHTML = `${newRemainedQuantity} L`;
        doneQuantity.innerHTML = `${newDoneQuantity}%`;
        completedContainer.style.height = newCompletedContainerHeight + "px";
        remainedContainer.style.height = newRemainedContainerHeight + "px";
    })
}