function qs(element) {
  return document.querySelector(element);
}

function qsA(element) {
  return document.querySelectorAll(element);
}

let $close = qs("#dontDelete");
let modal = qs(".modal-background");

function modalButtonForm(id) {
  
      modal.innerHTML = `<div class="modalHome">
        <div>
        <form action="/detalleDelProducto/${id} " method="post">
         <div class="rating-css hover-effect">
           <input type="radio" value="1" id="rating3-1" name="rating" checked>
           <label for="rating3-1" class="mdi mdi-star"></label>
           <input type="radio" value="2" id="rating3-2" name="rating">
           <label for="rating3-2" class="mdi mdi-star"></label>
           <input type="radio" value="3" id="rating3-3" name="rating">
           <label for="rating3-3" class="mdi mdi-star"></label>
           <input type="radio" value="4" id="rating3-4" name="rating">
           <label for="rating3-4" class="mdi mdi-star"></label>
           <input type="radio" value="5" id="rating3-5" name="rating">
           <label for="rating3-5" class="mdi mdi-star"></label>
           </div>
       <div>
         <textarea name="opinions" id="" cols="30" rows="10"></textarea></div>
       <button type="submit">Enviar</button>
  
        </form>
      </div>
                                <div class="modal-buttons">                                  
                                    <button onclick="hiddenDelete()" id="dontDelete">Cerrar</button>
                                </div>
                             </div>`;
      modal.style.display = "flex";
      // return modal;
      
   
  return modal;
}

modalButtonForm()

function hiddenDelete() {
  modal.style.display = "none";
}

hiddenDelete()

