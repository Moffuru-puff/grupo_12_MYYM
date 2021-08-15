

document.addEventListener('click', (event) => {
    funcion = false
    try {
        elementId = event.path[0].id
        elementClass = event.path[0].className
    }
    catch {
        elementId = event.target.id
        elementClass = event.path[0].className
    }

    if (elementClass == '1'){
        document.getElementById('botonContacto2').style.display = 'none'
        document.getElementById('botonContacto3').style.display = 'none'
        document.getElementById('botonContacto').style.display = 'flex'
    }


    if (elementId == ''){
        
    }

})
