var FileReader = require("./lib/filereader");

exports.read = function (filePath) {
    return new FileReader(filePath);
};