var express = require("express");
var mongoose = require('mongoose');

//var Product = mongoose.model("Product");

var models = require("../models/seq");

var router = express.Router();
 
router.use(function (req, res, next) {
    console.log("product router middleware");
    next();
})

router.get("/products", function(req, res){

    /*Product.find(function(err, products){
        res.render("products/list", {
              "products": products
        });
    })*/


    models.Product.findAll().then(products => {
        res.render("products/list", {
              "products": products
        });  
    })
 
    
})

router.get("/products/view/:id", function(req, res){
    let productId = req.params.id;

    Product.findById(productId, function(err, product){
        if (err) {
            res.status(404).render("errors/not-found");
                return;
        }

        res.render("products/view", {
        product: product
    })

    })
 
})

router.get("/products/edit/:id", function(req, res){
     let productId = req.params.id;
 
     Product.findById(productId, function(err, product){
         if (product) {
            res.render("products/edit", 
                {product: product,
                csrfToken: req.csrfToken()
            })
         } else {
             res.status(404).render("errors/not-found");
         }
     })

    
});


router.post("/products/save", function(req, res){
    if (req.body.id) {
        let productId = req.body.id;
 
        Product.findById(productId, function(err, product){
            if (product) {
                product.name = req.body.name;
                product.year = req.body.year;

                product.save(function(error, saved_product){
                    console.log("save error ", error);

                    res.redirect("/products/edit/" + product.id);
                })
            }
        })
         
    
        //res.render("products/edit", {product: product});

        
    } else {
        
        var newProduct = new Product();
 
        
        newProduct.name = req.body.name;
        newProduct.year = req.body.year;

        newProduct.save(function (err, savedProduct){
             res.redirect("/products/edit/" + savedProduct.id);
        })
         
       
    }
    //res.send(req.body);
})

router.get("/products/create", function(req, res){
    res.render("products/edit", {
        product: {},
        csrfToken: req.csrfToken()
    });
})

router.get("/products/delete/:id", function(req, res){
    Product.remove({_id: req.params.id}, function(err, product){   
        res.redirect("/products");
    })
})

module.exports = router;