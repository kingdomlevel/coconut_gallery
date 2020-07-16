// turn each individual character in to spans;
const makeSpans = selector => {
    const [...elements] = document.querySelectorAll(selector)
    return elements.map(element => {
        const text = element.innerText.split('');
        const spans = text
            .map(character => '<span>' + character + '</span>')
            .join('');
        return element.innerHTML = spans;
    })
}

// make spans from title
makeSpans('header h1');

document.querySelectorAll("header h1").forEach(function (element) {
    element.childNodes.forEach(function (char) {
        char.style.top = Math.random() * 10 - 5 + "px";
        char.style.transform = "rotate(" + (Math.random() * 50 - 25) + "deg)";
    });
});