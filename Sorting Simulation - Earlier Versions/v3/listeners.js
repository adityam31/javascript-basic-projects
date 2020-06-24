//ADDING LISTENERS
document.addEventListener("DOMContentLoaded",() => {
    loadAlgoList();
    renderArray();
    changeCode();
});

generateBtn.addEventListener("click",() => renderArray());

inputSizeRange.addEventListener("change",() => changeSize());

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
        case "selection":{
            selectionSort();
            break;
        }
    }
});