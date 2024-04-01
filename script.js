const inputBox = document.getElementById("input-box");
const list = document.getElementById("list");
const listContainer = document.getElementById("list-container");
const submit = document.getElementById("submit");

//Adding a task: alerts when empty input and runs func otherwise.
function addTask() {
  if (inputBox.value === "") {
    alert("You must write a task to add it.");
  } else {
    let li = document.createElement("li");      
    li.innerHTML = inputBox.value;
    list.appendChild(li);                            //create and store input into list item, which is then appended to list.
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);                           //create a span with cross icon for deletion, which is then appended to list item.
    scrollToBottom();                               //to assure visibility of the new task added.
  }
  inputBox.value = "";                              //erase the input form to blank.
  saveData();
}

function scrollToBottom() {
  listContainer.scrollTop = listContainer.scrollHeight;
}

//enter key functionality to add task
inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    submit.click();
  }
});
//click list item (task) to mark it checked. or click span (cross icon) to remove task.
list.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

//function to save content of list into "data".
function saveData() {
  localStorage.setItem("data", list.innerHTML);
}

//function to recall saved data.
function recallTasks() {
  list.innerHTML = localStorage.getItem("data");
}

recallTasks();

// Logic for part 3:
// (i)    Create a database "tasks" with the headings "Task_Description" and" Status" using sql. Make sure js and sql are integrated.
// (ii)   Upon running function addTask(), INSERT task_description and status INTO tasks (status will be incomplete by default. 
//        task_description will be the list item).
// (iii)  Whenever a click is registered, 
//            if it is on the list item and "checked" is toggled, update status of that list item
//            to mark it as complete. else update the status to incomplete.
//            if it is on the cross icon, isolate the parent of the span and then delete that row from databse. this will
//            give a problem if the same task is repeated. 
//            a better way would be to introduce a task id number and use that to delete and update row.
// (iv)   Add a function which runs in the beginning of the doc to import data from our "tasks" database if there's any data in it.
//  