const header = document.querySelector("header");

window.onscroll = () => {
    if(window.pageYOffset > header.offsetTop) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
}