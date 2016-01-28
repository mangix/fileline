var FileLine = require("../index");
var path = require("path");
var co = require("co");

co(function*() {


    var fr = FileLine.read(path.join(__dirname, './test.log'));
    var line;
    while (line = (yield fr.next())) {
        console.log(line);
    }

}).catch(e => {
    console.log(e);
});