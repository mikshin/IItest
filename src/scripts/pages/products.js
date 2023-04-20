$(document).ready(function() {
    // ОБЩИЙ - Слайдер с описанием в детальной
    $("#sm-slider").not('.slick-initialized').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        infinite: true,
        arrows: true,
        dots: false
    })
})