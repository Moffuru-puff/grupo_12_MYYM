

let navBar = document.getElementById('navigation-bar-mobile');
let searchBar = document.getElementById("search");
let navTablet = document.getElementById("list-menu");

function dropMenu(){
    let subcategoryMenu = document.querySelector(".show");
    if (navBar.style.display === "block"){
        navBar.style.display = "none";
        subcategoryMenu.classList.remove("show")
    } else {
        navBar.style.display = "block";
        searchBar.style.display = "none";
        subcategoryMenu ? subcategoryMenu.classList.remove("show") : ""
    }
}

function dropSearch(){
    let btnHamburguesa = document.getElementsByClassName("bars");
    let subcategoryMenu = document.querySelector(".show");
    if (searchBar.style.display === "flex") {
        searchBar.style.display = "none";
        subcategoryMenu.classList.remove("show")
    } else {
        searchBar.style.display = "flex";
        navBar.style.display = "none";
        btnHamburguesa.classList.remove(".active");
        subcategoryMenu.classList.remove("show")
    }
}

function dropSubCategoryMenu (id) {
    let list = document.getElementById(`${id}`);
    list.classList.toggle("show")
    searchBar.style.display = "none"
}

function mostrar(){
    let items = document.getElementsByClassName("hidden");
    if(items.style.display === "none"){
        items.classList.remove("hidden")
    }
}

function dropAccount(){
    let account = document.getElementById("#account");
    let dropMyaccount = document.getElementsByClassName(".drop-account");
    account.addEventListener('click', ()=> {
        dropMyaccount.classList.toggle("show")
    }) 
}


/* const btnHamburguesa = document.getElementsByClassName("btn-hamburguesa");
const menu = document.getElementsByClassName("menu-ul");
btnHamburguesa.addEventListener("click", function(){
    menu.classList.toggle("mostrar");
}); */

/* function closeWindow () {
    document.querySelector(".show").classList.remove("show")
} */