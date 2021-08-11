

let navBarFooter = document.getElementById('navBarFooter');
/* let searchBar = document.getElementById("search");
let navTablet = document.getElementById("list-menu"); */

function dropInfo(){
    let subcategoryMenu = document.querySelector(".show");
    if (navBarFooter.style.display === "block"){
        navBarFooter.style.display = "none";
        subcategoryMenu.classList.remove("show")
    } else {
        navBarFooter.style.display = "block";
     /*    searchBar.style.display = "none"; */
        subcategoryMenu ? subcategoryMenu.classList.remove("show") : ""
    }
}

function dropFooter (id) {
    let list = document.getElementById(`${id}`);
    list.classList.toggle("show")
    /* searchBar.style.display = "none" */
}
