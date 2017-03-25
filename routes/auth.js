var express= require("express");
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()

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

router.post("/logout",  function(req, res){
    req.logout();
    res.redirect('/');
  });

router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/profile',
  ensureLoggedIn,
  function(req, res){
      res.send(req.user);
});

module.exports = router;