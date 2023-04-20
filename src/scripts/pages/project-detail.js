//Меню footer "аккордеон".
// var navWrapper = [
//     '<div class="nav-slider">',
//     '</div>',
// ].join("\r\n");
// var navItem = [
//     '<div class="nav-slider__title">',
//     '</div>',
// ].join("\r\n");

// var element= $( ".panel__title" );
// var $navWrapper = $(navWrapper);

// function createNav(){
//     element.each(function(){
//     text = $(this).text();
//     $navItem=$(navItem);
//       $($navItem).html('<span>'+text+'</span>');
//       $navWrapper.append($navItem)
//     });
//     $( ".products-services" ).append($navWrapper);
// };

// function navInit(){
//     var docWidth =$(window).width();
//     if( docWidth <= 770 && docWidth >= 577){
//         $( ".products-list" ).attr('id', 'product-detail__slider');
//         createNav();   
//     }
// }
// navInit();

// $("#product-detail__slider").slick({
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     vertical: false,
//     infinite: true,
//     arrows: true,
//     dots: false,
//     asNavFor: '.nav-slider'
// })
// $('.nav-slider').slick({
//     infinite: true,
//     asNavFor: '#product-detail__slider',// указываем что это навигация для блока выше
//     dots: false,
//     arrows: false,
//     slidesToShow: 3, 
//     focusOnSelect: true, 
    
// });