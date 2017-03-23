var express = require('express')
var router = express.Router()


// define the home page route
router.get('/cookies/set', function (req, res) {
    console.log(req.query.name);
  res.cookie(req.query.name,
             req.query.value, 
             { maxAge: parseInt(req.query.expires), httpOnly: true });
  res.send(req.query.name + " cookie set");
})

router.get('/cookies/get', function (req, res) {
    console.log(req.cookies);

  if (req.cookies[req.query.name]) {
      res.send("cookie is " + req.cookies[req.query.name]);
      return;
  }
  
  res.send('cookie ' + req.query.name + ' not found')
})

router.get('/cookies/remove', function (req, res) {
  res.clearCookie(req.query.name);
  res.send("Cookie " + req.query.name + " removed");
})


router.get('/cookies/reset', function (req, res) {
  for (var cookieName in req.cookies) {
    console.log("cleaning cookie ", cookieName);
    res.clearCookie(cookieName);    
  }
  res.send('removed all cookies')
})

router.get("/cookies/signed", function(req, res){
  res.cookie('session', '12345456675', {signed: true})
  res.send("Signed cookie");
   res.send("Signed cookie extra");
})

router.get("/cookies/read-signed", function(req, res){
   res.send("Signed cookie " + req.signedCookies['session']);
})

module.exports = router
