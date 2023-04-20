// ИСТОРИЯ - Табы в виде точек в сайдбаре
function hist_toggle(yid) {
    var contents = document.getElementsByClassName('content');
    var yearbuttons = document.getElementsByClassName('fix-pos-image__number');
    for (var i = 0; i < yearbuttons.length; i++) {
        yearbuttons[i].classList.remove('fix-pos-image__number--active');
    }
    var tmp = null;
    for (var i = 0; i < contents.length; i++) {
        if (contents[i].hasAttribute('style') == false) {
            contents[i].classList.add('content--fade-out');
            tmp = contents[i];
            yearbuttons[i].classList.remove('fix-pos-image__number--active');
            break;
        }
    }
    setTimeout(content_in, (400));

    function content_in() {
        tmp.classList.remove('content--fade-out');
        tmp.classList.remove('content--fade-in');
        tmp.setAttribute('style', 'display:none;');
        document.getElementsByClassName(yid)[0].removeAttribute('style');
        document.getElementsByClassName(yid)[0].classList.add('content--fade-in');
        document.getElementById(yid).classList.add('fix-pos-image__number--active');
    }
}

function hist_toggle__adaptive(yid) {
    var tmp = document.getElementsByClassName('content--active')[0];
    if (tmp) {
        tmp.classList.remove('content--active');
        tmp.classList.add('content--not-active');
    }
    if ((tmp != document.getElementById(yid)) || (!tmp)) {
        document.getElementById(yid).classList.remove('content--not-active');
        document.getElementById(yid).classList.add('content--active');
    }

    if (document.querySelector('.content--active')) {
        document.querySelector('.content--active').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
