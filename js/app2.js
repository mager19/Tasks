//VARIABLES
let tarea;
let idTarea = 0;
const listaTareas = document.querySelector('.tareas');




//EVENT LISTENERS 
function eventListeners(){
    //agregar Tarea
    document.querySelector('#formulario').addEventListener('submit', agregarTarea);    

    //Al cargar  mostrar local Storage
    document.addEventListener('DOMContentLoaded', mostrarTareasLS);

    //Eliminiar tareas
    listaTareas.addEventListener('click', eliminarTarea);
}

eventListeners();

//FUNCIONES
function agregarTarea(){
    idTarea++;
    
    tarea = {
        'nombre' : document.querySelector('#agregar-tarea').value,
        'id'     : `${idTarea}`, 
    }

    //Nueva tarea
    let nuevaTarea = document.createElement('div');
    nuevaTarea.setAttribute('class', 'item');
    nuevaTarea.setAttribute('data-id', `${tarea.id}`);

    nuevaTarea.innerHTML= `<p> ${tarea.nombre}</p>  <a href="#" class="check"> <i class="material-icons check-icon">check</i></a> <a href="#" class="closes"> <i class="material-icons closes-icon">close</i></a> `;

    //agrego tarea
    listaTareas.appendChild(nuevaTarea);

    //agregar a local Storage
    agregarTareaLS(tarea);
}

//Agregar Tarea Local Storage
function agregarTareaLS(tarea){

    let tareas = obtenerTareasLS();

    tareas.push(tarea);
    
    localStorage.setItem('Tareas', JSON.stringify(tareas) );

}

//obtener Tareas LS
function obtenerTareasLS(){
    let tareasLS;

    if(localStorage.getItem('Tareas') === null){
        tareasLS = [];
    }else{
        tareasLS = JSON.parse( localStorage.getItem('Tareas') );        
    }

    return tareasLS;
}

//mostrar tareas ls
function mostrarTareasLS(){
    let tareasLS = obtenerTareasLS();

    tareasLS.forEach(function(tareaLS){
        //Nueva tarea
        let nuevaTarea = document.createElement('div');
        nuevaTarea.setAttribute('class', 'item');
        nuevaTarea.setAttribute('data-id', `${tareaLS.id}`);

        nuevaTarea.innerHTML= `<p> ${tareaLS.nombre}</p>  <a href="#" class="check"> <i class="material-icons check-icon">check</i></a> <a href="#" class="closes"> <i class="material-icons closes-icon">close</i></a> `;

        //agrego tarea
        listaTareas.appendChild(nuevaTarea);
    });

}

//eliminar Tarea
function eliminarTarea(e){
    e.preventDefault();

    let tareaId;
    let botonBorrar = e.target.parentElement.parentElement;

    if(e.target.classList.contains('closes-icon')){
        tareaId = botonBorrar.getAttribute('data-id');
        botonBorrar.remove();    
    }

    eliminarTareaLS(tareaId);
}

//Eliminar tarea LS
function eliminarTareaLS(tareaId){
    let tareasLS = obtenerTareasLS();

    tareasLS.forEach(function(tareaLS, index){
        if(tareaLS.id === tareaId){
            tareasLS.splice(index, 1);
        }
    });

    localStorage.setItem('Tareas', JSON.stringify(tareasLS));
}