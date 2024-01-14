// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrrPYPa_KVcCoQkCcQ51CxUA7RDMQBO9I",
  authDomain: "to-do-list-cef00.firebaseapp.com",
  databaseURL: "https://to-do-list-cef00-default-rtdb.firebaseio.com",
  projectId: "to-do-list-cef00",
  storageBucket: "to-do-list-cef00.appspot.com",
  messagingSenderId: "882467650863",
  appId: "1:882467650863:web:331fea17840da9878df5da",
  measurementId: "G-J9VG15WDD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

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
    // e.preventDefault();
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
    let tasks = listContainer.innerHTML;
    set(ref(db, '/'), {
        tasks: tasks
    });
}

function showData(){
    onValue(ref(db, '/'), (snapshot) => {
        const data = snapshot.val();
        if (data) {
            listContainer.innerHTML = data.tasks;
        }
    });
}
showData();
