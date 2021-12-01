/* let app = document.querySelector("#app") */
/* const fetch = require('node-fetch') */
const BASE_URL = "http://localhost:3000/api/"
let url = 'https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.5/download/localidades.json'

module.exports = {
    Allprovinces: (req, res) => {
        fetch('https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.5/download/localidades.json').then( (response) => {
            return response.json()
        }) .then(provinces => {
            console.log(provinces);
        }) 
        .catch(function (err) {
            console.log(err)  
        })/* fetch('https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.5/download/localidades.json')
        .then(response => response.json())
        .then(data => console.log(data)); */
       
    },
    localidades: (req, res) => {
        // Ejemplo implementando el metodo POST:
async function postData(url = 'https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.5/download/localidades.json', data = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData('https://example.com/answer', { answer: 42 })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
    },
    prueba: (req, res) => {
        async function list_pokemon () {
            await fetch('https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.5/download/localidades.json')
            .then( function (res) {
               return res.json()
            })
            .then(pokemons => {
               console.log(pokemons);
            }) 
            .catch(function (err) {
                console.log(err)  
            })
        }
        
        let show_pokemons = async function () {
            await list_pokemon()
        }
        show_pokemons()
    }

}

/* async function list_pokemon () {
    await fetch('https://pokeapi.co/api/v2/pokemon')
    .then( function (res) {
       return res.json()
    })
    .then(pokemons => {
        for (let i = 0 ; i < pokemons.results.length; i++){
            app.innerHTML += `<p>${pokemons.results[i].name}</p>`
        }
    }) 
    .catch(function (err) {
        console.log(err)  
    })
}

let show_pokemons = async function () {
    await list_pokemon()
}

show_pokemons() */