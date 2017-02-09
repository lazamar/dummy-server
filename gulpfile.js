/* eslint-disable quote-props */
// List all available tasks

const organiser = require("gulp-organiser");
organiser.registerAll("./gulp-tasks", {
    "build": {
        src: "src/index.js",
        dest: "dest",
        config: {
            moduleName: "dummyServer",
        },
    },
});
