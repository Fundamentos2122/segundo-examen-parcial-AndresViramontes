const attr_toggle = "data-toggle";
const attr_target = "data-target";
const attr_dismiss = "data-dismiss";
const attr_hidden = "data-hidden";
const class_modal = "modal";
const attr_id = "data-id";
var id_select;
var aux;
const tareaForm = document.forms["tareaForm"];
const tareaList = document.getElementById("tareas");
const taskKey= "tasks";
const class_show = "show";
const class_showAll= "show-task";
const class_hidden = "hidden";

document.addEventListener("DOMContentLoaded",function(){
    //botones que abren el modal
    let modal_open_buttons = document.querySelectorAll(`[${attr_toggle}='${class_modal}']`);

    modal_open_buttons.forEach(element => {
        element.addEventListener("click",OpenModal);
    });

    //Botones para cerrar el modal
    let modal_close_buttons = document.querySelectorAll(`[${attr_dismiss}]`);

    modal_close_buttons.forEach(element => {
        element.addEventListener("click",CloseModal);
    });

    

});

eventListener();
function eventListener(){
    //Agregar Tareas
    tareaForm.addEventListener("submit",addTarea);

    //Cuando la pagina termine de cargar
    document.addEventListener("DOMContentLoaded",showTarea);

    //para el filtro de todas las tareas
    let task_hidden_all = document.querySelector(`.viewall`);
    task_hidden_all.addEventListener("changed",showAlltasks);
    
}

function hiddenTask(id){
    //Para ocutar la tarea
    //Obtener el selector del elemento a mostrar
    //let task_selector = document.getElementById(id);
    id_select = id;
    //Obtener el emento del Dom
    let taskH = document.querySelector(`div[${attr_id}="${id_select}"]`);

    if(taskH === "checked"){
        taskH.classList.remove(class_hidden);
        taskH.classList.add(class_show);
    }else{
        taskH.classList.add(class_hidden);
    }
}

/**
 * Muestra un modal
 * @param {PointerEvent} e 
 */
function OpenModal (e){
    //Obtener el selector del elemento a mostrar 
    let modal_selector = e.target.getAttribute(attr_target);
    
    //Obtener el emento del Dom
    let modal = document.querySelector(modal_selector);

    //agregar la clase para mostrar el modal
    modal.classList.add(class_show);
}

/**
 * Cierra un modal
 * @param {PointerEvent} e 
 */
 function CloseModal (e){
    //Obtener el selector del elemento a mostrar 
    let modal_selector = e.target.getAttribute(attr_dismiss);
    
    //Obtener el emento del Dom
    let modal = document.querySelector(modal_selector);

    //agregar la clase para mostrar el modal
    modal.classList.remove(class_show);
}
// Función "añadir cero".
function addZero(x, n) {
    while (x.toString().length < n) {
      x = "0" + x;
    }
    return x;
  }
//Funcion de añadir tarea
function addTarea(e){
    e.preventDefault();
    const title = tareaForm["title"].value;
    const description = tareaForm["description"].value;
    const date = tareaForm["date"].value;
    var d = new Date();
    var h = addZero(d.getHours(), 2);
    var m = addZero(d.getMinutes(), 2);
    var s = addZero(d.getSeconds(), 2);
    var ms = addZero(d.getMilliseconds(), 3);
    let idAux = h + m + s + ms;
    idKey=idAux;
    let task = {
        title,
        description,
        date,
        idAux
      }

    //crear nuevo elemento
    const newTask = document.createElement("div");
    newTask.className = "row border-top";
    newTask.setAttribute("data-id",task.idAux);
    newTask.innerHTML=
    `<div class="col-9">
        <h3 class="h3">${task.title}</h3>
        <p>
        ${task.description}
        </p> 
        <p>${task.date}</p>
    </div>
    <div class="col-2">
        <label for="">Completada</label>
        <input type="checkbox" data-hidden:"#hidden-task" onchange = "${task.idAux}">
    </div>`;

    tareaList.appendChild(newTask);

    saveTask(task);
}

function saveTask(task){
    let tasks = getTasks();

    tasks.push(task);

    localStorage.setItem(taskKey, JSON.stringify(tasks));
}

function getTasks(){
    let tasks = localStorage.getItem(taskKey);

    if(tasks === null){
        tasks = [];
    }else{
        tasks = JSON.parse(tasks);
    }

    return tasks;
}

function showTarea(){
    let tasks=getTasks();

    tasks.forEach(task => {
        const newTask = document.createElement("div");
        newTask.className = "row border-top";
        newTask.setAttribute("data-id",task.idAux);
        newTask.innerHTML=
        `<div class="col-9">
            <h3 class="h3">${task.title}</h3>
            <p>
            ${task.description}
            </p> 
            <p>${task.date}</p>
        </div>
        <div class="col-2">
            <label for="">Completada</label>
            <input type="checkbox" data-hidden:"#hidden-task" id:"${task.idAux}" onchange = "hiddenTask(${task.idAux})">
        </div>`;

    tareaList.appendChild(newTask);
    });
}

function showAlltasks(e){
    //Obtener el selector del elemento a mostrar 
    let tasks_selector = e.target.getAttribute(attr_id);
    
    //Obtener el emento del Dom
    let taskShow = document.querySelectorAll(tasks_selector);

    taskShow.classList.remove(class_hidden);
    taskShow.classList.add(class_showAll);


}