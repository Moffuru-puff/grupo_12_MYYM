function qs (element) {
    return document.querySelector(element)
}


window.addEventListener("load", function(){
    let $passwordError = qs('#passwordError'),
    $formFp = qs("#formFp"),
    $submitError = qs("#submitError");
    let errores;


    function addAndRemoveClass(element, classToAdd, classToRemove){
        element.classList.add(classToAdd)
        element.classList.remove(classToRemove)
    }

 
    inputPass = document.getElementById("password")
    inputPass.addEventListener("keyup", function(event){
    if(inputPass.value.length > 0){
        if(/^[a-zA-ZÀ-ÿ\d\u00f1\u00d1]{4,8}$/.test(inputPass.value)){
            addAndRemoveClass(inputPass, "is-valid", "is-invalid")
            $passwordError.innerHTML = ""
            errores = false
        } else {
            addAndRemoveClass(inputPass, "is-invalid", "input-style")
            $passwordError.innerHTML = 'Debe ingresar una contraseña de 4-10 caracteres';
            errores = true
        }
    } else {
        addAndRemoveClass(inputPass,"is-invalid" ,"input-style")
        inputPass.classList.remove("is-valid")
        $passwordError.innerHTML = 'El campo contraseña es obligatorio';
        errores = true
        
    }

        
    })

    inputPass.addEventListener("blur", function(){
        if(inputPass.value.length === 0){
            addAndRemoveClass(inputPass,"is-invalid" ,"input-style")
            inputPass.classList.remove("is-valid")
            $passwordError.innerHTML = "El campo contraseña es obligatorio"
            errores = true
        } 

    })





    $formFp.addEventListener('submit',function(event){
        event.preventDefault()
        console.log($formFp.elements)
        let elementosForm = this.elements

        for (let index = 0; index < elementosForm.length-1; index++) {
            if(elementosForm[index].value == ""){
                elementosForm[index].classList.remove('input-style');
                elementosForm[index].classList.add('is-invalid');
                $submitError.innerHTML = "Los campos señalados son obligatorios";
                errores = true
            } 
        }
        if(!errores){
            $submitError.innerHTML = ""
            errores = false
            $formFp.submit()
            }else{
                errores = true;
            }

        







    })

})
