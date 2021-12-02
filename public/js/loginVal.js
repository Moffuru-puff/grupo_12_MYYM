function qs (element) {
    return document.querySelector(element)
}


window.addEventListener("load", function(){
    let $email = qs('#emailLog'),
    $emailErrorLog = qs('#emailErrorLog'),
    $password = qs('#passwordLog'),
    $passwordErrorLog = qs('#passwordErrorLog')
    $form = qs("#formLog"),
    $submitErrorLog = qs("#submitErrorLog"),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^([a-z])([A-Z]).{4,10}$/,
    expreg = /"^[A-Za-z]{4,8}$/;
    let errores;

    function addAndRemoveClass(element, classToAdd, classToRemove){
        element.classList.add(classToAdd)
        element.classList.remove(classToRemove)
    }

    $email.addEventListener("keyup", function(event){
    if($email.value.length > 0){
        if(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test($email.value)){
            addAndRemoveClass($email, "is-valid", "is-invalid")
            $emailErrorLog.innerHTML = ""
            errores = false
        } else {
            addAndRemoveClass($email, "is-invalid", "input-style")
            $emailErrorLog.innerHTML = 'Debe ingresar un email válido';
            errores = true
        }
    } else {
        addAndRemoveClass($email,"is-invalid" ,"input-style")
        $email.classList.remove("is-valid")
        $emailErrorLog.innerHTML = "El campo email es obligatorio"
        errores = true
    }

        
    })

    $email.addEventListener("blur", function(){
        if($email.value.length === 0){
            addAndRemoveClass($email,"is-invalid" ,"input-style")
            $email.classList.remove("is-valid")
            $emailErrorLog.innerHTML = "El campo email es obligatorio"
            errores = true
        } else{
            addAndRemoveClass($email, "is-valid", "is-invalid")
            $emailErrorLog.innerHTML = ""
            errores = false
        }

    })


    $password.addEventListener("keyup", function(event){
    if($password.value.length > 0){
        if(/^[a-zA-ZÀ-ÿ\d\u00f1\u00d1]{4,8}$/.test($password.value)){
            addAndRemoveClass($password, "is-valid", "is-invalid")
            $passwordErrorLog.innerHTML = ""
            errores = false
        } else {
            addAndRemoveClass($password, "is-invalid", "input-style")
            $passwordErrorLog.innerHTML = 'Debe ingresar una contraseña de 4-10';
            errores = true
        }
    } else {
        addAndRemoveClass($password,"is-invalid" ,"input-style")
        $password.classList.remove("is-valid")
        $passwordErrorLog.innerHTML = 'El campo contraseña es obligatorio';
        errores = true
    }

        
    })

    $password.addEventListener("blur", function(){
        if($password.value.length === 0){
            addAndRemoveClass($password,"is-invalid" ,"input-style")
            $password.classList.remove("is-valid")
            $passwordErrorLog.innerHTML = "El campo contraseña es obligatorio"
            errores = true
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
                $submitErrorLog.innerHTML = "Los campos señalados son obligatorios";
                errores = true;
            }  
        }

        if(!errores){
            $submitErrorLog.innerHTML = ""
            errores = false
            $form.submit()
            }else{
                errores = true;
            }

        







    })



})