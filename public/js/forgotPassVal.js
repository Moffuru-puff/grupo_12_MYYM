function qs (element) {
    return document.querySelector(element)
}


window.addEventListener("load", function(){
   let $userError = qs('#userError'),
    $emailError = qs('#emailError')
    $formFp = qs("#formFp"),
    $submitError = qs("#submitError");
    let errores;


    function addAndRemoveClass(element, classToAdd, classToRemove){
        element.classList.add(classToAdd)
        element.classList.remove(classToRemove)
    }

    inputUser = document.getElementById("user")
    inputUser.addEventListener("keyup", function(event){
    if(inputUser.value.length > 0){
        if(/^[A-Z]{4,8}$/i.test(inputUser.value)){
            addAndRemoveClass(inputUser, "is-valid", "is-invalid")
            $userError.innerHTML = ""
            errores = false
        } else {
            addAndRemoveClass(inputUser, "is-invalid", "input-style")
            $userError.innerHTML = "Ingrese un usuario de min 4 o max 8 caracteres alfabeticos"
            errores = true
        }
    } else {
        addAndRemoveClass(inputUser,"is-invalid" ,"input-style")
        inputUser.classList.remove("is-valid")
        $userError.innerHTML = "El campo usuario es obligatorio"
        errores = true
    }

        
    })

    inputUser.addEventListener("blur", function(){
        if(inputUser.value.length === 0){
            addAndRemoveClass(inputUser,"is-invalid" ,"input-style")
            inputUser.classList.remove("is-valid")
            $userError.innerHTML = "El campo usuario es obligatorio"
            errores = true
        } 

    })

    inputEmail = document.getElementById("email")
    inputEmail.addEventListener("keyup", function(event){
    if(inputEmail.value.length > 0){
        if(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(inputEmail.value)){
            addAndRemoveClass(inputEmail, "is-valid", "is-invalid")
            $emailError.innerHTML = ""
            errores = false
        } else {
            addAndRemoveClass(inputEmail, "is-invalid", "input-style")
            $emailError.innerHTML = 'Debe ingresar un email válido';
            errores = true
        }
    } else {
        addAndRemoveClass(inputEmail,"is-invalid" ,"input-style")
        inputEmail.classList.remove("is-valid")
        $emailError.innerHTML = "El campo email es obligatorio"
        errores = true
        
    }

        
    })

    inputEmail.addEventListener("blur", function(){
        if(inputEmail.value.length === 0){
            addAndRemoveClass(inputEmail,"is-invalid" ,"input-style")
            inputEmail.classList.remove("is-valid")
            $emailError.innerHTML = "El campo email es obligatorio"
            errores = true
        } else{
            addAndRemoveClass(inputEmail, "is-valid", "is-invalid")
            $emailError.innerHTML = ""
            errores = false
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
