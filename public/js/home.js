let changeFav =
    document.addEventListener('click', (e) => {
        var id =  e.target.id
        if (e.target && e.target.tagName === "FIGURE" && e.target.id == id) {
            userId = e.target.attributes.userid.value
            //
            if (e.target.classList.value.indexOf('activated') == -1) {
                fetch(`${window.location.origin}/api/favorite?userId=${userId}&productId=${id}`, {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type':'application/json'
                    }, 
                })
                    .then(function (response) {
                        if (response.status !== 200) {
                            console.log(`Looks like there was a problem. Status code: ${response.status}`);
                            return;
                        }
                        response.json().then(function (data) {
                            //console.log(data); Acá recibimos la respuesta en la variable data
                            e.target.classList.value = "myImage activated"
                        });
                    })
                    .catch(function (error) {
                        console.log("Fetch error: " + error);
                    });
                
            }else{
                fetch(`${window.location.origin}/api/favorite?userId=${userId}&productId=${id}`, {
                    method: 'DELETE',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type':'application/json'
                    }, 
                })
                    .then(function (response) {
                        if (response.status !== 200) {
                            console.log(`Looks like there was a problem. Status code: ${response.status}`);
                            return;
                        }
                        response.json().then(function (data) {
                            //console.log(data); Acá recibimos la respuesta en la variable data
                            e.target.classList.value = "myImage"
                        });
                    })
                    .catch(function (error) {
                        console.log("Fetch error: " + error);
                    });
            }
        }
    })
;


/* function favoritosUpdate(id){
    let activo = false;
    for(i = 0; i < favoritos.length; i++){
        if (id == favoritos[i]) {
          cambiarEstadoFavorito(id, false)
        }
    }
    if (id) {
        
    }
}  */

function cambiarEstadoFavorito(id, bolean){
    var image = document.getElementById();
    if (image && true) {
        image.classList.toggle('activated')
    } /* else {
        image.src = "/img/iconos-png/star-active.png";
    } */
}

/* window.onload = () => {
    document.addEventListener("click", (event) => {
        elementClass = event.target.className;
        elementId = event.target.Id;

        console.log(event);
        if(elementClass == "MyImage"){
            favoritosUpdate(elementId);
            changeFav
        }
    } )

} */

/* array.splice(index, 1)
 */