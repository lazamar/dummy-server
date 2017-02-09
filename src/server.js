const express = require("express");

const app = express();

const requestSources = new Set();

export default function () {
    app.get("/", (req, res) => {
        requestSources.add(req.query.message);
        res.send(`Hello Automation! Are you working? ${Array.from(requestSources.keys()).join()}`);
    });

    app.listen(8080, () => {
        console.log("Example app listening on port 3000!");
    });
}
