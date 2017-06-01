var express = require("express");
  
var router = express.Router();


//controller
//GET / HTTP/1.1
//HEADERS
router.get("/", function(req, res){
    res.locals.pageTitle = "Home Page";
    
    res.render("index", {
        title: "Express App"
    });
})

router.get("/chat", function(req, res){
    res.locals.pageTitle = "Chat";
    
    res.render("chat", {
        title: "Chat"
    });
})


module.exports = router;