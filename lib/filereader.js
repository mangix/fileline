'use strict';

var readline = require("readline");
var fs = require("fs");

class FileReader {
    constructor(filePath) {
        //cached line data
        this.cache = [];

        this.end = false;

        var rl = this.rl = readline.createInterface({
            input: fs.createReadStream(filePath)
        });

        rl.on("line", line => {
            rl.pause();
            this.cache.push(line);
        });

        rl.on("close", ()=> {
            this.end = true;
        });
    }

    /**
     * return the next line
     * {
     *      lineString: ''
     * }
     * return null when no lines remains
     * */
    *next() {
        var self = this;
        var n = this._n();
        if (n !== undefined) {
            return n;
        } else {
            this.rl.resume();
            while (true) {
                var res = yield new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(self._n());
                    }, 0);
                });
                if (res !== undefined) {
                    return res;
                }
            }
        }

    }

    _n() {
        if (this.cache.length) {
            return this._line(this.cache.shift());
        } else {
            if (this.end) {
                return false;
            } else {
                return undefined;
            }
        }
    }


    _line(line) {
        return {
            content: line
        }

    }
}

module.exports = FileReader;