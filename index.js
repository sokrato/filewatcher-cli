const fs = require('fs')

fs.watch('/tmp/logs', (eventType, filename) => {
  if (filename) {
    console.log(filename);
  }
});

exports.greet = function() {
    console.log('hello world!');
}

