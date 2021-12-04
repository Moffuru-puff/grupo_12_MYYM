let changeFav =
    document.addEventListener('click', (e) => {
        var id = e.target.id
        if (e.target && e.target.tagName === "FIGURE" && e.target.id == id) {
            userId = e.target.attributes.userid.value
            if (e.target.classList.value.indexOf('activated') == -1) {
                fetch(`${window.location.origin}/api/favorite?userId=${userId}&productId=${id}`, {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(function (response) {
                        if (response.status !== 200) {
                            console.log(`Looks like there was a problem. Status code: ${response.status}`);
                            return;
                        }
                        response.json().then(function (data) {
                            e.target.classList.value = "myImage activated"
                        });
                    })
                    .catch(function (error) {
                        console.log("Fetch error: " + error);
                    });

            } else {
                fetch(`${window.location.origin}/api/favorite?userId=${userId}&productId=${id}`, {
                    method: 'DELETE',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(function (response) {
                        if (response.status !== 200) {
                            console.log(`Looks like there was a problem. Status code: ${response.status}`);
                            return;
                        }
                        response.json().then(function (data) {
                            e.target.classList.value = "myImage"
                        });
                    })
                    .catch(function (error) {
                        console.log("Fetch error: " + error);
                    });
            }
        }
    })
    ;
/* Función para flecha de ir arriba */
$(document).ready(function () {

    $('.arrow-top').click(function () {
        $('body, html').animate({
            scrollTop: '0px'
        }, 300);
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.arrow-top').slideDown(300);
        } else {
            $('.arrow-top').slideUp(300);
        }
    });

});




