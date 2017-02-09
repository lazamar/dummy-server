const express = require("express");

const app = express();

export default function () {
    app.get("/", (req, res) => {
        res.send("Hello Automation!");
    });

    app.listen(8080, () => {
        console.log("Example app listening on port 3000!");
    });
}
