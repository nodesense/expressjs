var fs = require("fs");

fs.writeFile('log.txt', 'write to file',  function(err) {
   if (err) {
      return console.error(err);
   }
    
   fs.readFile('log.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("Asynchronous read: " + data.toString());
   });
});