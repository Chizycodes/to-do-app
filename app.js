let addBtn = document.getElementById("add");
let inputField = document.getElementById("input");
let todoList = document.getElementById("todoList");
let clearAllBtn = document.getElementById("clear");
let saveBtn = document.getElementById("save");

inputField.onkeyup = () => {
  //Get input text
  let inputText = inputField.value;

  //Activate/Deactivate Add Button
  if (inputText.trim() !== "") {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

//Add button clicked
addBtn.onclick = () => {
  let inputText = inputField.value;
  let getLocalStorage = localStorage.getItem("Tasks");
  if (getLocalStorage == null) {
    taskArray = [];
  } else {
    taskArray = JSON.parse(getLocalStorage);
  }
  taskArray.push(inputText);

  localStorage.setItem("Tasks", JSON.stringify(taskArray));
  showTasks();
  addBtn.classList.remove("active");
};

//Display Tasks From Local Storage
function showTasks() {
  let getLocalStorage = localStorage.getItem("Tasks");
  if (getLocalStorage == null) {
    taskArray = [];
  } else {
    taskArray = JSON.parse(getLocalStorage);
  }

  //Activate/Deactivate Clear All Button
  if (taskArray.length > 0) {
    clearAllBtn.classList.add("active");
  } else {
    clearAllBtn.classList.remove("active");
  }

  let taskList = "";
  taskArray.forEach((element, index) => {
    taskList += `<li>
          <span class="todo">${element}</span>
          <div>
            <span id="edit" onclick="editTask(${index})"><i class="fas fa-edit"></i></span>
            <span id="delete" onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i></span>
          </div>
        </li>`;
  });
  todoList.innerHTML = taskList;
  inputField.value = "";
}

//Delete Task
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("Tasks");
  taskArray = JSON.parse(getLocalStorage);
  taskArray.splice(index, 1);

  localStorage.setItem("Tasks", JSON.stringify(taskArray));

  showTasks();
}

//Edit Task
function editTask(index) {
  addBtn.style.display = "none";
  saveBtn.style.display = "block";

  let getLocalStorage = localStorage.getItem("Tasks");
  taskArray = JSON.parse(getLocalStorage);

  inputField.value = taskArray[index];
  saveBtn.onclick = () => {
    let getLocalStorage = localStorage.getItem("Tasks");
    taskArray = JSON.parse(getLocalStorage);
    taskArray[index] = inputField.value;
    localStorage.setItem("Tasks", JSON.stringify(taskArray));

    showTasks();

    addBtn.style.display = "block";
    saveBtn.style.display = "none";
    inputField.value = "";
  }

}

//Clear All
clearAllBtn.onclick = () => {
  taskArray = [];
  localStorage.setItem("Tasks", JSON.stringify(taskArray));
  showTasks();
}