/* function changeImage(id) {
    var image = document.getElementById(id);
    if (image.src.match("active")) {
        image.src = "/img/iconos-png/star-desactivada.png";
    } else {
        image.src = "/img/iconos-png/star-active.png";
    }
} */

let favoritos = [];

function favoritosUpdate(id){
    let activo = false;
    for(i = 0; i < favoritos.length; i++){
        if (id == favoritos[i]) {
          cambiarEstadoFavorito(id, false)
        }
    }
    if (id) {
        
    }
} 

function cambiarEstadoFavorito(favoritos){
    var image = document.getElementById();
    if (image.src.match("active")) {
        image.src = "/img/iconos-png/star-desactivada.png";
    } else {
        image.src = "/img/iconos-png/star-active.png";
    }
}

window.onload = () => {
    document.addEventListener("click", (event) => {
        elementClass = event.target.className;
        elementId = event.target.Id;

        console.log(event);
        if(elementClass == "MyImage"){
            favoritosUpdate(elementId);
            changeImage(elementId);
        }
    } )

}
