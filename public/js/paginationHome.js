const BASE_URL = "http://localhost:3000/api/"
let num_pages;
let num_page;

function allProducts(id) {
  fetch(`${BASE_URL}/products`)
    .then((res) => res.json())
    .then((products) => {
      console.log(products);
      num_pages = parseInt((products.length / 18) + 1);
      num_page = id
      var ini = 0;
      var fin = 0;
      var pages = [];

      if (parseInt(num_page) <= 5) {
        ini = 1;
        if (parseInt(num_pages) < 9)
          fin = parseInt(num_pages);
        else
          fin = 9;
      } else if (parseInt(num_page) >= parseInt(num_pages) - 4) {
        if (parseInt(num_pages) <= 9)
          ini = 1;
        else
          ini = parseInt(num_pages) - 9;
        fin = parseInt(num_pages);
      } else {
        ini = parseInt(num_page) - 4;
        fin = parseInt(num_page) + 4;
      }

      if (parseInt(num_page) > 1) {
        $('#paginas').append('primera');
        $('#paginas').append('ant');
      }
      for (var i = ini; i <= fin; i++) {
        $('#paginas').append('' + i + '');
      }
      if (parseInt(num_page)('sgte')) {
        $('#paginas').append('ultima');
      }
      if (parseInt(num_page) > 1) {
        for (var i = ini; i <= fin; i++) {
          divPagination.innerHTML += `<input id="dot-${i}" type="radio" name="dots"> 
          <label for="dot-${i}"></label> `
        }
      }
    });
}
const ProductContainer = document.querySelector(".Product-container");
const spinner = document.querySelector("#spinner");
const pagination = document.querySelector(".pagination");


document.addEventListener('click', (e) => {
  let id = e.target.id
  let contiene = id.match('dot-')
  //console.log(contiene);
  if (contiene == null) {
    function pagination(req, res) {
      fetch(`http://localhost:3000/${id}`)
        .then((Products) => {
          var numItems = 5;

          var svg = document.querySelector("svg");
          var spacing = 25;
          var radius = 8;
          var strokeWidth=2;
          var index = 0;
          var ringList=[];
          var initX = (300-spacing*(numItems-1))*.5;
          var dot = createElement("circle",{cx:initX+(index*spacing),cy:100,fill:"#fff",r:radius-(strokeWidth*2)});
          svg.appendChild(dot);
          paginate();
          disable(ringList[index]);
          TweenMax.set(dot,{fill:ringList[index].color});
          
          gotoIndex(3);
          function onSelect(e){
            gotoIndex(e.target.index);
          }
          function gotoIndex(targetIndex){
            var distance= Math.abs(targetIndex-index)*spacing*.5;
            var duration=Math.min((distance/spacing)*.2,.4);
            TweenMax.to(dot,.15,{scaleX:1.5,scaleY:.5,transformOrigin:"bottom",ease:Sine.easeOut,yoyo:true,repeat:1});
            TweenMax.to(dot,duration,{delay:.175,fill:ringList[targetIndex].color,x:targetIndex*spacing,ease:Sine.easeInOut});
            TweenMax.to(dot,duration*.5,{delay:.175,y:-distance,ease:Sine.easeOut,yoyo:true,repeat:1,onComplete:squish});
            enable(ringList[index]);
            disable(ringList[targetIndex]);
            index=targetIndex;
          }
          function enable(target){
            target.setAttribute("pointer-events","all");
          }
          function disable(target){
            target.setAttribute("pointer-events","none");
          }
          function squish(){
            TweenMax.to(dot,.15,{scaleX:1.5,scaleY:.75,transformOrigin:"bottom",ease:Sine.easeOut,yoyo:true,repeat:1});
          }
          
          
          function paginate() {
            for (var i = 0; i < numItems; i++) {
              var randomColor = "hsl("+(((i/(numItems))*360))+", 65%, 55%)";
              var ring = createElement("circle", {
                cx: initX+(i * spacing),
                cy: "50%",
                fillOpacity: 0,
                r: radius,
                stroke: randomColor,
                cursor:"pointer",
                strokeWidth: strokeWidth,
              });
              ring.index=i;
              ringList.push(ring);
              ring.color = randomColor;
              ring.addEventListener("click",onSelect);
              svg.appendChild(ring);
            }
          }
          
          function setAttributes(element, attributes) {
            var keyword, key;
            for (keyword in attributes) {
              key = keyword.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
              element.setAttributeNS(keyword === "xlink:href" ? "http://www.w3.org/1999/xlink" : null, key, attributes[keyword]);
            }
          }
          
          function createElement(type, attributes) {
            var element = document.createElementNS("http://www.w3.org/2000/svg", type);
            setAttributes(element, attributes);
            return element;
          }
        }).catch(error => console.log(error))
    }
    pagination(req, res)
    console.log(id, 'esto');
  }
  //console.log(e.target.id);
})



/* var ini = 0;
var fin = 0;
var pages = [];

if (parseInt(num_page) <= 5) {
  ini = 1;
  if (parseInt(num_pages) < 9)
    fin = parseInt(num_pages);
  else
    fin = 9;
} else if (parseInt(num_page) >= parseInt(num_pages) - 4) {
  if (parseInt(num_pages) <= 9)
    ini = 1;
  else
    ini = parseInt(num_pages) - 9;
  fin = parseInt(num_pages);
} else {
  ini = parseInt(num_page) - 4;
  fin = parseInt(num_page) + 4;
} */

/* Una vez que tenemos el inicio y el fin podemos añadir nuestros botones con ayuda de la librería jquery */
//let divPagination = documet.querySelector('.pagination')
/* if (parseInt(num_page) > 1) {
  $('#paginas').append('primera');
  $('#paginas').append('ant');
}
for (var i = ini; i <= fin; i++) {
  $('#paginas').append('' + i + '');
}
if (parseInt(num_page)('sgte')) {
  $('#paginas').append('ultima');
}
if (parseInt(num_page) > 1) {
  for (var i = ini; i <= fin; i++) {
    divPagination.innerHTML += `<input id="dot-${i}" type="radio" name="dots">
    <label for="dot-${i}"></label> `
  }
} */



/*
let limit = 8;
let offset = 1;

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 9;
    removeChildNodes(ProductContainer);
    fetchProducts(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 9;
  removeChildNodes(ProductContainer);
  fetchProducts(offset, limit);
});


function fetchProduct(id) {
    fetch(`${window.location.origin}/api/products`)
      .then((res) => res.json())
      .then((products) => {
          Products,
          let num_pages = parseInt((products.length / 18) + 1);
      });
  }

  function fetchProducts(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++) {
      fetchProduct(i);
    }
  }

  function removeChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  fetchProducts(offset, limit);
   */


