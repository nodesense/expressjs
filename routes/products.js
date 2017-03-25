var express = require('express'),
   
    mongoose = require('mongoose'),

    util = require("util"); 

 
var Product = mongoose.model('Product');

module.exports = (function() {
    'use strict';
    var router = express.Router();


 
    
    router.get('/products/new', function(req, res) {
        res.render('products/edit');
    });

    router.get('/products/edit/:id', function(req, res) {

        Product.findById(req.params.id, function (err, product){
            if (!product) return res.sendStatus(404); //not found

            console.log(product);
            res.locals.errors = [];

            res.locals.product = product;
            res.render('products/edit',  {csrfToken: req.csrfToken()});
        });
    });

    router.post('/products/save',  function(req, res) {
        if (!req.body) return res.sendStatus(400); //bad request
        
        Product.findById(req.body.id, function (err, product){
            if (err) return res.sendStatus(500); //something gone bad

            if (!product) {
                product = new Product();
                product.created = new Date(); //optional, set default in schema
            }

            product.name = req.body.name;
            product.updated = new Date();
            console.log("name is ", req.body.name);

            product.save(function (err, saved_product) {
                if (!err) return res.redirect('/products/edit/' + saved_product._id.toString());
                
                console.log("product saved");

                res.locals.errors = err.errors;
                res.locals.product = product;
                res.render('products/edit',  {csrfToken: req.csrfToken()});
            });
        });
    });

    router.get('/products', function(req, res) {
        Product.find(function(err, products) {
            if (err) return res.sendStatus(500); //something gone bad
            console.log("totla ", products.length);
            res.locals.products = products;
            res.render('products/list',  {csrfToken: req.csrfToken()});    
        });
    });

    router.get('/products/view/:id', function(req, res){
         Product.findById(req.params.id, function (e, product){
            if (!product) return res.sendStatus(404); //not found
            res.locals.product = product;
            res.render('products/view',  {csrfToken: req.csrfToken()});
        });
    });
 
    return router;    
})();