//! Creo las consstantes de los elementos del DOM
//? Es el input de la tarea
const input = document.querySelector(".input-text");
//? Es el formulario
const addForm = document.querySelector(".add-form");
//? Es la lista de tareas
const tasksList = document.querySelector(".tasks-list");
//? Es el botón de borrar todas las tareas
const deleteBtn = document.querySelector(".deleteAll-btn");

//!Trabajo con el LocalStorage
//? Creo un array para las tareas. En primer lugar veo si hay en el localStorage almacenado un JSON con las mismas. Caso contrario, le asigno un array vacío.
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//? Creo una función que me guarde las tareas en el localStorage en formato JSON
const saveOnLocalStorage = (tasksList) => {
    localStorage.setItem("tasks", JSON.stringify(tasksList));
}

//! Empiezo con el trabajo de las task
//? Creo una función para la visual de las listas

const createTask = (task) => {
    const li = document.createElement("li");
    li.textContent = task.name;

    const imgTrash = document.createElement("img");
    imgTrash.classList.add("delete-btn");
    imgTrash.src = "./Assets/trash.svg";
    imgTrash.alt = "Botón de borrar";
    imgTrash.dataset.name = task.name;

    li.appendChild(imgTrash);

    const imgBox = document.createElement("imh");
    imgBox.classList.add("check-btn");
    imgBox.src= "./Assets/square.svg";
    imgBox.alt = "Boton de Check";
    imgBox.dataset.name = task.name;

    li.appendChild(imgBox);

    return li.outerHTML;
}

//? Renderizo las task para mostrar en pantalla
const renderTaskList = (list) => {
    tasksList.innerHTML = list.map((task) => createTask(task)).join("");
}








//? Creo una función para mostrar o no el botón de borrar todas las tareas en caso de que no haya tareas
const hideDeleteAll = (tasksList) => {
    if (!tasksList.length) {
        deleteBtn.classList.add("hidden");
        return;
    }
    deleteBtn.classList.remove("hidden");
}



//Una función que inicia a penas entras al sítio
const init = () => {
    renderTaskList(tasks);
    addForm.addEventListener("submit", addTask);
    addEventListener("click", removeTask);
    deleteBtn.addEventListener("click",removeAll);
    hideDeleteAll(tasks);
}

//llamo a la función inicial
init();