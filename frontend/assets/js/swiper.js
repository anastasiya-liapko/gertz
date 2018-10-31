'use strict';

$(document).ready(function(){
  var width = $(window).width();
  var slides;

  width < 1200 ? slides = 1 : slides;
  width > 1200 ? slides = 3 : slides;

  var mySwiper = new Swiper ('.swiper-container', {
    slidesPerView: slides,
    loop: true,
    
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },
  })

  $(window).resize(function () {
    var width = $(window).width();

    if (width < 1200) {
      mySwiper.params.slidesPerView = 1;
    } else {
      mySwiper.params.slidesPerView = 3;
    }
    mySwiper.update();
  })
  $(window).trigger('resize');

})
