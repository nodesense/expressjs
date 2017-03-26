var express = require("express");
  
var router = express.Router();


//controller
//GET / HTTP/1.1
//HEADERS
router.get("/cart", function(req, res){
    res.locals.pageTitle = "Home Page";
    
   res.render("cart/list", {
        title: "Cart",
        items: req.session.shoppingList || []
    });
})

router.get("/cart/add/:id/:name", function(req, res){
    res.locals.pageTitle = "Chat";
    
    if (req.session && !req.session.shoppingList) {
        req.session.shoppingList = [];
    }

    req.session.shoppingList.push({
        id: req.params.id,
        name: req.params.name
    })


    console.log(req.session.shoppingList);

    res.redirect("/cart");
})


module.exports = router;