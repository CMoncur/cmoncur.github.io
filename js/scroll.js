document.addEventListener("scroll", function () {
    var header = document.getElementById("header")

    if (window.scrollY > 0) {
        header.classList.add("scrolled")
        return
    }

    header.classList.remove("scrolled")
})
