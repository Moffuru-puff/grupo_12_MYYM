const axios = require('axios');

let urlLocalidades = 'https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.5/download/localidades.json'

let urlProvincias = 'https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.2/download/provincias.json'

let urlMunicipios = 'https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.4/download/municipios.json'

let urlCalles = 'https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.6/download/calles.json'

module.exports = {
    allProvinces: (req, res) => {
        axios.get(urlProvincias)
            .then(response => res.send(response.data));

    },
    oneProvinces: (req, res) => {
        axios.get(urlProvincias)
            .then(response => {
                let province = response.data.provincias.filter(province => {
                    return province.id === req.params.id
                });
                res.send(province)
            }).catch((error => console.log(error)))

    },
    allLocalidades: (req, res) => {
        axios.get(urlLocalidades)
            .then(response => res.send(response.data));
    },
    oneLocalidades: (req, res) => {
        axios.get(urlLocalidades)
            .then(response => {
                let location = response.data.localidades.filter(location => {
                    return location.provincia.id === req.params.id
                });
                res.send(location)
            }).catch((error => console.log(error)))
    },
    allMunicipalities: (req, res) => {
        axios.get(urlMunicipios)
            .then(response => res.send(response.data));
    },
    oneMunicipality: (req, res) => {
        axios.get(urlMunicipios)
            .then(response => {
                let municipality = response.data.municipios.filter(municipality => {
                    return municipality.id === req.params.id
                });
                res.send(municipality)
            }).catch((error => console.log(error)))
    },
    allStreets: (req, res) => {
        axios.get(urlCalles)
            .then(response => res.send(response.data));
    }
}   



