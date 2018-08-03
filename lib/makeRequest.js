const { makePOSTRequest, makeGETRequest, getResponseBody }
    = require('../utils/request');

if (process.argv.length < 3) {
    console.log('ERROR: Require 2 arguments (httpMethod, urlPath)');
    process.exit(1);
}

const httpMethod = process.argv[2].toLowerCase();
const path = process.argv[3];
if (!['get', 'post'].includes(httpMethod)) {
    console.log('ERROR: First argument must be either "get" or "post"');
    process.exit(1);
}

function log(err, res) {
    if (err) {
        console.log('Got an error:', err);
    } else if (res) {
        console.log(res);
    }

}

if (httpMethod === 'get') {
    makeGETRequest(path, (err, res) => {
        log(err);
        getResponseBody(res, (err, body) => {
            log(err, body);
        });
    });
} else if (httpMethod === 'post') {
    makePOSTRequest(path, '', (err, res) => {
        log(err);
        getResponseBody(res, (err, body) => {
            log(err, body);
        });
    });
}
