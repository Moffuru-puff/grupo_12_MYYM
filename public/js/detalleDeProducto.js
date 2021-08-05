function changeImage() {
    var image = document.getElementById('myImage');
    if (image.src.match("active")) {
        image.src = "/img/iconos-png/star-desactivada.png";
    } else {
        image.src = "/img/iconos-png/star-active.png";
    }
}