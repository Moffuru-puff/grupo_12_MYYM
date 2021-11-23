function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load',  function () {
    let $name = qs('#name'),
    $nameErrors = qs('#nameErrors'),
    $category = qs('#categoryId'),
    $categoryErrors = qs('#categoryErrors'),
    $subcategoryErrors = qs('#subcategoryErrors'),
    $form = qs('#formSubcategory');
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

    $category.addEventListener('blur', () => {
        if (!$category.value.trim()) {
            $categoryErrors.innerHTML = 'Debes elegir una categoría';
            $category.classList.add('isInvalid')
        } else {
            $category.classList.remove('isInvalid');
            $category.classList.add('isValid');
            $categoryErrors.innerHTML = ''
        }
    })

    $category.addEventListener('change', () => {
        if (!$category.value.trim()) {
            $categoryErrors.innerHTML = 'Debes elegir una categoría';
            $category.classList.add('isInvalid')
        } else {
            $category.classList.remove('isInvalid');
            $category.classList.add('isValid');
            $categoryErrors.innerHTML = ''
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
                $subcategoryErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }

        if (!error) {
            console.log('Todo bien');
            $form.submit()
        }

    })

})