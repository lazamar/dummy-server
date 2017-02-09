const express = require("express");

const app = express();

const requestSources = new Set();

export default function () {
    app.get("/", (req, res) => {
        requestSources.add(req.ip);
        res.send(`Hello Automation! ${Array.from(requestSources.keys()).join()}`);
    });

    app.listen(8080, () => {
        console.log("Example app listening on port 3000!");
    });
}
