function qs (element) {
    return document.querySelector(element)
}


window.addEventListener("load", function(){
    let $userPro = qs('#userPro'),
    $userErrorPro = qs('#userErrorPro'),
    $nameErrorPro = qs('#nameErrorPro'),
    $lastNameErrorPro = qs('#lastNameErrorPro'),
    $telephoneErrorPro = qs('#telephoneErrorPro'),
    $formPro = qs("#formPro"),
    $submitErrorPro = qs("#submitErrorPro");
    let errores;


    function addAndRemoveClass(element, classToAdd, classToRemove){
        element.classList.add(classToAdd)
        element.classList.remove(classToRemove)
    }

    inputUser = document.getElementById("userPro")
    inputUser.addEventListener("keyup", function(event){
    if(inputUser.value.length > 0){
        if(/^[A-Z]{4,8}$/i.test(inputUser.value)){
            addAndRemoveClass(inputUser, "is-valid", "is-invalid")
            $userErrorPro.innerHTML = ""
            errores = false
        } else {
            addAndRemoveClass(inputUser, "is-invalid", "input-style")
            $userErrorPro.innerHTML = "min 4 o max 8 caracteres alfabeticos"
            errores = true
        }
    } else {
        addAndRemoveClass(inputUser,"is-invalid" ,"input-style")
        inputUser.classList.remove("is-valid")
        $userErrorPro.innerHTML = "El campo usuario es obligatorio"
        errores = true
    }

        
    })

    inputUser.addEventListener("blur", function(){
        if(inputUser.value.length === 0){
            addAndRemoveClass(inputUser,"is-invalid" ,"input-style")
            inputUser.classList.remove("is-valid")
            $userErrorPro.innerHTML = "El campo usuario es obligatorio"
            errores = true
        } 

    })

    inputName = document.getElementById("namePro")
    inputName.addEventListener("keyup", function(event){
    if(inputName.value.length > 0){
        if(/^[A-Za-z\s]+$/.test(inputName.value)){
            addAndRemoveClass(inputName, "is-valid", "is-invalid")
            $nameErrorPro.innerHTML = ""
            errores = false
        } else {
            addAndRemoveClass(inputName, "is-invalid", "input-style")
            $nameErrorPro.innerHTML = "solo caracteres alfabeticos"
            errores = true
        }
    } else {
        addAndRemoveClass(inputName,"is-valid" ,"input-style")
        inputName.classList.remove("is-invalid")
        $nameErrorPro.innerHTML = ""
        errores = false
    }

        
    })

    inputName.addEventListener("blur", function(){
        if(inputName.value.length === 0){
            addAndRemoveClass(inputName,"is-valid" ,"input-style")
            inputName.classList.remove("is-invalid")
            $nameErrorPro.innerHTML = ""
            errores = false
        } 

    })

    inputLastName = document.getElementById("lastNamePro")
    inputLastName.addEventListener("keyup", function(event){
    if(inputLastName.value.length > 0){
        if(/^[A-Za-z\s]+$/.test(inputLastName.value)){
            addAndRemoveClass(inputLastName, "is-valid", "is-invalid")
            $lastNameErrorPro.innerHTML = ""
            errores = false
        } else {
            addAndRemoveClass(inputLastName, "is-invalid", "input-style")
            $lastNameErrorPro.innerHTML = "solo caracteres alfabeticos"
            errores = true
        }
    } else {
        addAndRemoveClass(inputLastName,"is-valid" ,"input-style")
        inputLastName.classList.remove("is-invalid")
        $lastNameErrorPro.innerHTML = ""
        errores = false
    }

        
    })

    inputLastName.addEventListener("blur", function(){
        if(inputLastName.value.length === 0){
            addAndRemoveClass(inputLastName,"is-valid" ,"input-style")
            inputLastName.classList.remove("is-invalid")
            $lastNameErrorPro.innerHTML = ""
            errores = false
        } 

    })

    inputTelephone = document.getElementById("telephonePro")
    inputTelephone.addEventListener("keyup", function(event){
    if(inputTelephone.value.length > 0){
        if(/^[-]?[0-9]+[\.]?[0-9]+$/.test(inputTelephone.value)){
            addAndRemoveClass(inputTelephone, "is-valid", "is-invalid")
            $telephoneErrorPro.innerHTML = ""
            errores = false
        } else {
            addAndRemoveClass(inputTelephone, "is-invalid", "input-style")
            $telephoneErrorPro.innerHTML = "solo caracteres numericos"
            errores = true
        }
    } else {
        addAndRemoveClass(inputTelephone,"is-valid" ,"input-style")
        inputTelephone.classList.remove("is-invalid")
        $telephoneErrorPro.innerHTML = ""
        errores = false
    }

        
    })

    inputTelephone.addEventListener("blur", function(){
        if(inputTelephone.value.length === 0){
            addAndRemoveClass(inputTelephone,"is-valid" ,"input-style")
            inputTelephone.classList.remove("is-invalid")
            $telephoneErrorPro.innerHTML = ""
            errores = false
        } 

    })

    



    $formPro.addEventListener('submit',function(event){
        event.preventDefault()
        console.log($formPro.elements)
        let elementosForm = this.elements

        if(!errores){
            $submitErrorPro.innerHTML = ""
            errores = false
            $formPro.submit()
            }else{
                errores = true;
            }

        







    })

})
