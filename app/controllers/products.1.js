var express = require("express");

var router = express.Router();

let productsData = [
    {
        id: 1,
        name: 'iphone',
        year: 2010
    },

    {
        id: 2,
        name: 'Moto',
        year: 2015
    }
    
]

router.use(function (req, res, next) {
    console.log("product router middleware");
    next();
})

router.get("/products", function(req, res){
    res.render("products/list", {
        "products": productsData
    });
})

router.get("/products/view/:id", function(req, res){
    let productId = req.params.id;
    
    /*
    let results = productsData.filter (function(product){
        return product.id == productId;
    })
    */

    //ES6, FAT ARROW =>

    let results = productsData
        .filter (product => product.id == productId)

    /*
    if (results.length == 0) {
        res.status(404).render("errors/not-found");
        return;
    }*/

    res.render("products/view", {
        product: results[0]
    })
})

router.get("/products/edit/:id", function(req, res){
     let productId = req.params.id;

    let results = productsData
        .filter (product => product.id == productId)
    
    let product = results[0];

    res.render("products/edit", {product: product})
});


router.post("/products/save", function(req, res){
    if (req.body.id) {
      let productId = req.body.id;

        let results = productsData
            .filter (product => product.id == productId)
        
        let product = results[0];
        product.name = req.body.name;
        product.year = req.body.year;
    
        //res.render("products/edit", {product: product});

        res.redirect("/products/edit/" + product.id);
    } else {
        var newProduct = {};
        newProduct.id = Math.ceil(Math.random() * 1000);
        newProduct.name = req.body.name;
        newProduct.year = req.body.year;

        productsData.push(newProduct);
        res.redirect("/products/edit/" + newProduct.id);
    }
    //res.send(req.body);
})

router.get("/products/create", function(req, res){
    res.render("products/edit", {
        product: {}
    });
})

module.exports = router;