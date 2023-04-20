document.querySelectorAll(".tab__img-content").forEach(function(item){
    item.addEventListener('click', function (event) {
        var target = event.target.getAttribute('src');
        modalImageTemplate = [`<img src="${target}">`].join("\r\n");
        openImageModal();
    })
});

function openTab(evt, tabName) {
    var tabs = document.getElementsByClassName("tabs__tab");
    var tablinks = document.getElementsByClassName("tabs__button");

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("tab--active");
    }
    document.getElementById(tabName).classList.add("tab--active");

    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("tabs__button--active");
    }
    evt.currentTarget.classList.add("tabs__button--active");

}
