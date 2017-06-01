const ejs = require("ejs");
const path = require("path");

module.exports = function(app) {

    app.set('view engine', 'html');
    app.engine('html', ejs.renderFile);
    //set views directory
    app.set('views', path.join(__dirname, '../views'));

     
}
