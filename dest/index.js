(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('express')) :
	typeof define === 'function' && define.amd ? define(['express'], factory) :
	(factory(global.express));
}(this, (function (express) { 'use strict';

express = 'default' in express ? express['default'] : express;

const Future = require("ramda-fantasy").Future;

const exec = require("child_process").exec;

/**
 * [commitInfo description]
 * @return {Future<String>} Response containing hash, person who committed, date and commit message
 */
function commitInfo() {
    return new Future((reject, resolve) => {
      // Go to current directory, get the git log and return the first 6 lines
        exec(
        `cd ${__dirname} && git log | head -n 6`,
        (err, stdout, stderr) => {
            const rawOutput = stderr
            ? (`${stdout}\n\nERROR:\n${stderr}`)
            : stdout;

            const output = rawOutput.replace(/\n/g, "<br>");

            resolve(output);
            if (err) {
                reject(err);
            }
        });
    });
}

const app = express();
const PORT = 8080;

const requestSources = new Set();


var server = function () {
    app.get("/", (req, res) => {
        requestSources.add(req.query.message);
        res.send(`Hello Automation! Are you working? ${Array.from(requestSources.keys()).join()}`);
    });

    app.get("/version", (req, res) => {
        commitInfo().fork(out => res.send(out), out => res.send(out));
    });

    app.listen(PORT, () => {
        console.log("Example app listening on port PORT!");
    });
};

server();

})));
//# sourceMappingURL=index.js.map
