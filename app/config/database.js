
var mongoose = require("mongoose");


require("../models/product");
require("../models/user");

var production = {
    "mongo": 'mongodb://localhost/productsdb'
}

var development = {
    "mongo": 'mongodb://localhost/productsdb'
}

var test = {
    "mongo": 'mongodb://localhost/testdb'
}

module.exports = function(app) {

    var config = development;

    if (process.env.NODE_ENV === "test"){
        config = test;
    }

    mongoose.connect(config.mongo);


}