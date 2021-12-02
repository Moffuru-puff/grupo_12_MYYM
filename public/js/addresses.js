const BASE_URL = "http://localhost:3000/api/"
let $locationSelect = document.querySelector('.locationSelect')
let $citySelect = document.querySelector('.citySelect')
let $addressSelect = document.querySelector('.addressSelect')

function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}

function handlerCity(id) {
    fetch(`${BASE_URL}provinces/${id}`)
        .then(res => res.json())
        .then(result => {
            let city = sortJSON(result.provincias, 'nombre', 'asc')
            for (let index = 0; index < city.length; index++) { 
                $citySelect.innerHTML += `<option value="${city[index].id}">${city[index].nombre}</option>`
            }  
        })       
}

function handlerLocation(id) {
    fetch(`${BASE_URL}localities/${id}`)
    .then(res => res.json())
    .then(result => {

        let locations = sortJSON(result, 'nombre', 'asc')
        for (let index = 0; index < locations.length; index++) {
            $locationSelect.innerHTML += `<option value="${locations[index].id}">${locations[index].nombre}</option>`
        }
    })
}

function handlerStreet(id) {
    fetch(`${BASE_URL}streets/${id}`)
    .then(res => res.json())
    .then(result => {
        console.log(result.calles);
        let address = sortJSON(result, 'nombre', 'asc')
        for (let index = 0; index < address.length; index++) {
            $addressSelect.innerHTML += `<option value="${address[index].nombre}"/>`
        }
    })
}



$citySelect.addEventListener('click', function (e) {
    $locationSelect.innerHTML = ""
    handlerCity(e.target.value)
})

$citySelect.addEventListener('change', function (e) {
    let id = e.target.value
    $locationSelect.innerHTML = ""
    handlerLocation(id)
})

$locationSelect.addEventListener('change', function (e) {
    let id = e.target.value
    $addressSelect.innerHTML = ""
    handlerStreet(id)
})
