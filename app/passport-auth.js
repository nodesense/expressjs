var mongoose = require("mongoose");
var passport = require('passport');
var passportLocal =  require('passport-local');


var User = mongoose.model("User");

module.exports = function(app) {
    console.log("app passed to passport auth");
    app.use(passport.initialize());
    app.use(passport.session());


        var Strategy = require('passport-local').Strategy;

        passport.use(new Strategy(
        function(username, password, cb) {
                console.log(username, password);

                User.findOne({username: username}, 
                function(err, user){
                    //if user not present
                    if (err) {
                        cb(err, false);
                        return;
                    }

                    if (user.password != password) {
                        cb("password not matched", false);
                        return;
                    }

                    console.log("valid user");
                    cb(null, user);

                })

        })
        )


        var GitHubStrategy = require('passport-github').Strategy;

        passport.use(new GitHubStrategy({
            clientID: "46e04bcf31b15c5f5c17",
            clientSecret: "e3f2362e2a4e044007eaa1fcaf195f4de89fd1c9",
            callbackURL: "http://localhost:8080/auth/github/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            console.log("profile ", profile);
            
            var user = {
                id:   profile.id,
                scheme: 'github'
            }
            return cb(null, user);
        }
        ));

        passport.serializeUser(function(user, cb) {
            console.log("serializeUser")
            cb(null, user);
            //cb(null, user.username);
        });

        passport.deserializeUser(function(user, cb) {
        console.log("deserializeUser")



var Strategy = require('passport-local').Strategy;

passport.use(new Strategy(
  function(username, password, cb) {
        console.log(username, password);

        User.findOne({username: username}, 
           function(err, user){
               //if user not present
            if (err) {
                cb(err, false);
                return;
            }

            if (user.password != password) {
                cb("password not matched", false);
                return;
            }

            console.log("valid user");
            cb(null, user);

        })

  })
)

passport.serializeUser(function(user, cb) {
    console.log("serializeUser")
  cb(null, user.username);
});

passport.deserializeUser(function(username, cb) {
 console.log("deserializeUser")

  User.findOne({'username':username}, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
        /*
        User.findOne({'username':username}, function (err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
        */

        cb(null, user);

        });
}