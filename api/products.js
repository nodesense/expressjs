var express = require("express");
var mongoose = require('mongoose');

var Product = mongoose.model("Product");

var router = express.Router();
  
router.get("/products", function(req, res){

    Product.find(function(err, products){
         res.json(products);
    })
    
})

router.get("/products/:id", function(req, res){
    let productId = req.params.id;

    Product.findById(productId, function(err, product){
        if (err) {
            res.status(404).render("errors/not-found");
                return;
        }

        res.json(product)
    })
 
})
 

router.post("/products", function(req, res){

     var newProduct = new Product();
 
        
    newProduct.name = req.body.name;
    newProduct.year = req.body.year;

    newProduct.save(function (err, savedProduct){
            res.json(savedProduct);
    })

});

router.put("/products/:id", function(req, res){
     
        Product.findById(req.params.id, function(err, product){
            if (product) {
                product.name = req.body.name;
                product.year = req.body.year;

                product.save(function(error, saved_product){
                    console.log("save error ", error);

                    res.json(saved_product)
                })
            }
        }) 
     
})
 

router.delete("/products/:id", function(req, res){
    Product.remove({_id: req.params.id}, function(err, product){   
        res.statusCode(200);
    })
})

module.exports = router;