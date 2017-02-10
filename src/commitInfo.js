const Future = require("ramda-fantasy").Future;

const exec = require("child_process").exec;

/**
 * [commitInfo description]
 * @return {Future<String>} Response containing hash, person who committed, date and commit message
 */
export default function commitInfo() {
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
