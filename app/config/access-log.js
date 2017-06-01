var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
var rfs = require('rotating-file-stream')

const LOG_DIR = "/Users/krish/lab/expressjs/log";

//const LOG_DIR = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(LOG_DIR) || fs.mkdirSync(LOG_DIR)

// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: LOG_DIR
})

// setup the logger


module.exports = function(app) {
    const logger = morgan('combined', {stream: accessLogStream});
    app.use(logger);

    //for development mode only
    //FIXME: based on test/developmenet mode
    app.use(morgan('dev'))
}

/*
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

*/

