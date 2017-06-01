var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  year: {type: Number}
}, { collection: 'products' });

//minimum 3 letter title
ProductSchema.path('name').validate(function (value) {
  return value && value.length >= 3;
}, 'name should be minimum of 3 letters');

mongoose.model('Product', ProductSchema)