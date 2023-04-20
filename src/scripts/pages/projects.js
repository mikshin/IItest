var projectCounter = [];

window.addEventListener("load", function () {
    clearCounter();
    $('[id^="project-"]').each(function () {
        projectCounter.push({ selector: this.id, isCalled: false });
    });
});

$(window).on('scroll wheel DOMMouseScroll', function (e) {
    projectCounter.forEach(function (entry) {
        // console.log(entry);
        if (elementInView($('#' + entry.selector), false) && !entry.isCalled) {
            countNumbersSlider('#' + entry.selector);
            entry.isCalled = true;
        }
    })
});

//кнопки изменения отображения Список проектов

function project_view_change() {
    if ($('input[name=project-view-change]:checked').val() == "list") {
        $('.container').removeClass("list-counter--none");
        $('.article-list').addClass("article-list--column");
        $('.article-list .article--project').addClass("article--wide-project")
    }

    if ($('input[name=project-view-change]:checked').val() == "tiles") {
        $('.container').addClass("list-counter--none");
        $('.article-list').removeClass("article-list--column");
        $('.article-list .article--project').removeClass("article--wide-project");
    }
}
