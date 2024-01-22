/*
    1- Borrar tareas (sin necesidad de actualizar)
    2- Diferenciar tareas completadas de pendientes

*/




const getTasks = () => {
    
    const els = localStorage.getItem('data')
    const arrParsed = JSON.parse(els)

    return !arrParsed ? [] : arrParsed;

}

const showTasks = () => {
    
    for (let index = 0; index < arrTask.length; index++) {
        const element = arrTask[index]
        
        if (element) {
            
    
            let newHtml =  `
            <li id='${element.id}'>
                <p>${element.name}</p>
                <input type="checkbox">
                <button>Borrar tarea</button>
            </li>
            
            `
        
            listed.innerHTML += newHtml
    
        }
    
    }

}





//HTML SELECTORS
const textInput = document.querySelector('#create')
const btnCreate = document.querySelector('#btn-submit')
const listed = document.querySelector('#pending-tasks')
const formCreator = document.querySelector('#form-create')









let arrTask = getTasks()
showTasks()




if(arrTask.length == 0){

    let newHtml =  `
    <li>
        <p>NO EXISTEN TAREAS CREADAS</p>
    </li>
    
    `
    listed.innerHTML = newHtml   

}






btnCreate.addEventListener('click', () => {


    const task = textInput.value
    let validator = true

    arrTask.map((e) => {
        
        if (e.name == task) {
            alert('La tarea ya existe')
            validator = false
        }

    })

    
    if (task.trim() != '' && task.length <= 214 && validator == true) {
        
        let id = arrTask.length + 1

        let data = {
                id,
                name: task,
                state: true
            }

        

        arrTask.push(data)
    
        //Si es la primera vez que se crea una tarea
        if(arrTask.length - 1 == 0 ){
            let trash = ''
            listed.innerHTML = trash
        }
    
    
        
        let newHtml =  `
        <li id='${id}'>
            <p>${task}</p>
            <input type="checkbox">
            <button id='btn-delete'>Borrar tarea</button>
        </li>
        
        `
    
        listed.innerHTML += newHtml
        

        let parsedArr = JSON.stringify(arrTask)

        localStorage.setItem('data', parsedArr)
    
    }else{

        alert('No se ha podido crear la tarea')
        
        //let alertHtml = `<p>Debes introducir una tarea con al menos un caracter y menos de 214 caracteres</p>`
        //formCreator.innerHTML += alertHtml
    
    }



})




const taskElements = document.querySelectorAll('ul li button')
taskElements.forEach(button => {
    button.addEventListener('click', (e) => {
        const removedElement = e.target.parentNode;
        const id = removedElement.id;
        
        // Encuentra el índice del elemento con el id específico
        const indexToRemove = arrTask.findIndex(task => task.id === Number(id));

        if (indexToRemove !== -1) {
            arrTask.splice(indexToRemove, 1);
            removedElement.remove();

            // Actualiza el localStorage si es necesario
            localStorage.setItem('data', JSON.stringify(arrTask));
        }
        
        

    });
});












