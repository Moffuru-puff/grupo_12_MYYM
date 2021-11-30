
function qs(element) {
  return document.querySelector(element);
}

let paginationContainer = qs('#paginationContainer')

paginationContainer.addEventListener('submit', (e) => {
  console.log(e.target.id);
  e.preventDefault()
  let id = e.target.id
  let form = qs(`#${id}`)

  setInterval(function(){  
    form.classList.add('click')  
    e.target.submit()
  }, 100);

})
