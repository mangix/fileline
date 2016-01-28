Read File Line By Line In SYNC Mode


```javascript

var co = require("co");
var FileLine = require("fileline");

co(function*() {

    var fr = FileLine.read(path.join(__dirname, './test.log'));
    var line;
    while (line = (yield fr.next())) {
        console.log(line);
    }

}).catch(e => {
    console.log(e);
});

```