var express = require("express");

var router = express.Router();

router.get("/headers/set", function(req, res){
        res.set("X-Custom", "TOEKN1232232" );
        res.send("set");
})

router.get("/headers/remove", function(req, res){
        res.removeHeader('X-Powered-By');
        res.send("removed");
})

router.get("/headers/get", function(req, res){
    console.log(req.headers['host']); 

    res.send(req.headers['user-agent'])

})

module.exports = router;


  
