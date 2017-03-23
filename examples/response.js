var express= require("express");

var router = express.Router();

router.get("/response/send/html", function(req, res) {
    //set content-type to text/html
    res.send("hello");
})


router.get("/response/write", function(req, res) {
    //chunk of data stream
    res.write("<h1>hello</h1>");
    res.write("<h1>next line</h1>");
    //Must end
    res.end()
})

router.get("/response/send/json", function(req, res) {
    //set content-type to application/json
    res.send({name: "krish"});
})

router.get("/response/send/status", function(req, res) {
    //set content-type to application/json
   res.status(404).send('Sorry, we cannot find that!');
})

router.get("/response/send/send-status", function(req, res) {
    //status with fixed/standard http reason
   res.sendStatus(403); //Forbidden
})



router.get("/response/to/there", function(req, res){
    res.send("reached");
})

router.get("/response/redirect", function(req, res){
    //Send status 302
    //& Set Location header to new url
    res.redirect("/response/to/there");
})




module.exports = router;