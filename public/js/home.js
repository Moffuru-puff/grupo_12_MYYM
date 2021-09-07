let changeFav =
    document.addEventListener('click', (e) => {
        var id =  e.target.id
        console.log(e.target);
        if (e.target && e.target.tagName === "FIGURE" && e.target.id == id) {
          e.target.classList.toggle('activated')
          favoritos.push(id)
          console.log(favoritos);
        }
    })
;

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

function cambiarEstadoFavorito(id, bolean){
    var image = document.getElementById();
    if (image && true) {
        image.classList.toggle('activated')
    } /* else {
        image.src = "/img/iconos-png/star-active.png";
    } */
}

window.onload = () => {
    document.addEventListener("click", (event) => {
        elementClass = event.target.className;
        elementId = event.target.Id;

        console.log(event);
        if(elementClass == "MyImage"){
            favoritosUpdate(elementId);
            //changeImage(elementId);
            changeFav
        }
    } )

}

/* array.splice(index, 1)
 */