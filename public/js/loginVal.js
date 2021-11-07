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
    error = false,
    errores = []
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^([a-z])([A-Z]).{4,10}$/,
    expreg = /"^[A-Za-z]{4,8}$/;

    function addAndRemoveClass(element, classToAdd, classToRemove){
        element.classList.add(classToAdd)
        element.classList.remove(classToRemove)
    }

    $email.addEventListener("keyup", function(event){
    if($email.value.length > 0){
        if(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test($email.value)){
            addAndRemoveClass($email, "is-valid", "is-invalid")
            $emailErrorLog.innerHTML = ""
        } else {
            addAndRemoveClass($email, "is-invalid", "input-style")
            $emailErrorLog.innerHTML = 'Debe ingresar un email válido';
        }
    } else {
        addAndRemoveClass($email,"is-invalid" ,"input-style")
        $email.classList.remove("is-valid")
        $emailErrorLog.innerHTML = "El campo email es obligatorio"
        
    }

        
    })

    $email.addEventListener("blur", function(){
        if($email.value.length === 0){
            addAndRemoveClass($email,"is-invalid" ,"input-style")
            $email.classList.remove("is-valid")
            $emailErrorLog.innerHTML = "El campo email es obligatorio"
        } 

    })


    $password.addEventListener("keyup", function(event){
    if($password.value.length > 0){
        if(/^[a-zA-ZÀ-ÿ\d\u00f1\u00d1]{4,8}$/.test($password.value)){
            addAndRemoveClass($password, "is-valid", "is-invalid")
            $passwordErrorLog.innerHTML = ""
        } else {
            addAndRemoveClass($password, "is-invalid", "input-style")
            $passwordErrorLog.innerHTML = 'Debe ingresar una contraseña de 4-10';
        }
    } else {
        addAndRemoveClass($password,"is-invalid" ,"input-style")
        $password.classList.remove("is-valid")
        $passwordErrorLog.innerHTML = 'El campo contraseña es obligatorio';
        
    }

        
    })

    $password.addEventListener("blur", function(){
        if($password.value.length === 0){
            addAndRemoveClass($password,"is-invalid" ,"input-style")
            $password.classList.remove("is-valid")
            $passwordErrorLog.innerHTML = "El campo contraseña es obligatorio"
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
                error = true;
            }  
        }

        if(errores.length > 0){
            for (let index = 0; index < elementosForm.length-1; index++) {
                if(elementosForm[index].value === "" && errores.length > 0){
                    elementosForm[index].classList.remove('input-style');
                    elementosForm[index].classList.add('is-invalid');
                    $submitErrorLog.innerHTML = "Los campos señalados son obligatorios";
                    error = true;
                    
    
                } 
                
            }
            
        } else if($email.classList.contains('is-valid') && $password.classList.contains('is-valid')){

            $submitErrorLog.classList.remove('is-invalid');
            $submitErrorLog.innerHTML = ""
            $form.submit()

        }







    })



})