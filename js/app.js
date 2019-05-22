//Variables 
const listaTareas = document.querySelector('.tareas');
const terminados = document.querySelector('.terminados');
let id = 0;
let aviso;

//Revisamos el numero de tareas
cantidadTareas();

//Event Listeners
eventListeners();

function eventListeners(){
    //cuando se envie agregar tarea
    document.querySelector('#formulario').addEventListener('submit', agregarTarea);

    //Borrar Tarea
    listaTareas.addEventListener('click', borrarTarea);
    
    //Terminar Tarea
    listaTareas.addEventListener('click', terminarTarea);

    //Desterminar Tarea
    terminados.addEventListener('click', desterminarTarea);
   
    //Borrar Tarea Terminadad
    terminados.addEventListener('click', borrarTerminada);

    //mostrar las tareas desde localstorage
    document.addEventListener('DOMContentLoaded', localStorageMostrar);

    document.addEventListener('DOMContentLoaded', conteoTotalTareas);
    
}

//Funciones
//numero de tareas
function cantidadTareas(){
    const nTareas = document.querySelectorAll('.item').length;
    const nTerminados = document.querySelectorAll('.terminado').length;
    const conteoTotal = nTareas - nTerminados;
       
    if(nTareas < 1 || nTerminados == nTareas){
        aviso = document.createElement('h2');
        aviso.innerHTML = `No tienes Tareas pendientes <i class="material-icons">thumb_up_alt</i>`;
        listaTareas.appendChild(aviso);
    }else{
        aviso.remove();
    }
}
//Agregar tarea
function agregarTarea(e){
    e.preventDefault(); 
    id++;
   
    //almaceno el valor del text area
    const tarea = document.querySelector('#agregar-tarea').value; 

    //Nueva tarea
    let nuevaTarea = document.createElement('div');
    nuevaTarea.setAttribute('class', 'item');

    nuevaTarea.innerHTML= `<p> ${tarea}</p>  <a href="#" class="check" data-id="${id}"> <i class="material-icons check-icon">check</i></a> <a href="#" class="closes"> <i class="material-icons closes-icon">close</i></a> `;
    //quitamos el aviso de No hay tareas
    aviso.remove();
    //agrego tarea
    listaTareas.appendChild(nuevaTarea);
    cantidadTareas(); 
    
    //agregar tarea a localstorage
    agregarTareasLocalStorage(tarea);
}

//Borrar Tarea
function borrarTarea(e){
    e.preventDefault();

    if(e.target.classList.contains('closes-icon')){
        e.target.parentElement.parentElement.remove();

        let select = e.target.parentElement.parentElement;

        borrarTareaLocalStorage(select);
        // cantidadTareas();        
    }    

}

//Terminar Tarea
function terminarTarea(e){
    e.preventDefault();

    if(e.target.classList.contains('check-icon')){
        e.target.closest('.item').classList.add('terminado');
        const vars = e.target.parentElement.parentElement;
        terminados.appendChild(vars);
        cantidadTareas(); 
    }
}

//Desterminar tarea
function desterminarTarea(e){
    e.preventDefault();

    if(e.target.classList.contains('check-icon')){
        e.target.closest('.item').classList.remove('terminado');
        const vars = e.target.parentElement.parentElement;
        console.log(vars);
        listaTareas.appendChild(vars);
        cantidadTareas(); 
    }
}

//borrar Terminada
function borrarTerminada(e){
    e.preventDefault();

    if(e.target.classList.contains('closes-icon')){
        e.target.closest('.item').remove();
       
    }
}

//agregar tarea a localstorage
function agregarTareasLocalStorage(tarea){
    let tareas;

    tareas = obternerTareasLocalStorage();

    //añadimos la tarea 
    tareas.push(tarea);

    //convertimos de string a arreglo para localStorage
    localStorage.setItem('Tareas', JSON.stringify(tareas) );


}

//Leer tareas de localstorage
function obternerTareasLocalStorage(){
    let tareas;

    //revisamos los valores de local Storate
    if( localStorage.getItem('Tareas') === null){
        tareas = [];
    }else{
        tareas = JSON.parse(localStorage.getItem('Tareas'));
    }

    return tareas;
}

//Mostrar Local Storage
function localStorageMostrar(){
    let tareas;

    tareas = obternerTareasLocalStorage();

    tareas.forEach(function(tarea){

        //Nueva tarea
        let nuevaTarea = document.createElement('div');
        nuevaTarea.setAttribute('class', 'item');
        nuevaTarea.innerHTML= `${tarea}<a href="#" class="check"><i class="material-icons check-icon">check</i></a><a href="#" class="closes"><i class="material-icons closes-icon">close</i></a> `;
        //quitamos el aviso de No hay tareas
        aviso.remove();
        //agrego tarea
        listaTareas.appendChild(nuevaTarea);

    });   
}    

//conteo total de las tareas de la barra superior leido desde localstorage
function conteoTotalTareas(){
    Totaltareas = obternerTareasLocalStorage();

    let conteoTotal = document.querySelector('.conteo__tareas h4 span');

    conteoTotal.innerText = Totaltareas.length;
    
    
}

//Borrar tarea local storage
function borrarTareaLocalStorage(select){
    
    totalTareas = obternerTareasLocalStorage();

    console.log(select.innerText);
        
}

