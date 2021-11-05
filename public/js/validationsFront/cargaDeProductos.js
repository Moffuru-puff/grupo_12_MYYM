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
        $subcategory = qs('#subCategoria-form'),
        $subcategoryErrors = qs('#subCategoryErrors'),
        $submitProduct = qs('#submitProduct'),
        $form = qs('#fromCreateProduct');

        $nameProduct.addEventListener('blur', () => {
            switch (true) {
                case !$nameProduct.value.trim():
                    $nameErrors.innerText = 'El campo nombre del producto no puede estar vacío'
                    $nameProduct.classList.add('is-invalid')
                    break;
    
                default:
                    $nameProduct.classList.remove('is-invalid');
                    $nameProduct.classList.add('is-valid');
                    $nameErrors.innerHTML = ""
                    break;
            }
        })

        $price.addEventListener('blur', () => {
            switch (true) {
                case !$price.value.trim():
                    $priceErrors.innerText = 'El campo precio es obligatorio'
                    $price.classList.add('is-invalid')
                    break;
    
                default:
                    $price.classList.remove('is-invalid');
                    $price.classList.add('is-valid');
                    $priceErrors.innerHTML = ""
                    break;
            }
        })

        $mark.addEventListener('blur', () => {
            if (!$mark.value.trim()) {
                $markErrors.innerHTML = 'Por favor ingrese la marca del producto';
                $mark.classList.add('is-invalid')
            } else {
                $mark.classList.remove('is-invalid');
                $mark.classList.add('is-valid');
                $markErrors.innerHTML = ''
            }
        })

        $mainFeatures.addEventListener('blur', () => {
            switch (true) {
                case !$mainFeatures.value.trim():
                    $mainFeaturesErrors.innerText = 'El campo de caracterísicas principales no puede estar vacío'
                    $mainFeatures.classList.add('is-invalid')
                    break;
    
                default:
                    $mainFeatures.classList.remove('is-invalid');
                    $mainFeatures.classList.add('is-valid');
                    $mainFeaturesErrors.innerHTML = ""
                    break;
            }
        })

        $category.addEventListener('blur', () => {
            if (!$category.value.trim()) {
                $categoryErrors.innerHTML = 'Campo requerido';
                $category.classList.add('is-invalid')
            } else {
                $category.classList.remove('is-invalid');
                $category.classList.add('is-valid');
                $categoryErrors.innerHTML = ''
            }
        })

        $subcategory.addEventListener('blur', () => {
            if (!$subcategory.value.trim()) {
                $subcategoryErrors.innerHTML = 'Campo requerido';
                $subcategory.classList.add('is-invalid')
            } else {
                $subcategory.classList.remove('is-invalid');
                $subcategory.classList.add('is-valid');
                $subcategoryErrors.innerHTML = ''
            }
        })

        $form.addEventListener('submit',function(event){
            let error = false;
            event.preventDefault()
            console.log($form.elements)
            let elementosForm = this.elements
            
            for (let index = 0; index < elementosForm.length-1; index++) {
                if(elementosForm[index].value == "" && elementosForm[index].name !== "archivo"){
                    elementosForm[index].classList.add('is-invalid');
                    submitErrors.innerHTML = "Los campos señalados son obligatorios";
                    error = true;
                }
            }
        
        
            if(!error){
                console.log('Todo bien');
                $form.submit()
            }
        
        })
})