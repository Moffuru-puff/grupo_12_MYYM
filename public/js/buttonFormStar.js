function qs(element) {
  return document.querySelector(element);
}

function qsA(element) {
  return document.querySelectorAll(element);
}

let $close = qs("#buttonCloseX");
let modal = qs(".modal-background");
let $buttonsOpinions = qs('.buttonsOpinions')
let $all = qs('#all')
let $bads = qs('#bads')
let $good = qs('#goods')

$buttonsOpinions.addEventListener('click', (e) => {
  id = e.target.id
  switch (id) {
    case 'allOpinions':
      $all.style.display = 'block'
      $bads.style.display = 'none'
      $good.style.display = 'none'      
      break;
    case 'negative':
      $bads.style.display = 'block'
      $all.style.display = 'none'
      $good.style.display = 'none'      
      break;
    case 'positive':
      $good.style.display = 'block'
      $bads.style.display = 'none'
      $all.style.display = 'none'      
      break;
  
    default:
      break;
  }
})

function modalButtonForm(id) {
  
      modal.innerHTML = `<div class="modalHome">
        <div>
        <form action="/detalleDelProducto/${id} " method="post">
         <div class="rating-css hover-effect">
           <input type="radio" value="1" id="rating1-1" name="rating" checked>
           <label for="rating1-1" class="mdi mdi-star"></label>
           <input type="radio" value="2" id="rating1-2" name="rating">
           <label for="rating1-2" class="mdi mdi-star"></label>
           <input type="radio" value="3" id="rating1-1" name="rating">
           <label for="rating1-1" class="mdi mdi-star"></label>
           <input type="radio" value="4" id="rating1-4" name="rating">
           <label for="rating1-4" class="mdi mdi-star"></label>
           <input type="radio" value="5" id="rating1-5" name="rating">
           <label for="rating1-5" class="mdi mdi-star"></label>
           </div>
          <div class="textarea">
         <textarea name="opinions" id="" cols="30" rows="10"></textarea>
         </div>
         <div class="modal-buttons">  
       <button type="submit" id="buttonSubmit">Enviar</button>
       </div>
        </form>
      </div>
                                <div class="modal-buttons">                                  
                                    <button onclick="hiddenDelete()" id="buttonCloseX">X</button>
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

