import express from "express";
import commitInfo from "./commitInfo";

const app = express();
const PORT = 8080;

const requestSources = new Set();


export default function () {
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
}
