var productsAndServicesSliderSelector = ".platform-slider--version";
var productsAndServicesSliderSelector2 = ".platform-slider--license";
var orderData ={}

$(document).ready(function() {
  
  var productsAndServicesSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
    infinite: false,
    arrows: true,
    dots: true,
    autoplay: false,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerMode: true,
          variableWidth: true
        }
      },
      {
        breakpoint: 576,
        settings: {
          centerMode: false,
          variableWidth: false
        }
      }
    ]
  };

  var resizeTimer;

  $(window)
    .on("resize", function() {
      var docWidth = $(window).width();

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if ($(window).width() >= 320 && $(window).width() <= 1200) {
          // $(".products-list").slick('unslick');

          toggleSlider(
            productsAndServicesSliderSelector,
            productsAndServicesSliderSettings,
            true
          );
        } else {
          toggleSlider(
            productsAndServicesSliderSelector,
            productsAndServicesSliderSettings,
            false
          );
        }
      }, 150);
    })
    .trigger("resize");
});

function priceTogler() {
  const tab = document.querySelectorAll(".price__item--toggle");
  tab.forEach(element => {
    element.onclick = function(event) {
      const _this = this;
      const activTab = this.getAttribute("select-tab"); //атрибут цели

      _this.classList.add("price__item--activ");
      activItem(_this, activTab);
      tabOpen(activTab, _this);
      tabChildOpen(activTab, _this);
      if ($(window).width() >= 320 && $(window).width() <= 1200) {
        $(".platform-slider--version").slick("reinit");
      }
    };
  });
}
function tabOpen(id, _this) {
  const activTab = document.getElementById(id);
  const licenseTab = document.getElementById("license");
  const cloudyTab = document.getElementById("cloudy");

  if (licenseTab === activTab) {
    cloudyTab.classList.remove("price-tab--activ");
  } else if (cloudyTab === activTab) {
    licenseTab.classList.remove("price-tab--activ");
  }
  activTab.classList.add("price-tab--activ");
}
function activItem(_this) {
  const tab = _this
    .closest(".price-inner")
    .querySelectorAll(".price__item--toggle");
  tab.forEach(element => {
    if (element !== _this) {
      element.classList.remove("price__item--activ");
    }
  });
}

function tabChildOpen(id) {
  const activTab = document.getElementById(id);
  const tabChildList = document.querySelectorAll("#license .price-tab");
  tabChildList.forEach(x => x.classList.remove("price-tab--activ"));
  activTab.classList.add("price-tab--activ");
}
priceTogler();

var data = {
  vender: {
    implementmonitoringmax: {
      price: "10000",
      quantity: "0"
    },
    implementmonitoringmin: {
      price: "10000",
      quantity: "0"
    },
    architecturemanagement: {
      price: "10000",
      quantity: "0"
    },
    usersupport: {
      price: "10000",
      quantity: "0"
    },
    technicalsupport: {
      price: "10000",
      quantity: "0"
    }
  },
  permanent: {
    platformmonk: {
      price: "10000",
      quantity: "0"
    },
    fmonmodule: {
      price: "65000",
      quantity: "0"
    },
    connectitmodule: {
      price: "27000",
      quantity: "0"
    }
  },
  temporary: {
    platformmonk: {
      price: "10000",
      quantity: "0"
    },
    fmonmodule: {
      price: "65000",
      quantity: "0"
    },
    connectitmodule: {
      price: "27000",
      quantity: "0"
    }
  }
};

function dataInput(el) {
  if (Number.parseInt === undefined) {
    Number.parseInt = window.parseInt;
  }
  var inputNumer = document.querySelectorAll(el);
  var step = 1;
  if (inputNumer) {
    inputNumer.forEach(element => {
      var parent = element;
      var buttonDecrement = parent.querySelector(".button--decrement");
      var buttonIncrement = parent.querySelector(".button--increment");
      var input = parent.querySelector("input");
      var val = input.value;
      var productId = input.getAttribute("product-id");
      var licenseType = input.getAttribute("product-type");
      var priceEmit = parent
        .closest("td")
        .nextElementSibling.querySelector(".table-price--emit");
        initPrice(productId, licenseType, priceEmit);
      buttonIncrement.addEventListener("click", function() {
        val = Number.parseInt(val);
        step = Number.parseInt(step);
        val = val + step;
        input.value = val;
        totalCalc.total(productId, licenseType, val, priceEmit);
        calc(licenseType);
      });
      buttonDecrement.addEventListener("click", function() {
        if (val > 0) {
          val = Number.parseInt(val);
          step = Number.parseInt(step);
          val = val - step;
          input.value = val;
          totalCalc.total(productId, licenseType, val, priceEmit);
          calc(licenseType);
        }
      });
    });
  }
}

function NavigatorProduct(id, licenseType,  quantity) {
  this.quantity = quantity;
  this.id = id;
  this.licenseType = licenseType;
}

NavigatorProduct.prototype.total = function(
  id,
  licenseType,
  quantity,
  priceEmit
) {
  var total;
    data[licenseType][id].quantity=quantity;
    total = data[licenseType][id].total = data[licenseType][id].price * quantity;
    if(quantity!==0){
      priceEmit.classList.add('active')
      priceEmit.textContent = total;
    }else{
      priceEmit.classList.remove('active')
    }
    
};
function calc(licenseType) {
  var patent = document.getElementById('total-' + licenseType)
  var countProduct = patent.querySelector('.total-sum__count')
  var sumProduct = patent.querySelector('.total-sum__sum')
  var totalSum = 0
  var totalQuantity= 0
  for (const key in data[licenseType]) {
    if(data[licenseType][key].total){
      totalQuantity += data[licenseType][key].quantity
      totalSum += data[licenseType][key].total
    }  
    
  }
  sumProduct.textContent=totalSum
  countProduct.textContent=totalQuantity
  orderData.total=totalSum
}
function initPrice(productId, licenseType, priceEmit) {
  priceEmit.textContent = data[licenseType][productId].price 
}

var totalCalc = new NavigatorProduct();

dataInput(".open-types__value-container");
