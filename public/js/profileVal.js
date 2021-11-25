function qs (element) {
    return document.querySelector(element)
}


window.addEventListener("load", function(){
    let $buttonDel = qs("#evil-btn-submit")
    let $formDel = qs("#formDel")
    
    $buttonDel.addEventListener("click", function(){
        let opcion = confirm("¿Estas seguro de querer eliminar tu cuenta?, está accion no se puede revertir")
        
        $formDel.addEventListener("submit", function(event){
            event.preventDefault()

            if(opcion === true){
                $formDel.submit()
            } 
        })
    })

})