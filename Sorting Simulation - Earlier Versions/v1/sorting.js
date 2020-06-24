const startBtn = document.getElementById("start");
const generateBtn = document.getElementById("generate");
const arrayNode = document.querySelector(".array");

let sleep = (duration) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, duration * 1000)
	})
};

let generateRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

let setClass = (node, className=null) => {
    if(!className)
        node.className = "cell";
    
    node.className = "cell "+className;
};

let renderArray = () => {

    arrayNode.innerHTML = "";

    let randomLength = generateRandom(4, 10);

    let cellNode;
    for(let i = 0; i < randomLength; i++){

        cellNode = document.createElement("div");
        cellNode.textContent = generateRandom(5, 1000);
        setClass(cellNode);

        arrayNode.appendChild(cellNode);
    }
};


let bubbleSort = async () => {

    let cellArray = document.querySelectorAll(".cell");

    for(let i = 0; i < cellArray.length; i++){
        for(let j = 0; j < cellArray.length - i - 1; j++){
            
            await sleep(1.2);
            setClass(cellArray[j], "referenced")
            setClass(cellArray[j+1], "compared")

            let a = parseInt(cellArray[j].textContent)
            let b = parseInt(cellArray[j+1].textContent)

            await sleep(2);

            if(a > b){
                setClass(cellArray[j], "referenced m-right");
                setClass(cellArray[j+1], "compared m-left");
                
                await sleep(0.99);

                cellArray[j].textContent = b;
                cellArray[j+1].textContent = a;
                
            }

            await sleep(1);
            setClass(cellArray[j]);
            setClass(cellArray[j+1]);
        }
        setClass(cellArray[cellArray.length - i - 1], "done");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    renderArray();
});

generateBtn.addEventListener("click", () => {
    renderArray();
});

startBtn.addEventListener("click", () => {
    bubbleSort();
});