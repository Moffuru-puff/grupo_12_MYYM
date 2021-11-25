function qs (element) {
    return document.querySelector(element)
}


window.addEventListener("load", function(){
    let $userRe = qs('#userPro'),
    $userErrorRe = qs('#userErrorPro'),
    $formPro = qs("#formPro"),
    $submitErrorPro = qs("#submitErrorPro");


    function addAndRemoveClass(element, classToAdd, classToRemove){
        element.classList.add(classToAdd)
        element.classList.remove(classToRemove)
    }

    inputUser = document.getElementById("userPro")
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

    $formPro.addEventListener('submit',function(event){
        event.preventDefault()


        if($userRe.classList.contains('is-valid')){

            $submitErrorPro.classList.remove('is-invalid');
            $submitErrorPro.innerHTML = ""
            $formPro.submit()

        }







    })


})