// turn each individual character in to spans;
const makeSpans = selector => {
    const [...elements] = document.querySelectorAll(selector)
    const openWord = '<span class="word-block">';
    const endSpan = '</span>';

    return elements.map(element => {

        const text = element.innerText.split('');
        const spans = text
            .map((character, index) => {
                const charSpan = '<span class="letter">' + character + '</span>';

                if (index == 0) {
                    // first word
                    return openWord + charSpan;
                } else if(index == text.length-1) {
                    // last word
                    return charSpan + endSpan;
                } else if (character == ' ') {
                    return endSpan + '<span class="letter wide-space">' + charSpan + '</span>' + openWord;
                } else {
                    return charSpan;
                }
            })
            .join('');
        return element.innerHTML = spans;
    })
}

// make spans from title
makeSpans('h1');
makeSpans('.navBar a');
makeSpans('section#camera #controls button');
makeSpans('section#intro-text button');
makeSpans('section#intro-text p');
makeSpans('.unloved.top-text p');

wiggle('h1');
wiggle('section#intro-text .get-started, section#intro-text p');
wiggle('.unloved.top-text p');


function wiggle(selector) {
    document.querySelectorAll(selector).forEach(function (element) {
        element.childNodes.forEach(function (word) {
            word.childNodes.forEach(function (char) {
                char.style.top = Math.random() * 10 - 5 + "px";
                char.style.transform = "rotate(" + (Math.random() * 50 - 25) + "deg)";
            });
        });
    });
} 