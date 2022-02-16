"use strict";

const express = require("express");
const app = express();
const itemRoutes = require("./itemRoutes.js");

app.use(express.json());

app.use("/items", itemRoutes);

module.exports = app;