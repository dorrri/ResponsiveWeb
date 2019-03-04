// window.onload=function () {
//     new hrSlide('slideWindow','slide',{dots: true});
// }

$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
    });
});
