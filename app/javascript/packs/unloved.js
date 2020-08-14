wiggle('div.photo-container');

function wiggle(selector) {
    document.querySelectorAll(selector).forEach(function (el) {
        el.style.top = Math.random() * 10 - 5 + "px";
        el.style.transform = "rotate(" + (Math.random() * 30 - 15) + "deg)";
        el.style.zIndex = `${Math.floor(Math.random() * 5)}`;
    });
}