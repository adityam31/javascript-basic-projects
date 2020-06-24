const simpleColours = ["Red", "Green", "Blue", "Black", 
                "White", "Gray", "Yellow", "Orange",
                "Purple", "Violet", "Pink"
                ];
const simpleColoursHex = ["#FF0000", "#008000", "#0000FF", "#000000",
                "#FFFFFF", "#808080", "#FFFF00", "#FFA500",
                "#800080", "#EE82EE", "#FFC0CB"
                ];

const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
let simpleFlag = true;
let flip = null;

document.body.style.backgroundColor = "White";

const startFlipBtn = document.getElementById("startFlipBtn");
const stopFlipBtn = document.getElementById("stopFlipBtn");
const colourEditSpan = document.getElementById("colourEditSpan");
const simpleNav = document.getElementById("simpleNav");
const hexNav = document.getElementById("hexNav");

simpleNav.addEventListener("click", () => {
    
    if(flip){
        window.clearInterval(flip);
        flip = null;
    }


    if(!simpleFlag){
        simpleNav.className = "nav-item active";
        hexNav.className = "nav-item";
    }
    simpleFlag = true;
});

hexNav.addEventListener("click", () => {

    if(flip){
        window.clearInterval(flip);
        flip = null;
    }

    if(simpleFlag){

        hexNav.className = "nav-item active";
        simpleNav.className = "nav-item";
        
        let curColour = colourEditSpan.textContent;
        let temp =  curColour;
        let curColourHex = simpleColoursHex[simpleColours.indexOf(curColour)];
        
        colourEditSpan.textContent = curColourHex || temp;
    }

    simpleFlag = false;
});


let changeColour = () => {
    
    let randomColour;

    if(simpleFlag){
        randomColour = simpleColours[Math.floor(Math.random() * simpleColours.length)];   
    }
    else{
        randomColour = "#";

        for(let i = 0; i < 6; i++){
            randomColour += hex[Math.floor(Math.random() * hex.length)];
        }
    }

    document.body.style.backgroundColor = randomColour;
    colourEditSpan.textContent = randomColour;
}

startFlipBtn.addEventListener("click", () => {
    flip = window.setInterval(changeColour, 750);
});

stopFlipBtn.addEventListener("click", () => {
    if(flip){
        window.clearInterval(flip);
        flip = null;
    }
});

