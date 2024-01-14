const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    let input = inputBox.value;
    let trimedInput = input.trim();

    if(trimedInput !== ''){
        let li = document.createElement("li");
        li.style.overflowWrap = "break-word";
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    
    inputBox.value = "";
    saveData()
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData()
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
}, false);

function clearTasks(){
    let checkedItems = document.querySelectorAll('.checked');

    for(let i=0; i<checkedItems.length; i++){
        checkedItems[i].remove();
    }
    saveData();
}

window.addEventListener("scroll", function(){
    let addDiv = document.querySelector("h2");
    addDiv.classList.toggle("sticky", this.window.scrollY > 0);
})

function saveData(){
    localStorage.setItem("todo_data", listContainer.innerHTML);
}

function showData(){
    listContainer.innerHTML = localStorage.getItem("todo_data");
}
showData();