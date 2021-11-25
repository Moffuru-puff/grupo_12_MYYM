function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load',  function () {
    let $location = qs('#location'),
        $locationErrors = qs('#locationErrors'),
        $direction = qs('#direction'),
        $directionErrors = qs('#directionErrors'),
        $telephone = qs('#telephone'),
        $telephoneErrors = qs('#telephoneErrors'),
        $postalCode = qs('#postalCode'),
        $postalCodeErrors = qs('#postalCodeErrors'),
        $sucursalsErrors = qs('#sucursalsErrors'),
        $form = qs('#formSucursal');
        $cancel = qs('#cancel')

    let regExNumeric = /^[+]?((\d+(\.\d*)?)|(\.\d+))$/;

    $location.addEventListener('blur', () => {
        switch (true) {
            case !$location.value.trim():
                $locationErrors.innerText = 'El campo localidad no puede estar vacío'
                $location.classList.add('isInvalid')
                break;
            case $location.value.trim().length < 3:
                $locationErrors.innerText = 'La localidad debe tener al menos 3 caracteres'
                $location.classList.add('isInvalid')
                break;

            default:
                $location.classList.remove('isInvalid');
                $location.classList.add('isValid');
                $locationErrors.innerHTML = ""
                break;
        }
    })

    $direction.addEventListener('blur', () => {
        switch (true) {
            case !$direction.value.trim():
                $directionErrors.innerText = 'El campo dirección no puede estar vacío'
                $direction.classList.add('isInvalid')
                break;
            case $direction.value.trim().length < 5:
                $directionErrors.innerText = 'La dirección debe tener al menos 5 caracteres'
                $direction.classList.add('isInvalid')
                break;

            default:
                $direction.classList.remove('isInvalid');
                $direction.classList.add('isValid');
                $directionErrors.innerHTML = ""
                break;
        }
    })

    $telephone.addEventListener('blur', () => {
        switch (true) {
            case !$telephone.value.trim():
                $telephoneErrors.innerText = 'El campo teléfono no puede estar vacío'
                $telephone.classList.add('isInvalid')
                break;
            case $telephone.value.trim().length < 10:
                $telephoneErrors.innerText = 'El teléfono debe tener al menos 10 digitos'
                $telephone.classList.add('isInvalid')
                break;

            case !regExNumeric.test($telephone.value):
                $telephoneErrors.innerText = 'Debes ingresar caracteres numéricos'
                $telephone.classList.add('isInvalid')
                break;

            default:
                $telephone.classList.remove('isInvalid');
                $telephone.classList.add('isValid');
                $telephoneErrors.innerHTML = ""
                break;
        }
    })

    $postalCode.addEventListener('blur', () => {
        switch (true) {
            case !$postalCode.value.trim():
                $postalCodeErrors.innerText = 'El campo de código postal no puede estar vacío'
                $postalCode.classList.add('isInvalid')
                break;
            case $postalCode.value.trim().length < 4:
                $postalCodeErrors.innerText = 'El código postal debe tener 4 digitos'
                $postalCode.classList.add('isInvalid')
                break;

            case !regExNumeric.test($postalCode.value):
                $postalCodeErrors.innerText = 'Debes ingresar caracteres numéricos'
                $postalCode.classList.add('isInvalid')
                break;

            default:
                $postalCode.classList.remove('isInvalid');
                $postalCode.classList.add('isValid');
                $postalCodeErrors.innerHTML = ""
                break;
        }
    })

    $form.addEventListener('submit', function (event) {
        event.preventDefault()
        let error = false;
        let elementosForm = this.elements

        for (let i = 0; i < elementosForm.length - 1; i++) {
            if (
                elementosForm[i].value == "" && elementosForm[i].name !== "schedule" && elementosForm[i] !== $cancel || elementosForm[i].classList.contains('isInvalid')
            ) {
                elementosForm[i].classList.add('isInvalid');
                $sucursalsErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }


        if (!error) {
            console.log('Todo bien');
            $form.submit()
        }

    })
})