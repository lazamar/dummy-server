// ============================================================================
// Transpile ES7 react code into ES5. Includes support for async await.
// ============================================================================
const gulp = require("gulp");
const path = require("path");
const buffer = require("vinyl-buffer");
const flatmap = require("gulp-flatmap");
const rollup = require("rollup-stream");
const source = require("vinyl-source-stream");
const sourcemaps = require("gulp-sourcemaps");
const organiser = require("gulp-organiser");
const rename = require("gulp-rename");
const { curry } = require("lodash/fp");

const DEFAULT_CONFIG = {
    sourceMap: true,
  // Treat these imports as external dependencies and
  // load them from the given paths
    external: [],
  // Let's use UMD format as default so we can import it from anywhere
    format: "umd",
};

const doTranspilation = curry((task, stream, file) => {
    const fileName = path.parse(file.path).base;
    const config = Object.assign({ entry: file.path }, DEFAULT_CONFIG, task.config);
    const outputName = task.rename || fileName;

    return rollup(config)
        // point to the entry file.
        .pipe(source(fileName))
        // buffer the output. most gulp plugins, including gulp-sourcemaps, don't support streams.
        .pipe(buffer())
        // tell gulp-sourcemaps to load the inline sourcemap produced by rollup-stream.
        .pipe(sourcemaps.init({ loadMaps: true }))
        // Further modify the file here if needed
        .pipe(rename(outputName))
        // write the sourcemap alongside the output file.
        .pipe(sourcemaps.write("."));
});

// Path resolution for these modules must be included in the pages' require.config
module.exports = organiser.register((task) => {
    gulp.task(task.name, () => {
        return gulp.src(task.src)
    .pipe(flatmap(doTranspilation(task))) // call doTranspilation for each file
    .pipe(gulp.dest(task.dest));
    });
});
