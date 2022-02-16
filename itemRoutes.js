"use strict";

const express = require("express");
const {itemsDb} = require("./fakeDb.js");
const router = express.Router();


router.get("/", function(req, res){



    return res.json({itemsDb});
});

router.post("/", function(req, res){

    // TODO: We might trust the input too much. Perhaps destructure and recreate?

//     {name: "popsicle", price: 1.45} =>
//   {added: {name: "popsicle", price: 1.45}}

    const newItem = req.body;
    itemsDb.push(newItem);

    return res.json({added: newItem});

});

router.get("/:name", function(req, res){

});

router.patch("/:name", function(req, res){

});

router.delete("/:name", function(req, res){

});


module.exports = router;