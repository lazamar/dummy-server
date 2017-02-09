(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

const express = require("express");

const app = express();

const requestSources = new Set();

var server = function () {
    app.get("/", (req, res) => {
        requestSources.add(req.query.message);
        res.send(`Hello Automation! ${Array.from(requestSources.keys()).join()}`);
    });

    app.listen(8080, () => {
        console.log("Example app listening on port 3000!");
    });
};

server();

})));
//# sourceMappingURL=index.js.map
