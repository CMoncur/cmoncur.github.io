window.addEventListener("DOMContentLoaded", function () {
    // Elements of Note
    var header = document.getElementById("header")
    var hamburger = document.getElementById("hamburger")
    var hamburgerClose = document.getElementById("hamburger-close")

    // Scroll Event
    document.addEventListener("scroll", function () {
        if (window.scrollY > 0) {
            header.classList.add("scrolled")
            return
        }

        header.classList.remove("scrolled")
    })

    // Menu Events
    hamburger.addEventListener("click", function () {
        header.classList.add("expanded")
    })

    hamburgerClose.addEventListener("click", function () {
        header.classList.remove("expanded")
    })
})
