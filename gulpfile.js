const gulp = require("gulp")
const elm  = require("gulp-elm")

// Elm stuff
gulp.task("elm-init", elm.init)

gulp.task("elm-compile", [ "elm-init" ], () => {
    gulp.src("src/Main.elm")
        .pipe(elm())
        .pipe(gulp.dest("dist/"))
})

// Gulp Build Processes
gulp.task("build", [
    "elm-compile"
])
