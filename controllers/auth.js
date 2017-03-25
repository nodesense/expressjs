var express= require("express");
var passport = require("passport");

var router = express();

router.get('/login',
  function(req, res){
    res.render('auth/login' ,  {csrfToken: req.csrfToken()});
  });
  
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {

      console.log("logged in now");

    res.redirect('/');
  });

router.get("/logout",  function(req, res){
    req.logout();
    res.redirect('/');
  });
 


module.exports = router;