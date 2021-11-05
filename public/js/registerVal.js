function qs (element) {
    return document.querySelector(element)
}


window.addEventListener("load", function(){
    let $user = qs('#userRe'),
    $userError = qs('#userErrorRe'),
    $email = qs('#emailRe'),
    $emailError = qs('#emailErrorRe'),
    $password = qs('#passwordRe'),
    $passwordError = qs('#passwordErrorRe'),
    $repassword = qs('#repasswordRe'),
    $repasswordError = qs('#repasswordErrorRe'),
    $form = qs("#formRe"),
    $submitError = qs("#submitErrorRe");


    function addAndRemoveClass(element, classToAdd, classToRemove){
        element.classList.add(classToAdd)
        element.classList.remove(classToRemove)
    }

    inputUser = document.getElementById("userRe")
    inputUser.addEventListener("keyup", function(event){
    if(inputUser.value.length > 0){
        console.log(/^[A-Z]{4,8}$/i.test(inputUser.value))
        if(/^[A-Z]{4,8}$/i.test(inputUser.value)){
            addAndRemoveClass(inputUser, "is-valid", "is-invalid")
            $userError.innerHTML = ""
        } else {
            addAndRemoveClass(inputUser, "is-invalid", "input-style")
            $userError.innerHTML = "Ingrese un usuario de min 4 o max 8 caracteres"
        }
    } else {
        addAndRemoveClass(inputUser,"is-invalid" ,"input-style")
        inputUser.classList.remove("is-valid")
        $userError.innerHTML = "El campo usuario es obligatorio"
        
    }

        
    })

    inputEmail = document.getElementById("emailRe")
    inputEmail.addEventListener("keyup", function(event){
    if(inputEmail.value.length > 0){
        console.log(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(inputEmail.value))
        if(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(inputEmail.value)){
            addAndRemoveClass(inputEmail, "is-valid", "is-invalid")
            $emailError.innerHTML = ""
        } else {
            addAndRemoveClass(inputEmail, "is-invalid", "input-style")
            $emailError.innerHTML = 'Debe ingresar un email válido';
        }
    } else {
        addAndRemoveClass(inputEmail,"is-invalid" ,"input-style")
        inputEmail.classList.remove("is-valid")
        $emailError.innerHTML = "El campo email es obligatorio"
        
    }

        
    })

    inputPass = document.getElementById("passwordRe")
    inputPass.addEventListener("keyup", function(event){
    if(inputPass.value.length > 0){
        console.log(/^[A-Z].{4,10}$/i.test(inputPass.value))
        if(/^[a-zA-ZÀ-ÿ\d\u00f1\u00d1]{4,8}$/.test(inputPass.value)){
            addAndRemoveClass(inputPass, "is-valid", "is-invalid")
            $passwordError.innerHTML = ""
        } else {
            addAndRemoveClass(inputPass, "is-invalid", "input-style")
            $passwordError.innerHTML = 'Debe ingresar una contraseña de 4-10 caracteres alfabeticos';
        }
    } else {
        addAndRemoveClass(inputPass,"is-invalid" ,"input-style")
        inputPass.classList.remove("is-valid")
        $passwordError.innerHTML = 'El campo contraseña es obligatorio';
        
    }

        
    })

    inputRePass = document.getElementById("repasswordRe")
    inputRePass.addEventListener("keyup", function(event){
    if(inputRePass.value.length > 0){
        if(inputRePass.value === inputPass.value){
            addAndRemoveClass(inputRePass, "is-valid", "is-invalid")
            $repasswordError.innerHTML = ""
        } else {
            addAndRemoveClass(inputRePass, "is-invalid", "input-style")
            $repasswordError.innerHTML = 'Las contraseñas no coinciden';
        }
    } else {
        addAndRemoveClass(inputRePass,"is-invalid" ,"input-style")
        inputRePass.classList.remove("is-valid")
        $repasswordError.innerHTML = 'El campo contraseña es obligatorio';
        
    }

        
    })



    $form.addEventListener('submit',function(event){
        event.preventDefault()
        console.log($form.elements)
        let elementosForm = this.elements

        for (let index = 0; index < elementosForm.length-1; index++) {
            if(elementosForm[index].value == ""){
                elementosForm[index].classList.remove('input-style');
                elementosForm[index].classList.add('is-invalid');
                $submitError.innerHTML = "Los campos señalados son obligatorios";
            }  
        }
        if($user.classList.contains('is-valid') && $email.classList.contains('is-valid') && $password.classList.contains('is-valid') && $repassword.classList.contains('is-valid')){

            $submitError.classList.remove('is-invalid');
            $submitError.innerHTML = ""
            $form.submit()

        }







    })

})
