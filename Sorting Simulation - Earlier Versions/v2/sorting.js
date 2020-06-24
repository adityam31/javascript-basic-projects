// DECLARING ESSENTIALS
const algoList = [
                    ["Bubble Sort", "bubble"], 
                    ["Insertion Sort", "insertion"]
                 ];       
const firstAlgo = "bubble";

/* ******************************************************************* */
// QUERYING DOM ELEMENTS
const inputSizeRange = document.getElementById("inputSize");
const sortAlgo = document.getElementById("sortAlgo");

const startBtn = document.getElementById("start");
const generateBtn = document.getElementById("generate");


const arrayNode = document.querySelector(".array");
const previewCode = document.getElementById("code");


/* ******************************************************************* */
// UTILITY FUNCTIONS FOR SORTING ALGORITHMS

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
    else
        node.className = "cell "+className;
};

let renderArray = () => {

    arrayNode.innerHTML = "";

    let arrayLength = parseInt(inputSizeRange.value);

    let cellNode;
    for(let i = 0; i < arrayLength; i++){

        cellNode = document.createElement("div");
        cellNode.textContent = generateRandom(5, 1000);
        setClass(cellNode);

        arrayNode.appendChild(cellNode);
    }
};

/* ******************************************************************* */
//SORTING ALGORITHMS

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

let insertionSort = async () => {
    
    let cellArray = document.querySelectorAll(".cell");
    
    let keyNode = document.createElement("div");
    keyNode.textContent = "KEY";
    setClass(keyNode);
    
    await sleep(2);
    arrayNode.appendChild(keyNode);
    await sleep(2);

    for(let i = 1; i < cellArray.length; i++){
        
        setClass(cellArray[i], "referenced");
        
        await sleep(1);
        
        keyNode.textContent = cellArray[i].textContent;

        setClass(cellArray[i]);

        await sleep(1);
        setClass(keyNode, "compared");

        let j = i-1;

        while(j >= 0 && parseInt(cellArray[j].textContent) > parseInt(keyNode.textContent)){
            
            await sleep(2);
            setClass(cellArray[j], "referenced m-right");
            
            await sleep(1);

            cellArray[j+1].textContent = cellArray[j].textContent;
            
            setClass(cellArray[j]);
            j--;

        }

        await sleep(2);

        setClass(keyNode, "done");
        setClass(cellArray[j+1], "done");
        
        await sleep(1);
        
        cellArray[j+1].textContent = keyNode.textContent;
        keyNode.textContent = "KEY";

        setClass(keyNode);
        setClass(cellArray[j+1]);

        await sleep(2);
        keyNode.textContent = "KEY";
    }

    await sleep(2);
    arrayNode.removeChild(keyNode);
};

/* ******************************************************************* */
//UTILITY FUNCTIONS FOR SET UP

let loadAlgoList = () => {

    for(let i = 0; i < algoList.length; i++){
        optionEl = document.createElement("option");
        optionEl.textContent = algoList[i][0]
        optionEl.value = algoList[i][1];

        sortAlgo.appendChild(optionEl);
    }

    document.querySelector(`option[value="${firstAlgo}"]`).selected = true;
}


let changeCode = () => {
    
    let algo = sortAlgo.value;

    switch(algo){
        case "bubble":{
            previewCode.textContent = `
void bubbleSort(int arr[]) 
{ 
    int n = arr.length; 
    for (int i = 0; i &lt; n-1; i++) 
        for (int j = 0; j &lt; n-i-1; j++) 
            if (arr[j] > arr[j+1]) 
            { 
                // swap arr[j+1] and arr[i] 
                int temp = arr[j]; 
                arr[j] = arr[j+1]; 
                arr[j+1] = temp; 
            } 
}
        `;
            break;
        }
        case "insertion":{
            previewCode.textContent = `
void insertionSort(int arr[]) 
{ 
    int n = arr.length; 
        for (int i = 1; i < n; ++i) { 
            int key = arr[i]; 
            int j = i - 1; 
          
            /* Move elements of arr[0..i-1], that are 
            greater than key, to one position ahead 
            of their current position */
            while (j >= 0 && arr[j] > key) { 
                arr[j + 1] = arr[j]; 
                j = j - 1; 
            } 
            arr[j + 1] = key; 
        } 
} 
        `;
            break;
        }
    }
};

/* ******************************************************************* */
//ADDING LISTENERS

document.addEventListener("DOMContentLoaded",() => {
    loadAlgoList();
    renderArray();
    changeCode();
});
generateBtn.addEventListener("click",() => renderArray());
inputSizeRange.addEventListener("change",() => renderArray());
sortAlgo.addEventListener("change",() => {
    renderArray();
    changeCode();
});

startBtn.addEventListener("click", () => {
    
    let algo = sortAlgo.value;

    switch(algo){
        case "bubble":{
            bubbleSort();
            break;
        }
        case "insertion":{
            insertionSort();
            break;
        }
    }

});