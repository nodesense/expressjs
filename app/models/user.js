var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: { type: String  },
  password: { type: String  }
}, { collection: 'users' });

//minimum 3 letter title
UserSchema.path('username').validate(function (value) {
  return value && value.length >= 3;
}, 'name should be minimum of 3 letters');

UserSchema.path('password').validate(function (value) {
  return value && value.length >= 4;
}, 'password should be minimum of 4 letters');


mongoose.model('User', UserSchema)