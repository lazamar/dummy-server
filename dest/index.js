(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

const express = require("express");

const app = express();

var server = function () {
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.listen(3000, () => {
        console.log("Example app listening on port 3000!");
    });
};

server();

})));
//# sourceMappingURL=index.js.map
