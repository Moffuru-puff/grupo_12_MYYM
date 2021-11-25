function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', function () {
    let $nameProduct = qs('#name'),
        $nameErrors = qs('#nameErrors'),
        $price = qs('#price'),
        $priceErrors = qs('#priceErrors'),
        $mark = qs('#mark'),
        $markErrors = qs('#markErrors'),
        $mainFeatures = qs('#mainFeatures'),
        $mainFeaturesErrors = qs('#mainFeaturesErrors'),
        $category = qs('#categoria-form'),
        $categoryErrors = qs('#categoryErrors'),
        $subcategory = qs('#subcategoria-form'),
        $subcategoryErrors = qs('#subcategoryErrors'),
        $barcode = qs('#codigo'),
        $barcodeErrors = qs('#barcodeErrors'),
        $form = qs('#fromCreateProduct');
    let regExNumeric = /^[+]?((\d+(\.\d*)?)|(\.\d+))$/;

    $nameProduct.addEventListener('blur', () => {
        switch (true) {
            case !$nameProduct.value.trim():
                $nameErrors.innerText = 'El campo nombre del producto no puede estar vacío'
                $nameProduct.classList.add('isInvalid')
                break;
            case $nameProduct.value.trim().length < 3:
                $nameErrors.innerText = 'Debes ingresar un nombre mayor a 3 caracteres'
                $nameProduct.classList.add('isInvalid')
                break;

            default:
                $nameProduct.classList.remove('isInvalid');
                $nameProduct.classList.add('isValid');
                $nameErrors.innerHTML = ""
                break;
        }
    })

    $price.addEventListener('blur', () => {
        switch (true) {
            case !$price.value.trim():
                $priceErrors.innerText = 'El campo precio es obligatorio'
                $price.classList.add('isInvalid')
                break;

            case !regExNumeric.test($price.value):
                $priceErrors.innerHTML = "Debes ingresar caracteres numéricos";
                $price.classList.add("is-invalid");
                break;

            default:
                $price.classList.remove('isInvalid');
                $price.classList.add('isValid');
                $priceErrors.innerHTML = ""
                break;
        }
    })

    $barcode.addEventListener('blur', () => {
        switch (true) {
            case !$barcode.value.trim():
                $barcodeErrors.innerText = 'Debes ingresar el código del producto'
                $barcode.classList.add('isInvalid')
                break;

            case !regExNumeric.test($barcode.value):
                $barcodeErrors.innerHTML = "Debes ingresar caracteres numéricos";
                $barcode.classList.add("is-invalid");
                break;

            default:
                $barcode.classList.remove('isInvalid');
                $barcode.classList.add('isValid');
                $barcodeErrors.innerHTML = ""
                break;
        }
    })

    $mark.addEventListener('blur', () => {
        if (!$mark.value.trim()) {
            $markErrors.innerHTML = 'Por favor ingrese la marca del producto';
            $mark.classList.add('isInvalid')
        } else {
            $mark.classList.remove('isInvalid');
            $mark.classList.add('isValid');
            $markErrors.innerHTML = ''
        }
    })

    $mark.addEventListener('change', () => {
        if (!$mark.value.trim()) {
            $markErrors.innerHTML = 'Por favor ingrese la marca del producto';
            $mark.classList.add('isInvalid')
        } else {
            $mark.classList.remove('isInvalid');
            $mark.classList.add('isValid');
            $markErrors.innerHTML = ''
        }
    })

    $mainFeatures.addEventListener('blur', () => {
        switch (true) {
            case !$mainFeatures.value.trim():
                $mainFeaturesErrors.innerText = 'El campo de caracterísicas principales no puede estar vacío'
                $mainFeatures.classList.add('isInvalid')
                break;

            case $mainFeatures.value.trim().length < 4:
                $mainFeaturesErrors.innerText = 'Debes ingresar caracterísica principal mayor a 4 caracteres'
                $mainFeatures.classList.add('isInvalid')
                break;

            default:
                $mainFeatures.classList.remove('isInvalid');
                $mainFeatures.classList.add('isValid');
                $mainFeaturesErrors.innerHTML = ""
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

    $subcategory.addEventListener('blur', () => {
        if (!$subcategory.value.trim()) {
            $subcategoryErrors.innerHTML = 'Debes elegir una subcategoría';
            $subcategory.classList.add('isInvalid')
        } else {
            $subcategory.classList.remove('isInvalid');
            $subcategory.classList.add('isValid');
            $subcategoryErrors.innerHTML = ''
        }
    })

    $subcategory.addEventListener('change', () => {
        if (!$subcategory.value.trim()) {
            $subcategoryErrors.innerHTML = 'Debes elegir una subcategoría';
            $subcategory.classList.add('isInvalid')
        } else {
            $subcategory.classList.remove('isInvalid');
            $subcategory.classList.add('isValid');
            $subcategoryErrors.innerHTML = ''
        }
    })

    $form.addEventListener('submit', function (event) {
        event.preventDefault()
        let error = false;
        console.log($form.elements)
        let elementosForm = this.elements

        for (let i = 0; i < elementosForm.length - 1; i++) {
            if (
                elementosForm[i].value === "" 
                && elementosForm[i].name !== "image" &&
                elementosForm[i].name !== "discount" &&
                elementosForm[i].name !== "description" &&
                elementosForm[i].name !== "stock" ||
                elementosForm[i].classList.contains('isInvalid')
            ) {
                elementosForm[i].classList.add('isInvalid');
                submitErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }


        if (!error) {
            console.log('Todo bien');
            $form.submit()
        }

    })
})