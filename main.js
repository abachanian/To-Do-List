//? Creo las constantes de los elementos del DOM
//* Es el input de la tarea
const input = document.querySelector(".input-text");
//* Es el input de la descripcion
const inputDescripcion = document.querySelector(".input-textarea");
//* Es el input de la fecha
const inputFecha = document.querySelector(".input-date");
//* Es el formulario
const addForm = document.querySelector(".form-tareas");
//* Es la lista de tareas Completas
const tasksListCompleta = document.querySelector(".tasks-list-c");
//* Es la lista de tareas
const tasksListPendiente = document.querySelector(".tasks-list-p");
//* Creo el botón de eliminar
const deleteTarea = document.querySelector(".delete-task");
//* Creo el botón de cambio de estado
const changeTask = document.querySelector(".change-task");
//* Creo el botón de editar
const editTask = document.querySelector(".edit-task");
//* Creo el botón de la API
const inputApi = document.querySelector(".api-btn");

//? Creo la clase del objeto task
class objetoTask {
    //* Creo una propiedad estática para el ID de la tarea, esto me va a servir para el manejo en las funciones de ver cual tengo que cambiar de estado, mostrar, eliminar, etc...
    static currentID = 1;

    //*En el objeto, el estado lo dejo en formato predeterminada "P", lo cual marca que está pendiente al momento de crearse. El ID de la tarea se va a incrementar automáticamente cuando se cree una tarea.
    constructor (titulo, descripcion, fecha = NULL , estado = "P") {
        this.id = objetoTask.currentID++;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
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
    let descripcionTask = inputDescripcion.value.trim();//Creo la variable descripción
    let fechaTask = inputFecha.value;//creo la variable con el dato de la fecha

    if (!tituloTask.length) {

        alert ("La tarea no puede estar vacía");//Mando el alerta de que el campo está vacío.

    } else if (tasksArray.some(task => task.titulo.toLowerCase() === tituloTask.toLowerCase())) {
        
        alert("Ya existe una tarea con el mismo título");//Si ya existe una tarea con el mismo título, muestro alerta

    }else {
        if (!descripcionTask.length) {

            descripcionTask = "Sin descripción";
        }
        if (!fechaTask.length) {

            fechaTask = "Sin Vencimiento";
        }

        let nuevaTask = new objetoTask(tituloTask, descripcionTask, fechaTask);//creo una variable nuevaTask, la cual llama al objeto task y le crea un título
        tasksArray.push(nuevaTask);//guardo el objeto creado en el array;
        saveOnLocalStorage(tasksArray);//Guardo en el localStorage el array nuevo
        input.value = "";//Reinicio el input para que quede vacío
        inputDescripcion.value = "";//Reinicio el input para que quede vacío
        inputFecha.value = "";//Reinicio el input para que quede vacío
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
        //Creo la lista de cada tarea
        const li = document.createElement("li");
        li.dataset.id = task.id;//Guardo el ID en el atributo data-id

        //Creo el título de la tarea
        const h3 = document.createElement("h3");
        h3.textContent = task.titulo;
        li.appendChild(h3);

        //Creo la fecha de la tarea
        const p = document.createElement("p");
        p.textContent = task.fecha;
        li.appendChild(p);

        //Creo la descripción de la tarea
        const text = document.createElement("text");
        text.textContent = task.descripcion;
        li.appendChild(text);

        //Creo un div que es para el ordenamiento de los botones
        const divBotones = document.createElement("div");
        divBotones.classList.add("div-botones");
        
        //Creo el botón de borrar task
        const btnBorrar = document.createElement("button");
        btnBorrar.classList.add("delete-task");
        btnBorrar.dataset.id = task.id;
        divBotones.appendChild(btnBorrar);

        //Creo la imagen del botón de borrar
        const imgBorrar = document.createElement("img");
        imgBorrar.src = "./Assets/trash.svg";
        imgBorrar.alt = "Eliminar Tarea";
        imgBorrar.classList.add("img-boton");
        btnBorrar.appendChild(imgBorrar);

        //Creo el botón de editar task
        const btnEditar = document.createElement("button");
        btnEditar.classList.add("edit-task");
        btnEditar.dataset.id = task.id;
        divBotones.appendChild(btnEditar);

        //Creo la imagen del botón de editar
        const imgEditar = document.createElement("img");
        imgEditar.src = "./Assets/edit.svg";
        imgEditar.alt = "Editar Tarea";
        imgEditar.classList.add("img-boton");
        btnEditar.appendChild(imgEditar);
        
        //Creo el botón de cambiar estado
        const btnChange = document.createElement("button");
        btnChange.classList.add("delete-task");
        btnChange.dataset.id = task.id;
        divBotones.appendChild(btnChange);

        //Creo la imagen del botón de cambiar estado
        const imgEstado = document.createElement("img");
        
        // Cambio la imagen según el estado de la tarea
        if (task.estado === "P") {
            imgEstado.src = "./Assets/check-square.svg";
        } else {
            imgEstado.src = "./Assets/square.svg";
        }

        // Añado el atributo alt y la clase de la imagen
        imgEstado.alt = "Cambiar estado";
        imgEstado.classList.add("img-boton");
        btnChange.appendChild(imgEstado);

        // Añado el evento de clic para borrar la tarea
        btnBorrar.addEventListener("click", () => {
            borrarTask(task.id);
        });

        // Añado el evento de clic para cambiar el estado de la tarea
        btnChange.addEventListener("click", () => {
            task.cambiarEstado();
            saveOnLocalStorage(tasksArray); // Guarda el nuevo estado en LocalStorage
            mostrarTask(); // Muestra la lista actualizada
        });

        // Añado el evento de clic para editar la tarea
        btnEditar.addEventListener("click", () => {
            editarTask(task.id);
        });

        li.appendChild(divBotones);
        
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

//? Creo una función para editar una tarea
const editarTask = (id) => {
    const task = tasksArray.find(task => task.id === id); // Busca la tarea que se quiere editar
    input.value = task.titulo; // Muestra el título en el input
    if (task.descripcion === "Sin descripción") {
        task.descripcion = "";
    } else {
        inputDescripcion.value = task.descripcion; // Muestra la descripción en el input
    }
    inputFecha.value = task.fecha; // Muestra la fecha en el input
    borrarTask(id); // Borra la tarea que se quiere editar
}

// Función para cargar tareas desde la API
const cargarTareasDesdeAPI = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
        const data = await response.json();
        
        // Hago un recorrido de los datos obtenidos de la API y creo una nueva tarea por cada uno
        data.forEach(item => {
            if (item.title && item.title.trim().length > 0) {
                // Creo una nueva tarea y la agrego al array
                const nuevaTask = new objetoTask(
                    item.title,//Título de la tarea
                    "Tarea de API",// Descripción predeterminada
                    null,//Sin fecha predeterminada
                    item.completed ? "C" : "P"//Estado basado en el valor de "completed" de la API
                );
                tasksArray.push(nuevaTask);
            }
        });

        // Guarda en localStorage y muestra las tareas actualizadas en la interfaz
        saveOnLocalStorage(tasksArray);
        mostrarTask(); 

        alert("Tareas cargadas desde la API correctamente");

    } catch (error) {
        console.error("Error al cargar tareas desde la API:", error);
        alert("Hubo un error al cargar las tareas desde la API");
    }
};

//? Creo la función para la escucha del botón de la API
inputApi.addEventListener("click", cargarTareasDesdeAPI);

//? Llamo la función mostrar task para que se visualicen las tareas
mostrarTask();

