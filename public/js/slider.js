let slideIndex = 1;
showSlides(slideIndex)

function plusSlides(number) {
    showSlides(slideIndex += number)
}

function currentSlide(number) {
    showSlides(slideIndex = number)
}

function showSlides (number) {
    let i;
    let slides = document.getElementsByClassName("slides"); 
    let dots = document.getElementsByClassName("dot"); 


    if(number > slides.length){
        slideIndex = 1
    }

    if(number < 1) {
        slideIndex = slides.length
    }

    for(i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for(i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" dot-active", "")
    }

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " dot-active";
}

setInterval(()=> {
 currentSlide(slideIndex + 1)
}, 5000)

/* Carousel Desktop */

$('.slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    centerMode: true,
    variableWidth: true,
    infinite: true,
    focusOnSelect: true,
    cssEase: 'linear',
    touchMove: true,
    prevArrow:'<button class="slick-prev"> < </button>',
    nextArrow:'<button class="slick-next"> > </button>',
  });
  
  
  var imgs = $('.slider img');
  imgs.each(function(){
    var item = $(this).closest('.item');
    item.css({
      'background-image': 'url(' + $(this).attr('src') + ')', 
      'background-position': 'center',            
      '-webkit-background-size': 'cover',
      'background-size': 'cover', 
    });
    $(this).hide();
  });