function qs (element) {
    return document.querySelector(element)
}


window.addEventListener("load", function(){
    let $userRe = qs('#userRe'),
    $userErrorRe = qs('#userErrorRe'),
    $emailRe = qs('#emailRe'),
    $emailErrorRe = qs('#emailErrorRe'),
    $passwordRe = qs('#passwordRe'),
    $passwordErrorRe = qs('#passwordErrorRe'),
    $repasswordRe = qs('#repasswordRe'),
    $repasswordErrorRe = qs('#repasswordErrorRe'),
    $formRe = qs("#formRe"),
    $submitErrorRe = qs("#submitErrorRe");


    function addAndRemoveClass(element, classToAdd, classToRemove){
        element.classList.add(classToAdd)
        element.classList.remove(classToRemove)
    }

    inputUser = document.getElementById("userRe")
    inputUser.addEventListener("keyup", function(event){
    if(inputUser.value.length > 0){
        if(/^[A-Z]{4,8}$/i.test(inputUser.value)){
            addAndRemoveClass(inputUser, "is-valid", "is-invalid")
            $userErrorRe.innerHTML = ""
        } else {
            addAndRemoveClass(inputUser, "is-invalid", "input-style")
            $userErrorRe.innerHTML = "Ingrese un usuario de min 4 o max 8 caracteres alfabeticos"
        }
    } else {
        addAndRemoveClass(inputUser,"is-invalid" ,"input-style")
        inputUser.classList.remove("is-valid")
        $userErrorRe.innerHTML = "El campo usuario es obligatorio"
        
    }

        
    })

    inputUser.addEventListener("blur", function(){
        if(inputUser.value.length === 0){
            addAndRemoveClass(inputUser,"is-invalid" ,"input-style")
            inputUser.classList.remove("is-valid")
            $userErrorRe.innerHTML = "El campo usuario es obligatorio"
        } 

    })

    inputEmail = document.getElementById("emailRe")
    inputEmail.addEventListener("keyup", function(event){
    if(inputEmail.value.length > 0){
        if(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(inputEmail.value)){
            addAndRemoveClass(inputEmail, "is-valid", "is-invalid")
            $emailErrorRe.innerHTML = ""
        } else {
            addAndRemoveClass(inputEmail, "is-invalid", "input-style")
            $emailErrorRe.innerHTML = 'Debe ingresar un email válido';
        }
    } else {
        addAndRemoveClass(inputEmail,"is-invalid" ,"input-style")
        inputEmail.classList.remove("is-valid")
        $emailErrorRe.innerHTML = "El campo email es obligatorio"
        
    }

        
    })

    inputEmail.addEventListener("blur", function(){
        if(inputEmail.value.length === 0){
            addAndRemoveClass(inputEmail,"is-invalid" ,"input-style")
            inputEmail.classList.remove("is-valid")
            $emailErrorRe.innerHTML = "El campo email es obligatorio"
        } 

    })

    inputPass = document.getElementById("passwordRe")
    inputPass.addEventListener("keyup", function(event){
    if(inputPass.value.length > 0){
        if(/^[a-zA-ZÀ-ÿ\d\u00f1\u00d1]{4,8}$/.test(inputPass.value)){
            addAndRemoveClass(inputPass, "is-valid", "is-invalid")
            $passwordErrorRe.innerHTML = ""
        } else {
            addAndRemoveClass(inputPass, "is-invalid", "input-style")
            $passwordErrorRe.innerHTML = 'Debe ingresar una contraseña de 4-10 caracteres';
        }
    } else {
        addAndRemoveClass(inputPass,"is-invalid" ,"input-style")
        inputPass.classList.remove("is-valid")
        $passwordErrorRe.innerHTML = 'El campo contraseña es obligatorio';
        
    }

        
    })

    inputPass.addEventListener("blur", function(){
        if(inputPass.value.length === 0){
            addAndRemoveClass(inputPass,"is-invalid" ,"input-style")
            inputPass.classList.remove("is-valid")
            $passwordErrorRe.innerHTML = "El campo contraseña es obligatorio"
        } 

    })

    inputRePass = document.getElementById("repasswordRe")
    inputRePass.addEventListener("keyup", function(event){
    if(inputRePass.value.length > 0){
        if(inputRePass.value === inputPass.value){
            addAndRemoveClass(inputRePass, "is-valid", "is-invalid")
            $repasswordErrorRe.innerHTML = ""
        } else {
            addAndRemoveClass(inputRePass, "is-invalid", "input-style")
            $repasswordErrorRe.innerHTML = 'Las contraseñas no coinciden';
        }
    } else {
        addAndRemoveClass(inputRePass,"is-invalid" ,"input-style")
        inputRePass.classList.remove("is-valid")
        $repasswordErrorRe.innerHTML = 'El campo contraseña es obligatorio';
        
    }

        
    })

    inputRePass.addEventListener("blur", function(){
        if(inputRePass.value.length === 0){
            addAndRemoveClass(inputRePass,"is-invalid" ,"input-style")
            inputRePass.classList.remove("is-valid")
            $repasswordErrorRe.innerHTML = 'Las contraseñas no coinciden';
        } 

    })



    $formRe.addEventListener('submit',function(event){
        event.preventDefault()
        console.log($formRe.elements)
        let elementosForm = this.elements

        for (let index = 0; index < elementosForm.length-1; index++) {
            if(elementosForm[index].value == ""){
                elementosForm[index].classList.remove('input-style');
                elementosForm[index].classList.add('is-invalid');
                $submitErrorRe.innerHTML = "Los campos señalados son obligatorios";
            }  
        }
        if($userRe.classList.contains('is-valid') && $emailRe.classList.contains('is-valid') && $passwordRe.classList.contains('is-valid') && $repasswordRe.classList.contains('is-valid')){

            $submitErrorRe.classList.remove('is-invalid');
            $submitErrorRe.innerHTML = ""
            $formRe.submit()

        }







    })

})
