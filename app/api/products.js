var express = require("express");
var mongoose = require('mongoose');

var Product = mongoose.model("Product");

var router = express.Router();

/*
router.use(function(req, res, next){
    console.log("request ", req.headers["origin"]);

    let origin = req.headers["origin"];
    if (origin && origin.indexOf("9090") >= 0) {
        res.set("Access-Control-Allow-Origin", req.headers["origin"])
    }

    next();
})
*/


router.get("/products", function(req, res){

    Product.find(function(err, products){
        res.json(products);
 
    })
    
})

router.get("/jsonp/products/", function(req, res){

    Product.find(function(err, products){
        res.jsonp(products);
 
    })
    
})


router.get("/products/:id", function(req, res){
    let productId = req.params.id;

    Product.findById(productId, function(err, product){
        if (err) {
            res.status(404).json({result: false});
                return;
        }

        res.json(product)
    })
 
})
 
//CREATE new resource
//POST /api/products HTTP/1.1
//{{HEADERS}}
//
//{{data}}
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
        res.sendStatus(200);
    })
})

module.exports = router;