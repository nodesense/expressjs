
var session = require('express-session');

const MongoStore = require('connect-mongo')(session);

module.exports = function(app) {
    app.use(session({
        secret: 'fadsyg234lkjifasfds', saveUninitialized: true, 
        resave: true,  
        secure: true,
        store: new MongoStore({ url: 'mongodb://localhost/sessions' })
    }));
}

