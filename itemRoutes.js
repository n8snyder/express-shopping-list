"use strict";

const express = require("express");
const { itemsDb } = require("./fakeDb.js");
const router = new express.Router();

console.log("get /items");
router.get("/", function (req, res) {
    console.log("requesting get /items")
    return res.json({ items: itemsDb });
});

console.log("post /items");
router.post("/", function (req, res) {

    // TODO: We might trust the input too much. Perhaps destructure and recreate?

    //     {name: "popsicle", price: 1.45} =>
    //   {added: {name: "popsicle", price: 1.45}}

    const newItem = req.body;
    itemsDb.push(newItem);
    return res.status(201).json({ added: newItem });

});

router.get("/:name", function (req, res) {

});

router.patch("/:name", function (req, res) {

});

router.delete("/:name", function (req, res) {

    const itemName = req.params.name;

    for (let idx in itemsDb){
        if(itemsDb[idx].name === itemName){
            itemsDb.splice(idx,1);
            return res.json({message: "Deleted."});
        }
    }
    return res.json({message: "Item not found. No deletion."});
});


module.exports = router;