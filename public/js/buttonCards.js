function qs(element) {
  return document.querySelector(element);
}

function qsA(element) {
  return document.querySelectorAll(element);
}

  let $close = qs("#dontDelete");
  let modal = qs(".modal-background");

  function modalButtonCard(id) {
    switch (id) {
      case "cardDelivery":
        modal.innerHTML = `<div class="modalHome">
                                <div class="icon-cards">
                                    <i class="fas fa-truck"></i>
                                </div>
                                 <div class="description-cards">
                                    <h4>Entrega rápida</h4>
                                    <p>a todo el país</p>
                                 </div>                                 
                                 <div class="lorem"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, vitae libero modi dolore id odit delectus tempore aperiam tempora. Magni unde autit?ga. Alias ab nihil quae tempora in impedit?</p></div>
                                <div class="modal-buttons">                                  
                                    <button onclick="hiddenDelete()" id="dontDelete">Cerrar</button>
                                </div>
                             </div>`;
        modal.style.display = "flex";
        break;
      case "cardCuotas":
           modal.innerHTML = `<div class="modalHome">
           <div class="icon-cards">
           <i class="far fa-credit-card"></i>
         </div>
         <div class="description-cards">
           <h4>Plan 12 cuotas</h4>
           <p>con todas las tarjetas de crédito</p>
         </div>
         <div class="lorem"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, vitae libero modi dolore id odit delectus tempore aperiam tempora. Magni unde aut fuga. Alias ab nihil quae tempora in impedit?</p></div>
            <div class="modal-buttons">                                  
                <button onclick="hiddenDelete()" id="dontDelete">Cerrar</button>
            </div>
        </div>`;
        modal.style.display = "flex";
        
        break;
      case "cardDiscount":
        modal.innerHTML = `<div class="modalHome">
        <div class="icon-cards">
              <i class="fas fa-percent"></i>
            </div>
            <div class="description-cards">
              <h4>10% de descuento</h4>
              <p>pagando en efectivo</p>
            </div>
            <div class="lorem"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, vitae libero modi dolore id odit delectus tempore aperiam tempora. Magni unde aut fuga. Alias ab nihil quae tempora in impedit?</p></div>
        <div class="modal-buttons">                                  
            <button onclick="hiddenDelete()" id="dontDelete">Cerrar</button>
        </div>
    </div>`;
    modal.style.display = "flex";
        break;
      case "cardFacilities":
        modal.innerHTML = `<div class="modalHome">
        <div class="icon-cards">
              <i class="fas fa-hand-holding-usd"></i>
            </div>
            <div class="description-cards">
              <h4>Facilidades de pago</h4>
              <p>abonando desde la web</p>
            </div>
            <div class="lorem"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, vitae libero modi dolore id odit delectus tempore aperiam tempora. Magni unde aut fuga. Alias ab nihil quae tempora in impedit?</p></div>
        <div class="modal-buttons">                                  
            <button onclick="hiddenDelete()" id="dontDelete">Cerrar</button>
        </div>
    </div>`;
    modal.style.display = "flex";
        break;

      default:          
        break;
    }
    return modal;
  }

  modalButtonCard()

  function hiddenDelete() {
    modal.style.display = "none";
  }

  hiddenDelete()

