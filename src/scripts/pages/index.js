$(document).ready(function () {
    var firstLaunch = true;
    $('.numbers__number').each(function () {
        $('.numbers__number').text("0");
    });

    $(document).on('scroll wheel DOMMousescroll', function () {
        if (elementInView($('.success-history-section'), false)) {
            if (firstLaunch) {
                countNumbersSlider('.slick-current');
                firstLaunch = false;
            }
        }
    }
    );

    // ГЛАВНАЯ - Слайдер историй успеха
    $("#success-history-slider").not('.slick-initialized').slick({
        draggable: true,
        vertical: false,
        slidesToShow: 1,
        arrows: true,
        infinite: true,
        swipeToSlide: true,
        // responsive: [
        //     {
        //         breakpoint: 992,
        //         settings: {
        //             vertical: false,
        //         }
        //     }
        // ]
    });

    // ГЛАВНАЯ - Слайдер новостей "Пресс-центр"
    $(".page--main #press-main-page").not('.slick-initialized').slick({
        centerMode: false,
        variableWidth: false,
        slidesToShow: 3,
        speed: 300,
        arrows: true,
        infinite: true,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
                centerMode: false,
                variableWidth: true,
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                centerMode: false,
                variableWidth: false,
                dots: false
            }
        }

        ]
    });

    // ГЛАВНАЯ - отзывы
    $("#review-slides").not('.slick-initialized').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: false,
        infinite: true,
        arrows: true,
        dots: true,
        // autoplay: true,
        // autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    dots: false,
                }
            }
        ]
    });

    // ГЛАВНАЯ - Слайдер вакансий
    $(".slider--vacancy").not('.slick-initialized').slick({
        draggable: true,
        vertical: true,
        slidesToShow: 1,
        arrows: true,
        infinite: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    vertical: false,
                }
            }
        ]
    });

    // ГЛАВНАЯ - Слайдер продуктов для планшетов
    $("#product-slider").not('.slick-initialized').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: false,
        infinite: true,
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    dots: false,
                }
            }
        ]
    });
})
