function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load',  function () {
    let $name = qs('#name'),
    $nameErrors = qs('#nameErrors'),
    $categoryErrors = qs('#categoryErrors'),
    $form = qs('#formCategory');
    $cancel = qs('#cancel')

    $name.addEventListener('blur', () => {
        switch (true) {
            case !$name.value.trim():
                $nameErrors.innerText = 'El campo nombre no puede estar vacío'
                $name.classList.add('isInvalid')
                break;
            case $name.value.trim().length < 3:
                $nameErrors.innerText = 'El campo nombre debe tener al menos 3 caracteres'
                $name.classList.add('isInvalid')
                break;

            default:
                $name.classList.remove('isInvalid');
                $name.classList.add('isValid');
                $nameErrors.innerHTML = ""
                break;
        }
    })

    $form.addEventListener('submit', function (event) {
        event.preventDefault()
        let error = false;
        let elementosForm = this.elements

        for (let i = 0; i < elementosForm.length - 1; i++) {
            if (
                elementosForm[i].value == "" && elementosForm[i] !== $cancel || elementosForm[i].classList.contains('isInvalid')
            ) {
                elementosForm[i].classList.add('isInvalid');
                $categoryErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }

        if (!error) {
            console.log('Todo bien');
            $form.submit()
        }

    })

})