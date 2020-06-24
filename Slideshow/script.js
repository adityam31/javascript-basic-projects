//ESSENTIALS
const imgPath = "slideshow/";
const imageCount = 5;
let currentImg = 1;
let showFlag = false;
let autoShow;

/****************************************************** */
//QUERYING DOM ELEMENTS
const showDiv = document.querySelector("#showDiv");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const modeDiv = document.querySelector("#modeDiv");
const showMode = document.querySelector("#showMode");
const selectSec = document.querySelector("#selectSec");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");

const imgEle = document.createElement("img");


/****************************************************** */
//UTILITY FUNCTIONS

const displayAutoElements = () => {

    if(showMode.value === "auto"){
        selectSec.style.display = "block";
        startBtn.style.display = "block";
        stopBtn.style.display = "block";
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    }
    else{
        selectSec.style.display = "none";
        startBtn.style.display = "none";
        stopBtn.style.display = "none";
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
    } 
};

const startShow = () => {
    showFlag = true;
    autoShow = window.setInterval(()=>{
        currentImg = (++currentImg % (imageCount+1));
        currentImg == 0 ? currentImg = 1 : currentImg = currentImg;
        imgEle.src = imgPath + "image" + currentImg + ".png";
    }, parseInt(selectSec.value) * 1000);
};

const stopShow = () => {
    if(showFlag){
        showFlag = false;
        window.clearInterval(autoShow);
    }
}

/****************************************************** */

document.addEventListener("DOMContentLoaded", () => {
    imgEle.className = "image shadow m-auto";
    showDiv.appendChild(imgEle);
    imgEle.src = imgPath + "image" + currentImg + ".png";
    prevBtn.style.display = "none";

    displayAutoElements();
});

prevBtn.addEventListener("click", () => {
    if(currentImg > 1){
        currentImg--;
        imgEle.src = imgPath + "image" + currentImg + ".png";

        nextBtn.style.display = "block";

        if(currentImg === 1)
            prevBtn.style.display = "none";
        else    
            prevBtn.style.display = "block";
    }
});

nextBtn.addEventListener("click", () => {
    if(currentImg < imageCount){
        currentImg++;
        imgEle.src = imgPath + "image" + currentImg + ".png";

        prevBtn.style.display = "block";

        if(currentImg === imageCount)
            nextBtn.style.display = "none";
        else
            nextBtn.style.display = "block";
    }
});

showMode.addEventListener("change", () => {
    displayAutoElements();
    stopShow();
});

startBtn.addEventListener("click", () => startShow());
stopBtn.addEventListener("click", () => stopShow());
selectSec.addEventListener("change", () => stopShow());