var express = require("express");

var router = express.Router();

router.get("/ejs", function(req, res) {
    res.render("index", {
        title: "EJS App",
        products: [{name: 'iphone', year: 2010}, {name: 'nexus', year: 2011}]
    });
})

module.exports = router;