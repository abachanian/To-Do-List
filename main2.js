//? Creo las constantes de los elementos del DOM
//* Es el input de la tarea
const input = document.querySelector(".input-text");
//* Es el formulario
const addForm = document.querySelector(".form-tareas");
//* Es la lista de tareas Completas
const tasksListCompleta = document.querySelector(".tasks-list-c");
//* Es la lista de tareas
const tasksListPendiente = document.querySelector(".tasks-list-p");


//? Creo la clase del objeto task
class objetoTask {
    //* Creo una propiedad estática para el ID de la tarea, esto me va a servir para el manejo en las funciones de ver cual tengo que cambiar de estado, mostrar, eliminar, etc...
    static currentID = 1;

    //*En el objeto, el estado lo dejo en formato predeterminada "P", lo cual marca que está pendiente al momento de crearse. El ID de la tarea se va a incrementar automáticamente cuando se cree una tarea.
    constructor (titulo, estado = "P") {
        this.id = objetoTask.currentID++;
        this.titulo = titulo;
        this.estado = estado;
    }

    //* Creo una función para el cambio de estado de la tarea, si la misma está en Pendiente, al llamarla paso a "C" de completa, o lo contrario.
    cambiarEstado () {
        this.estado = (this.estado === "P") ? "C" : "P"; 
    }
}


//?Trabajo con el LocalStorage
//* Creo un array para las tareas. En primer lugar veo si hay en el localStorage almacenado un JSON con las mismas. Caso contrario, le asigno un array vacío.
let tasksArray = JSON.parse(localStorage.getItem("tasksArray")) || [];

//* Creo una función que me guarde las tareas en el localStorage en formato JSON
const saveOnLocalStorage = (tasksList) => {
    localStorage.setItem("tasksArray", JSON.stringify(tasksList));
}


//? Creo una función para almacenar las task
const agregarTasks = (evento) => {
    
    evento.preventDefault();//Busco evitar que se recargue la página

    const tituloTask = input.value.trim();//Guardo el valor del input en la variable titulo y le hago un trim por si tiene espacios adelante o al final del mismo.

    if (!tituloTask.length) {

        alert ("La tarea no puede estar vacía");//Mando el alerta de que el campo está vacío.

    } else if (tasksArray.some(task => task.titulo.toLowerCase() === tituloTask.toLowerCase())) {
        
        alert("Ya existe una tarea con el mismo título");//Si ya existe una tarea con el mismo título, muestro alerta

    }else {

        let nuevaTask = new objetoTask(tituloTask);//creo una variable nuevaTask, la cual llama al objeto task y le crea un título
        tasksArray.push(nuevaTask);//guardo el objeto creado en el array;
        saveOnLocalStorage(tasksArray);//Guardo en el localStorage el array nuevo
        input.value = "";//Reinicio el input para que quede vacío
        mostrarTask();//Llamo a la función mostrarTask para que se visualicen las mismas.
    }
}

//? Creo la escucha de la acción del formulario
addForm.addEventListener("submit", agregarTasks);


//? Creo una función para mostrar las task
const mostrarTask = () => {
    tasksListPendiente.innerHTML = "";//Borro todo antes que muestre
    tasksListCompleta.innerHTML = "";//Borro todo antes que muestre

    tasksArray.forEach(task => {

        const li = document.createElement("li");
        li.textContent = `${task.titulo}`;
        li.dataset.id = task.id;//Guardo el ID en el atributo data-id

        const imgBorrar = document.createElement("img");
        imgBorrar.src = "./Assets/trash.svg";
        imgBorrar.alt = "Eliminar Tarea";
        imgBorrar.dataset.id = task.id;

        const imgEstado = document.createElement("img");
        imgEstado.src = "./Assets/square.svg";
        imgEstado.alt = "Cambiar estado";
        imgEstado.dataset.id = task.id;

        // Añado el evento de clic para borrar la tarea
        imgBorrar.addEventListener("click", () => {
            borrarTask(task.id);
        });

        // Añado el evento de clic para cambiar el estado de la tarea
        imgEstado.addEventListener("click", () => {
            task.cambiarEstado();
            saveOnLocalStorage(tasksArray); // Guarda el nuevo estado en LocalStorage
            mostrarTask(); // Muestra la lista actualizada
        });

        li.appendChild(imgBorrar);
        li.appendChild(imgEstado);
        
        
        if (task.estado === "P") {

            tasksListPendiente.appendChild(li);

        } else {

            tasksListCompleta.appendChild(li);

        }
    });

}

//? Creo la función para borrar la tarea
const borrarTask = (id) => {
    tasksArray = tasksArray.filter(task => task.id !== id); // Filtra la tarea que se quiere eliminar
    saveOnLocalStorage(tasksArray); // Guarda el nuevo array en LocalStorage
    mostrarTask(); // Muestra la lista actualizada
}

//? Creo una función

mostrarTask();