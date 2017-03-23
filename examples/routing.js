var express = require("express")

var router = express.Router();
 
// a middleware function with no mount path. 
//This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})


router.all("/router/all", function(req, res, next){
    res.write("<h1>From all</h1>")
    next();
})

router.get("/router/all", function(req, res) {
    res.write("<h2>From get all</h2>");
    res.end();
})

//matches acd or abcd
router.get('/router/pattern/ab?cd', function (req, res) {
  res.send('ab?cd')
})

//matches abcd, abbcd, abbbbbbcd etc
router.get('/router/pattern/ab+cd', function (req, res) {
  res.send('ab+cd')
})

//must start with ab and end with cd
//abcd, abfd123cd
router.get('/router/pattern/ab*cd', function (req, res) {
  res.send('ab*cd')
})

router.get('/router/product/:id/reviews/:reviewId', function (req, res) {
  res.send(req.params)
})

function auth(req, res, next) {
    if (req.user)
        next();

    res.sendStatus(403);
}

router.get("/router/secured", auth, function(req, res) {
    res.send("have access");
})

module.exports = router;


//about.js
var express = require('express')
var router = express.Router()
 
router.get('/about', function (req, res) {
  res.send('Node.js consultancy')
})

router.get('/contact', function (req, res) {
  res.send('anywhere in the web')
})

module.exports = router

 