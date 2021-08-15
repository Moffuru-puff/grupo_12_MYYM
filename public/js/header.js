

let navBar = document.getElementById('navigation-bar-mobile');
let searchBar = document.getElementById("search");
let navTablet = document.getElementById("list-menu");

function dropMenu(){
    let subcategoryMenu = document.querySelector(".show");
    if (navBar.style.display === "block"){
        navBar.style.display = "none";
        if (subcategoryMenu !== null) {
            subcategoryMenu.classList.remove("show")
        }
        
    } else {
        navBar.style.display = "block";
        searchBar.style.display = "none";
        subcategoryMenu ? subcategoryMenu.classList.remove("show") : ""
    }
}

function dropSearch(){
    let btnHamburguesa = document.getElementsByClassName("bars");
    let active = document.querySelector("svg")
    let subcategoryMenu = document.querySelector(".show");
    if (searchBar.style.display === "flex") {
        searchBar.style.display = "none";
        if (subcategoryMenu !== null) {
            subcategoryMenu.classList.remove("show")

        }
    } else {
        searchBar.style.display = "flex";
        navBar.style.display = "none";
        active ? active.classList.remove("active") : "";
        btnHamburguesa.classList.remove("active");
        subcategoryMenu.classList.remove("show");
    }
}

function dropSubCategoryMenu (id) {
    let list = document.getElementById(`${id}`);
    list.classList.toggle("show")
    searchBar.style.display = "none"
}

/* function mostrar(){
    let items = document.getElementsByClassName("hidden");
    if(items.style.display === "none"){
        items.classList.remove("hidden")
    }
} */

function dropAccount(id){
    let account = document.getElementById(`btnAccount`);

    if (account !== undefined) {
        if (account.style.display === "block") {
          account.style.display = "none";
        } else {
          account.style.display = "block";
        }
      }
}

/******************* Desplegables de Tablet y desktop **********************/

/* let categorias = document.getElementById('category');
let marcas = document.getElementById('marcas');
let general = document.getElementsByClassName("general");
 */
function dropNav(id){
    let drop = document.getElementById(id);

    if (drop !== undefined && drop !== null) {
        if (drop.style.display === "flex") {
            drop.style.display = "none";
        } else {
            drop.style.display = "flex";
        }
      }
}


/******* Categorias ********/
let titulo= document.getElementById('title');
let cambio= document.getElementById('cambio');
let consolas = document.getElementById('consolas');
let videojuegos = document.getElementById('videojuegos');
let accesorios = document.getElementById('accesorios');
let zonaRetro = document.getElementById('zonaRetro');


consolas.onclick = function(){
    titulo.innerHTML = "Consolas";
    cambio.innerHTML = "<ul><li><a href=''>Consolas retro</a></li><li><a href=''>Nintendo Switch</a></li><li><a href=''>PSVITA</a></li><li><a href=''>PS3</a></li><li><a href=''>PS4</a></li><li><a href=''>PS5</a></li><li><a href=''>Xbox One</a></li><li><a href=''>Ver todas...</a></li></ul><br><div class='img-desplegables'><img src='/img/iconos-png/kula.png' alt='kula'><br></div>";
  }

videojuegos.onclick = function(){
    titulo.innerHTML = "Videojuegos";
    cambio.innerHTML = "<ul><li><a href=''>Acción</a></li><li><a href=''>Aventuras</a></li><li><a href=''>Carreras</a></li><li><a href=''>Deportes</a></li><li><a href=''>Disparos</a></li><li><a href=''>FPS</a></li><li><a href=''>Familiar</a></li><li><a href=''>Musica y Baile</a></li><li><a href=''>Pelea</a></li><li><a href=''>Plataformas</a></li><li><a href=''>RPG</a></li><li><a href=''>Simulación</a></li><li><a href=''>Ver todas...</a></li></ul><br><div class='img-desplegables'><img src='/img/iconos-png/mk.png' alt='mk'><br></div>";
  }

accesorios.onclick = function(){
    titulo.innerHTML = "Accesorios";
    cambio.innerHTML = "<ul><li><a href=''>Figuras de acción</a></li><li><a href=''>Funko Pop</a></li> <li><a href=''>Josticks</a></li> <li><a href=''>Remeras</a></li> <li><a href=''>Mochilas</a></li> <li><a href=''>LLaveros</a></li> <li><a href=''>Lámparas</a></li> <li><a href=''>Tazas</a></li> <li><a href=''>Ver más...</a></li> </ul><br><div class='img-desplegables'><img src='/img/iconos-png/pngegg.png' alt='katarina'><br></div>";
  }

zonaRetro.onclick = function(){
    titulo.innerHTML = "Zona Retro";
    cambio.innerHTML = "<ul> <li><a href=''>Atari XE Video Game System</a></li>  <li><a href=''>Apple PIPP!N</a></li><li><a href=''>Casio PV-1000</a></li>    <li><a href=''>Casio Loopy</a></li><li><a href=''>FM Towns Marty</a></li>    <li><a href=''>Ubisoft</a></li><li><a href=''>Nintendo</a></li><li><a href=''>Lego</a></li><li><a href=''>Noganet</a></li> <li><a href=''>Kanji</a></li><li><a href=''>Ver más...</a></li></ul><br><div class='img-desplegables'><img src='/img/iconos-png/sf.png' alt='sf'><br></div>";
  }