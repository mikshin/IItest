// TODO: Prettier для исходников
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
      }
  };
}
//global var
var speedSlider = 5500;

var slickFlag = false;
var particleFlag = false;
var niceSelectFlag = false;
var stickyFlag = false;
var maskFlag = false;

$("script[src]").each(function(i, src) {
  if (src.attributes.src.value.indexOf("slick") > -1) {
    slickFlag = true;
  } else if (src.attributes.src.value.indexOf("particle") > -1) {
    particleFlag = true;
  } else if (src.attributes.src.value.indexOf("nice") > -1) {
    niceSelectFlag = true;
  } else if (src.attributes.src.value.indexOf("sticky-kit") > -1) {
    stickyFlag = true;
  } else if (src.attributes.src.value.indexOf("masked") > -1) {
    maskFlag = true;
  }
});

// Функция для демонстрации прелоадера
function enablePreloader() {
  localStorage.setItem("isPreloaderDisabled", false);
  window.open("/", "_self");
}

safariPatch();

// function toggleMenu() {
//     $(".site-menu").toggleClass("site-menu--active");
//     $(".site-menu-trigger").toggleClass("site-menu-trigger--active");

//     if ($(".site-menu").hasClass("site-menu--active")) {
//         /*если меню открыто, то*/
//         setTimeout(function () {
//             htmlElement.addClass("page--lock-scroll");
//         }, 200);
//         $(".site-menu-trigger").removeClass("site-menu-trigger--closed");
//         $(".site-menu").removeClass("site-menu--visially-hidden");

//         if (htmlElement.hasClass("fp-enabled")) {
//             fullpage_api.setAutoScrolling(false);

//         }
//     } else {
//         /*если меню закрыто, то*/
//         $(".site-menu-trigger").toggleClass("site-menu-trigger--closed");

//         htmlElement.removeClass("page--lock-scroll");
//         if (htmlElement.hasClass("fp-enabled")) {
//             fullpage_api.setAutoScrolling(true);
//         }

//         setTimeout(function () {
//             $(".site-menu").addClass("site-menu--visially-hidden");
//         }, 500);

//     }

//     $(document).on('keydown', function (e) {
//         if (e.keyCode === 27) {
//             $(".site-menu").removeClass("site-menu--active");
//             $(".site-menu-trigger").removeClass("site-menu-trigger--active");
//             htmlElement.removeClass("page--lock-scroll");
//         }
//     });
// }

//TODO: Рефакторинг (выделить константы и функции) https://o7planning.org/ru/12181/ecmascript-modules-tutorial

const desktopMenuClass = ".site-menu--desktop";
const tabletMenuClass = ".site-menu--tablet";
const search = document.querySelectorAll('[data-name="tab-search"]');

const overlay = document.querySelectorAll(".overlay-manager");

const tabletMenu = document.getElementById("tablet-menu");
const buttons = document.querySelectorAll(".button--current");
const linksSingle = document.querySelectorAll(
  `${desktopMenuClass} .nav-item__link--single-link`
);

const menuTabList = document.querySelectorAll("[data-name]");
const html = document.querySelector("html");
const tabs = document.querySelectorAll(desktopMenuClass + " " + "[id*='tab']");
const links = document.querySelectorAll(
  desktopMenuClass + " " + ".nav-item__link:not(.nav-item__link--single-link)"
);
const linksTablet = document.querySelectorAll(
  tabletMenuClass + " " + ".nav-item__link"
);
const classes = [
  "site-menu__tab--open",
  "page--lock-scroll",
  "page--overlay",
  "site-menu__tab"
];

const toggleMenu = function(item) {
  let target = item;
  if (target) {
    closeMenu();
    let tabData = target.dataset.name;
    let tabId = document.getElementById(tabData);
    if (tabId) {
      tabId.classList.add(classes[0]);
      html.classList.add(classes[1]);
      html.classList.add(classes[2]);
    }
  } else {
    return;
  }
};

const closeMenu = function(event) {
  tabs.forEach(function(item) {
    let tab = document.getElementById(item.id);
    tab.classList.remove(classes[0]);
  });
  html.classList.remove(classes[1]);
  html.classList.remove(classes[2]);
};

links.forEach(function(item) {
  var timeoutId;
  item.onmouseover = function(event) {
    if (!timeoutId) {
      timeoutId = window.setTimeout(function() {
        toggleMenu(item);
      }, 50);
    }
  };
  item.onmouseout = function(event) {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  item.onclick = function(event) {
    toggleMenu(item);
  };
  item.onfocus = function(event) {
    toggleMenu(item);
  };
});

linksSingle.forEach(function(item) {
  var timeoutId;
  item.onmouseover = function(event) {
    if (!timeoutId) {
      timeoutId = window.setTimeout(function() {
        closeMenu();
      }, 50);
    }
  };
  item.onmouseout = function(event) {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
});

linksTablet.forEach(function(item) {
  item.onclick = function(event) {
    let target = item.closest("[data-name]");
    let tabData = target.dataset.name;
    let tabId = document.getElementById(tabData);
    if (tabId.classList.contains(classes[0])) {
      tabs.forEach(function(item) {
        let tab = document.getElementById(item.id);
        tab.classList.remove(classes[0]);
      });
      html.classList.remove(classes[1]);
      html.classList.remove(classes[2]);
      if (target.getAttribute("data-name") == "tablet-menu") {
        document
          .querySelector(tabletMenuClass)
          .classList.remove("site-menu-trigger--active");
        document
          .querySelector(tabletMenuClass)
          .classList.add("site-menu-trigger--closed");
      }
    } else {
      tabId.classList.add(classes[0]);
      html.classList.add(classes[1]);
      html.classList.add(classes[2]);
      if (target.getAttribute("data-name") == "tablet-menu") {
        document
          .querySelector(tabletMenuClass)
          .classList.add("site-menu-trigger--active");
        document
          .querySelector(tabletMenuClass)
          .classList.remove("site-menu-trigger--closed");
      }
      tabs.forEach(function(item) {
        let tab = document.getElementById(item.id);
        if (tabData != item.id) {
          tab.classList.remove(classes[0]);
        }
      });
    }
  };
  item.onfocus = function(event) {};
});

document.querySelectorAll(`.${classes[3]}`).forEach(function(item) {
  item.onmouseenter = function(event) {
    let target = event.target.id;
    let button = document.querySelector('[data-name="' + `${target}` + '"]');
    button.classList.add("nav-item__link--selected");
  };

  item.onmouseleave = function(event) {
    let target = event.target.id;
    let button = document.querySelector('[data-name="' + `${target}` + '"]');
    button.classList.remove("nav-item__link--selected");
  };
});

buttons.forEach(function(item) {
  item.onclick = function(event) {
    toggleMenu(item);
  };
});

function manageOverlay() {
  var timeoutId;

  overlay.forEach(element => {
    element.onmouseover = function(event) {
      if (!timeoutId) {
        timeoutId = window.setTimeout(function() {
          closeMenu();
        }, 50);
      }
    };
    element.onmouseout = function(event) {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
  });
}
manageOverlay();

function detectSafari() {
  var safari = window.navigator.userAgent.search("Safari");
  var chrome = navigator.userAgent.search("Chrome");
  if (safari > 0 && chrome < 0) {
    // Safari
    return true;
  }
  return false;
}

search.forEach(function(elem) {
  const siteSearch = document.querySelector(".site-search");

  elem.addEventListener("click", function(event) {
    const target = event.target;
    if (
      document.activeElement &&
      document.activeElement.tagName != "INPUT" &&
      !detectSafari
    ) {
      siteSearch.querySelector("input").focus();
    }
    document
      .querySelector(tabletMenuClass)
      .classList.remove("site-menu-trigger--active");
    document
      .querySelector(tabletMenuClass)
      .classList.add("site-menu-trigger--closed");
  });

  elem.addEventListener("touchend", function(event) {
    if (
      document.activeElement &&
      document.activeElement.tagName != "INPUT" &&
      !detectSafari
    ) {
      siteSearch.querySelector("input").focus();
    }
    document
      .querySelector(tabletMenuClass)
      .classList.remove("site-menu-trigger--active");
    document
      .querySelector(tabletMenuClass)
      .classList.add("site-menu-trigger--closed");
  });

  elem.addEventListener("mouseover", function(event) {
    const target = event.target;
    if (!$(target).closest(tabletMenuClass)) {
      if (document.activeElement && document.activeElement.tagName != "INPUT") {
        siteSearch.querySelector("input").focus();
      }
    } else {
      return;
    }
  });
});

// Открытие меню
var bodyElement = $("body");
var htmlElement = $("html");

$(".burger-wrapper").on("click", function(e) {
  e.preventDefault();
  // toggleMenu();
});

$(".site-menu__close").on("click", function(e) {
  e.preventDefault();
  // toggleMenu();
});

$(".site-menu__tab ul li ul li a").on("click", function(e) {
  // toggleMenu();
});

$(".site-menu__feedback").on("click", function() {
  toggleMenu();
  // var forms = document.querySelectorAll('.form-section');
  setTimeout(function() {
    openFeedbackModal();
    // if (forms.length > 0) {
    //     forms[0].focus();
    //     forms[0].scrollIntoView({
    //         behavior: 'smooth',
    //         block: 'start'
    //     });
    // }
  }, 600);
});
//Проверка пристутвия элемента в области видимости
function elementInView(element, fullyInView) {
  var pageTop = $(window).scrollTop();
  var pageBottom = pageTop + $(window).height();
  var elementTop = $(element).offset().top;
  var elementBottom = elementTop + $(element).height();

  if (fullyInView === true) {
    return pageTop < elementTop && pageBottom > elementBottom;
  } else {
    return elementTop <= pageBottom && elementBottom >= pageTop;
  }
}

//TODO: Оптимизировать конфиги slick-slider

$(document).ready(function() {
  if (maskFlag) {
    $("[type=tel]").mask("+7 (999) 999-99-99");
  }

  var countSlides = 2;

  if ($("#widget-slider-news .article").length < 2) {
    countSlides = 1;
  }

  // Убираем белый экран
  setTimeout(function() {
    htmlElement.addClass("page--loaded");
  }, 600);

  if (slickFlag) {
    // ПРЕСС-ЦЕНТР - 3 слайдера-списка
    $(
      ".press-block .article-list:not(#press-main-page), .page--news .article-list"
    )
      .not(".slick-initialized")
      .slick({
        centerMode: false,
        variableWidth: true,
        slidesToShow: 3,
        speed: 300,
        arrows: true,
        infinite: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              dots: true,
              arrows: false
            }
          },
          {
            breakpoint: 610,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              arrows: false,
              dots: false
            }
          }
        ]
      }),
      $("#product-feature")
        .not(".slick-initialized")
        .slick({
          centerMode: false,
          variableWidth: true,
          slidesToShow: 3,
          speed: 300,
          arrows: true,
          infinite: true,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1
              }
            },
            {
              breakpoint: 610,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                dots: false
              }
            }
          ]
        }),
      // ОБЩИЙ - Слайдер в сайдбаре
      $("#widget-slider-news")
        .not(".slick-initialized")
        .slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          dots: true,
          autoplay: true,
          autoplaySpeed: speedSlider,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: countSlides,
                centerMode: true
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                centerMode: true
              }
            },
            {
              breakpoint: 610,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false
              }
            }
          ]
        }),
      $("#widget-slider")
        .not(".slick-initialized")
        .slick({
          centerMode: false,
          variableWidth: true,
          slidesToShow: 3,
          speed: 300,
          arrows: true,
          infinite: true,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
              }
            },
            {
              breakpoint: 610,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                arrows: false
              }
            }
          ]
        }),
      // ОБЩИЙ - широкий слайдер
      $("#wide-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: speedSlider
      });
  }

  // ОБЩЕЕ - Слайдер "Смотрите по теме" (Превью проектов)
  if ($(window).width() <= 768) {
    toggleSlider(
      projectsPreviewSliderSelector,
      projectsPreviewSliderSettings,
      true
    );
  }

  // Слайдер - "Продукты и услуги" общий
  if ($(window).width() >= 396 && $(window).width() <= 1200) {
    // $(".products-list").slick('unslick');
    toggleSlider(
      productsAndServicesSliderSelector,
      productsAndServicesSliderSettings,
      true
    );
  }

  // ОБЩЕЕ - Поддержка object-fit: cover

  setTimeout(() => {
    objectFitImages();
  }, 1000);

  if (stickyFlag) {
    // САЙДБАР - Стик виджета
    $("#sidebar__item-to-fix").stick_in_parent();
  }
});

window.addEventListener("load", function() {
  if (particleFlag) {
    // Запуск парткилов
    multi_particles("particle-title", top_particles_conf);
  }
});

function counterSlides(id) {
  $(id).on("init", function() {
    $(id).after('<span id="' + id.substring(1) + '-count-slides"></span>');
  });

  $(id).on("init reInit afterChange", function(
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    var numberSlide = (currentSlide ? currentSlide : 0) + 1;
    $(id + "-count-slides").text(numberSlide + "/" + slick.slideCount);
  });
}

function counterSlidesClear() {
  $('[id*="-count-slides"]').remove();
}

//Добавление пагинации слайдерам
$(
  ".press-block .article-list, .page--news .article-list, #widget-slider-news"
).each(function() {
  counterSlides("#" + this.id);
});

//"Якорь" для формы.
var anchors = document.querySelectorAll(
  '.products-list__item[href^="#"], .list__item a, a[href*="form"].button'
);
anchors.forEach(function(anchor) {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    var blockId = anchor.getAttribute("href");
    document.querySelector("" + blockId).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    if (history.pushState) {
      history.pushState(null, null, blockId);
    } else {
      location.hash = n;
    }
  });
});

// Функция для переключения состояния слайдеров
function toggleSlider(selector, settings, flag) {
  var currentSlider = $(selector);
  var isCurrentSliderSlick = currentSlider.hasClass("slick-initialized");

  if (flag && !isCurrentSliderSlick) {
    currentSlider.slick(settings);
  } else if (!flag && isCurrentSliderSlick) {
    currentSlider.slick("unslick");
  }
}

// Слайдер "Смотрите по теме" (Превью проектов)
var projectsPreviewSliderSelector = ".projects-preview .article-list";
var projectsPreviewSliderSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  vertical: false,
  infinite: true,
  arrows: true,
  dots: true
};

// Слайдер "Продукты и услуги"
var productsAndServicesSliderSelector =
  ".page--product .products-services .products-list";
var productsAndServicesSliderSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  vertical: false,
  infinite: true,
  arrows: true,
  dots: false,
  asNavFor: ".nav-slider"
};

$(".product-animation").each(function() {
  bodymovin.loadAnimation({
    container: document.getElementById(this.id),
    rederer: "svg",
    loop: true,
    autoplay: true,
    path: "images/animations/" + this.id + "/data.json"
  });
});

// АДАПТИВ - Слайдер на главной / слайдер Продукты и услуги / Слайдер Превью новостей

var productSlider = $("#product-slider");
var pressBlockSlider = $("#news-preview");
var settings = {
  asNavFor: ".nav-slider"
};
var productSliderSettings = {};

var resizeTimer;

$(window)
  .on("resize", function() {
    var docWidth = $(window).width();
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (slickFlag) {
        $(".slick-slider").slick("refresh");

        // if (productSlider.length > 0) {
        //     if (docWidth < 396) {

        //         if (productSlider.hasClass('slick-initialized')) {
        //             productSlider.slick('unslick');
        //         }
        //     } else {
        //         if (!productSlider.hasClass('slick-initialized')) {
        //             return productSlider.slick(productSliderSettings);
        //         }
        //     }
        // }

        // if (pressBlockSlider.length > 0) {
        //     if (docWidth <= 396 || docWidth >= 1320) {
        //         if (pressBlockSlider.hasClass('slick-initialized')) {
        //             pressBlockSlider.slick('unslick');
        //         }
        //     } else {
        //         if (!pressBlockSlider.hasClass('slick-initialized')) {
        //             return pressBlockSlider.slick(productSliderSettings);
        //         }
        //     }
        // }
      }

      if (docWidth <= 768) {
        document
          .querySelectorAll(".footer-nav-item-title")
          .forEach(function(item) {
            item.onclick = function(event) {
              event.preventDefault();
              $(this)
                .closest("li")
                .toggleClass("active");

              if (
                $(this)
                  .closest("li")
                  .find("ul")
                  .children().length == 0
              ) {
                return true;
              } else {
                return false;
              }
            };
          });

        // $(".footer-nav-item-title").click(function (event) {
        //     if (!this.classList.contains('map')) {
        //         event.preventDefault();
        //         $(".footer-nav li").not(this.closest('li')).removeClass("active");
        //         $(this).closest("li").toggleClass("active");
        //
        //         if ($(this).closest("li").find("ul").children().length == 0) {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     }
        // });
      }
    }, 150);

    searchItemToggle();
  })
  .trigger("resize");

// функция выдает ошибку !!!!

//(function() {
// if (typeof NodeList.prototype.forEach === "function")
// return false;
//else
// NodeList.prototype.forEach = Array.prototype.forEach;
//})();

// ФОРМЫ, ВЫПАДАШКИ
// $('.input-container--select').niceSelect();

// function placeholderPolyfill() {
//     this.classList[this.value ? "remove" : "add"]("placeholder-shown");
// }

// document.querySelectorAll("[placeholder]").forEach(function (el) {
//     el.addEventListener("change", placeholderPolyfill);
//     el.addEventListener("keyup", placeholderPolyfill);
// });
//функция выдает ошибку !!!!

//выпадаюши список для страницы поиск
function searchItemToggle() {
  var width = $(window).width();

  var listIf = $(".search-result-sections-list>li")
    .first()
    .find("label")
    .hasClass("active-list");

  if (width <= 600) {
    if (!listIf) {
      $(".search-result-sections-list>li")
        .first()
        .find("label")
        .addClass("active-list");
      $(".search-result-sections-list>li:gt(0)").wrapAll(
        "<ul class='search-result-sections-list new-list'></ul>"
      );
      var replace = $(".new-list").detach();
      replace.appendTo($(".search-result-sections-list>li"));
    }
  } else {
    if (listIf) {
      $(".search-result-sections-list>li")
        .first()
        .find("label")
        .removeClass("active-list");
      replace = $(".new-list>li").detach();
      replace.appendTo($(".search-result-sections-list"));
      $(".new-list").remove();
    }
  }
}

$(".search-result-sections-list").on("click", ".active-list", function(e) {
  $(".active-list").toggleClass("arrow");
  $(".new-list").slideToggle(300);
  e.preventDefault();
});

searchItemToggle();

// Определение ИЕ
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  var edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }

  // other browser
  return false;
}

// Функция для запуска пересчета цифр
function countNumbersSlider(selector) {
  $(selector + " .numbers__number").each(function() {
    $(this).finish();
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).attr("data-count")
        },
        {
          duration: $(this).attr("data-count") > 5 ? 2000 : 1000,
          easing: "swing",
          step: function() {
            var data = $(this).attr("data-count");
            if (data.indexOf(".") == -1) {
              $(this).text(
                Math.ceil(this.Counter)
                  .toLocaleString()
                  .replace(/,/g, " ")
              );
            } else {
              if (this.Counter >= 2) {
                $(this).text(
                  Math.ceil(this.Counter - 1)
                    .toLocaleString()
                    .replace(/,/g, " ")
                );
              }
            }
          },
          complete: function() {
            if (this.Counter === parseInt(this.Counter, 10)) {
              $(this).text(this.Counter.toLocaleString().replace(/,/g, " "));
            } else {
              $(this).text(
                this.Counter.toFixed(1)
                  .toLocaleString()
                  .replace(/,/g, " ")
              );
            }
          }
        }
      );
  });
}

$("#success-history-slider").on("beforeChange", function() {
  clearCounter();
});

function clearCounter() {
  $(".numbers__number").each(function() {
    $(".numbers__number").text("0");
  });
}

// Запуск счетчика цифр при сменен слаидера
$("#success-history-slider").on("afterChange", function() {
  countNumbersSlider(".slick-current");
});

function createNav() {
  var navWrapper = ['<div class="nav-slider">', "</div>"].join("\r\n");
  var navItem = ['<div class="nav-slider__title">', "</div>"].join("\r\n");

  var element = $(".panel__title");
  var $navWrapper = $(navWrapper);
  element.each(function() {
    var text = $(this).text();
    var $navItem = $(navItem);
    $($navItem).html("<span>" + text + "</span>");
    $navWrapper.append($navItem);
  });
  var target = document.querySelector(".products-list");
  if (target) {
    // создаем экземпляр наблюдателя
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function() {
        if ($(".products-list").hasClass("slick-slider")) {
          if (!$("*").is(".nav-slider")) {
            $(".products-services").append($navWrapper);

            $(".nav-slider").slick({
              infinite: false,
              dots: false,
              arrows: false,
              slidesToShow: 3,
              focusOnSelect: true,

              asNavFor: ".products-list"
            });
          }
        } else {
          $(".nav-slider").slick("unslick");
          $(".nav-slider").detach();
        }
      });
    });

    // настраиваем наблюдатель
    var config = {
      attributes: true,
      childList: true
    };

    // передаем элемент и настройки в наблюдатель
    observer.observe(target, config);
  }
}
createNav();

//Модальное окно (форма)
var modalPartners = new tingle.modal({
  closeMethods: ["overlay", "button", "escape"],
  onOpen: function() {},
  onClose: function() {},
  beforeClose: function() {
    return true;
  }
});

var modalJoin = new tingle.modal({
  closeMethods: ["overlay", "button", "escape"],
  onOpen: function() {
    var checkbox = this.modalBox.querySelector('.checkbox-container input')
    checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
        checkbox.classList.add('checkbox--checked')
      } else {
        checkbox.classList.remove('checkbox--checked')
      }
    })

  },
  onClose: function() {},
  cssClass: ["tingle-modal--join"],
  beforeClose: function() {
    return true;
  }
});

var modalDemo = new tingle.modal({
  closeMethods: ["overlay", "button", "escape"],
  onOpen: function() {},
  onClose: function() {},
  beforeClose: function() {
    return true;
  }
});

var modalPrice = new tingle.modal({
  closeMethods: ["overlay", "button", "escape"],
  onOpen: function() {},
  onClose: function() {},
  beforeClose: function() {
    return true;
  }
});

var modalFree = new tingle.modal({
  closeMethods: ["overlay", "button", "escape"],
  onOpen: function() {},
  onClose: function() {},
  beforeClose: function() {
    return true;
  }
});

var modalFeedback = new tingle.modal({
  closeMethods: ["overlay", "button", "escape"],
  onOpen: function() {},
  onClose: function() {},
  beforeClose: function() {
    return true;
  }
});

var modalLetter = new tingle.modal({
  closeMethods: ["overlay", "button", "escape"],
  cssClass: ["tingle-modal--letter"],
  beforeClose: function() {
    return true;
  }
});

var modalOrder = new tingle.modal({
  closeMethods: ["overlay", "button", "escape"],
  cssClass: ["tingle-modal--order"],
  beforeClose: function() {
    return true;
  },
  onOpen: function() {
    if(this.modalBox){
     this.modalBox.querySelector(".total-sum__form").textContent = orderData.total;
    }else {
      this.querySelector(".total-sum__form").textContent = orderData.total;
    }         
  },
});

var modalVideo = new tingle.modal({
  closeMethods: ["overlay", "button", "escape"],
  cssClass: ["tingle-modal--video"],
  onClose: function() {
    $(".tingle-modal--video iframe").attr(
      "src",
      $(".tingle-modal--video iframe").attr("src")
    );
  },
  beforeClose: function() {
    return true;
  }
});

var modalDictionary = new tingle.modal({
  closeMethods: ["overlay", "button", "escape"],
  onOpen: function() {},
  onClose: function() {},
  beforeClose: function() {
    return true;
  }
});
var modalDictionary = new tingle.modal({
  closeMethods: ["overlay", "button", "escape"],
  onOpen: function() {},
  onClose: function() {},
  beforeClose: function() {
    return true;
  }
});

var modalContact = new tingle.modal({
  closeMethods: ["overlay","button", "escape"],
  cssClass: ["tingle-modal--contact"],
  onOpen: function() {},
  onClose: function() {
    if(this.modalBox){
      var item = this.modalBox.querySelector(".contact-content")
     this.modalBox.removeChild(item)
    }else{
      var item = this.querySelector(".contact-content")
     this.querySelector('.tingle-modal-box').removeChild(item)
    }

  },
  beforeClose: function() {
    return true;
  }
});

var modalJoinLater = new tingle.modal({
  closeMethods: ["overlay", "button", "escape"],
  onOpen: function() {
    var checkbox = this.modalBox.querySelector('.checkbox-container input')
    checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
        checkbox.classList.add('checkbox--checked')
      } else {
        checkbox.classList.remove('checkbox--checked')
      }
    })

  },
  onClose: function() {},
  cssClass: ["tingle-modal--joinlater"],
  beforeClose: function() {
    return true;
  }
});

function modalForm() {
  if (window.modalFeedbackTemplate) {
    modalFeedback.setContent(window.modalFeedbackTemplate);
  }

  if (window.modalFreeTemplate) {
    modalFree.setContent(window.modalFreeTemplate);
  }

  if (window.modalDemoTemplate) {
    modalDemo.setContent(window.modalDemoTemplate);
  }

  if (window.modalPriceTemplate) {
    modalPrice.setContent(window.modalPriceTemplate);
  }

  if (window.modalPartnersTemplate) {
    modalPartners.setContent(window.modalPartnersTemplate);
  }

  if (window.modalVideoTemplate) {
    modalVideo.setContent(window.modalVideoTemplate);
  }

  if (window.modalImageTemplate) {
    modalImage.setContent(window.modalImageTemplate);
  }

  if (window.modalDictionaryTemplate) {
    modalDictionary.setContent(window.modalDictionaryTemplate);
  }

  if (window.modalLetterTemplate) {
    modalLetter.setContent(window.modalLetterTemplate);
  }

  if (window.modalJoinTemplate) {
    modalJoin.setContent(window.modalJoinTemplate);
  }
  if (window.modalJoinLaterTemplate) {
    modalJoinLater.setContent(window.modalJoinLaterTemplate);
  }
  if (window.modalOrderTemplate) {
    modalOrder.setContent(window.modalOrderTemplate);
  }
}
modalForm();

function openPartnersModal() {
  modalPartners.open();
}

function openFeedbackModal() {
  modalFeedback.open();
}

function openLetter(el) {
  modalLetter.open();
  var img = modalLetter.modalBox.querySelector("img");
  var link = modalLetter.modalBox.querySelector("a");
  if (img && link) {
    img.setAttribute("src", el.getAttribute("src-img"));
    link.setAttribute("href", el.getAttribute("src-link"));
  }
}

function openVideo() {
  modalVideo.open();
}

function openContact(id) {
  $("#" + id)
    .clone()
    .appendTo(modalContact.modalBox);
  modalContact.open();
}

function openDictionaryModal() {
  modalDictionary.open();
}

function openJoinLater(){
  modalJoinLater.open()
}

function openFreeModal() {
  modalFree.open();
}

function openOrderModal(licenseType) {
  orderData.type=licenseType
  calc(licenseType);
  modalOrder.open();
}

function openJoinModal(){
  modalJoin.open()
}
function openDemoModal() {
  modalDemo.open();
}

function openPriceModal() {
  modalPrice.open();

  document.querySelector('.form-modal__close').onclick = () => {
    let parrent = document.querySelector('.form-modal__close').closest('.tingle-modal');
    parrent.classList.remove('tingle-modal--visible');
  }
}

function openImageModal() {
  modalImage.open();
  modalForm();
}

//проверка заполнения формы
function form_check() {
  $(".form").addClass("form--success");
  alert("123");
}

if (niceSelectFlag) {
  $(".input-container--select").niceSelect();
}

function selectSetVal(selector) {
  $(selector + " select + .nice-select .option").on("click", function() {
    var optionVal = $(this).attr("data-value");

    if (optionVal != $(selector + " option[selected]").attr("value")) {
      $(selector + " select option[selected]").removeAttr("selected");
      $(selector + ' select option[value="' + optionVal + '"]').attr(
        "selected",
        true
      );
    }
  });
}

selectSetVal(".form");

function selectUpdateVacancyForm(form) {
  var work = " select#work + .nice-select";
  var direction = "select#train + .nice-select";
  var vacancy = "select#vac + .nice-select";
  $(direction).css({
    display: "none"
  });
  selectSetVal(form);
  $(form + work + " .option").on("click", function() {
    var optionVal = $(this).attr("data-value");
    if (optionVal != 0) {
      $("#vacancy__drop_zone").css({
        display: "none"
      });
      $(direction).css({
        display: "flex"
      });
      $(vacancy).css({
        display: "none"
      });
    } else {
      $("#vacancy__drop_zone").css({
        display: "flex"
      });
      $(direction).css({
        display: "none"
      });
      $(vacancy).css({
        display: "flex"
      });
    }
  });
}

selectUpdateVacancyForm(".form--work");

//drag-and-drop
function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  if (evt.target.files == null) {
    var files = evt.dataTransfer.files;
  } else {
    var files = evt.target.files;
  }

  var output = [];

  for (var i = 0, f; (f = files[i]); i++) {
    output.push("<li>", f.name, "</li>");
  }
  document.getElementById("input-container--file-name").style.display = "none";
  document.getElementById("input-container--file-list").innerHTML =
    "<ul>" + output.join("") + "</ul>";
  document.getElementById("input-container--file-list").style.display = "block";
  document
    .getElementById("vacancy__drop_zone")
    .classList.remove("input-container--file-ondrag");
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = "copy";
  document
    .getElementById("vacancy__drop_zone")
    .classList.add("input-container--file-ondrag");
}

if (document.getElementById("vacancy__drop_zone") != null) {
  var dropZone = document.getElementById("vacancy__drop_zone");
  dropZone.addEventListener("dragover", handleDragOver, false);
  dropZone.addEventListener("drop", handleFileSelect, false);
  dropZone.addEventListener("dragleave", rem_drag, false);
  document
    .getElementById("files")
    .addEventListener("change", handleFileSelect, false);
}

function rem_drag() {
  document
    .getElementById("vacancy__drop_zone")
    .classList.remove("input-container--file-ondrag");
}

//show-placeholder polifill

$("[type=tel]").focus(function() {
  $(this).mask("+7 (999) 999-99-99");
});

$("[type=tel]").blur(function() {
  if (this.value.replace(/[^\d]/g, "").length < 11) {
    $(this).mask();
  }
});

document.querySelectorAll("[placeholder]").forEach(function(el) {
  if (el.value !== "") {
    el.classList.remove("show-placeholder");
  }

  el.addEventListener("focus", function() {
    this.classList.add("show-placeholder");
  });
  el.addEventListener("blur", function() {
    if (this.value == "") {
      this.classList.remove("show-placeholder");
    }
  });
});

function svgReposition(tmp) {
  var gPosition = $("#" + tmp + " svg g g:first-child").offset().top;
  var svgPos = $("#" + tmp + " svg").offset().top;
  var wihdowHeight = $(window.top).height();
  var blockHeight = $("#" + tmp + "").height();

  var position;
  position =
    (wihdowHeight - blockHeight) / 2 - Math.abs(gPosition - svgPos) / 2;

  $("#" + tmp).css("top", position);
  console.log(
    "gPos: " + gPosition,
    "svgPos: " + svgPos,
    "wHei: " + wihdowHeight,
    "bHei: " + blockHeight,
    "pos: " + position
  );
}

//patch for Safari browser for menu, depends on viewport window height
function safariPatch() {
  let height = 0;
  function viewPort() {
    applyViewPort();
    window.addEventListener("scroll", function() {
      applyViewPort();
    });
    window.addEventListener("resize", function() {
      applyViewPort();
    });
    window.addEventListener("touchend", function() {
      applyViewPort();
    });
    window.addEventListener("touchmove", function(e) {
      e.preventDefault();
      applyViewPort();
    });

    document.querySelector("input").addEventListener("focus", function(e) {
      e.preventDefault();
      let newHeight = window.innerHeight;
      if (height === 0) {
        height = newHeight;
      }

      applyViewPort();
    });
    document.querySelector("input").addEventListener("blur", function() {
      applyViewPort();
    });
  }

  function applyViewPort() {
    const doc = document.documentElement;
    //возвращается не верная высота в сафари, из-за выплывающей клавиатуры
    if (window.innerHeight < height) {
      doc.style.setProperty("--app-height", `${height}px`);
    } else {
      doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    }
  }

  if (detectSafari) {
    viewPort();
  }
}

function closedFormOverlay() {
  const fotm = document.getElementById("teaser-form");
  fotm.classList.remove("form--success");
}

