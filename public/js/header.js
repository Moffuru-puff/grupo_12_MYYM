

let navBar = document.getElementById('navigation-bar-mobile');
let searchBar = document.getElementById("search");
let navTablet = document.getElementById("list-menu");

function dropMenu() {
    let subcategoryMenu = document.querySelector(".show");
    if (navBar.style.display === "block") {
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

function dropSearch() {
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

function dropSubCategoryMenu(id) {
    let list = document.getElementById(`${id}`);
    list.classList.toggle("show")
    searchBar.style.display = "none"
}

function dropAccount(id) {
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

function dropNav(id) {
    let drop = document.getElementById(id);
    let categ = document.getElementById(`categ`);
    let marcas = document.getElementById(`marcas`);

    if (drop !== undefined && drop !== null) {
        if (drop.style.display === "flex") {
            if (drop === categ) {
                categ.style.display = "none"
            } else {
                marcas.style.display = "none"
            }
        } else {
            if (drop === categ) {
                categ.style.display = "flex"
                marcas.style.display = "none"
            } else {
                marcas.style.display = "flex"
                categ.style.display = "none"
            }
        }
    }

}


/******* Categorias ********/
function qs(element) {
    return document.querySelector(element)
}
function qsA(element) {
    return document.querySelectorAll(element)
}
let dropdownRigth = qsA(".dropdown-rigth");
let ulCateg = qs('.sub-item');

ulCateg.addEventListener('click', (e) => {
    function subcategoriesShow(id) {
        if (dropdownRigth.length > 0) {
            dropdownRigth.forEach( drop => {
                if (drop.id == id) {                                     
                    return drop.style.display = "flex" 
                 }else{
                   return  drop.style.display = "none"
                 }
            })
        }
    }

    subcategoriesShow(e.target.id)
})

let hover = qsA('li.item')

hover.forEach((item => {

    item.onclick = () => {
       item.classList.toggle("selectItem")
        console.log(item);
    }
    
}))
