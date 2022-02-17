"use strict";

const request = require("supertest");

const app = require("../app");
let {itemsDb} = require("../fakeDb");

let testItem = { name: "testItem", price: "5.55" }

beforeEach(function () {
  itemsDb.push(testItem);
});

afterEach(function() {
  itemsDb = [];
});

describe("POST /items", function () {
  it("Creates a new item", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "popsicle", price: 1.45
      });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      "added": {
        "name": "popsicle",
        "price": 1.45
      }
    });
  });
});

describe("DELETE /items/:name", function () {
  it("Deletes a single a item", async function () {

    console.log("db.itemsDb BEFORE", itemsDb);
    console.log("testItem", testItem);

    const resp = await request(app)
      .delete(`/items/${testItem.name}`);
    expect(resp.body).toEqual({ message: "Deleted." });

    console.log("db.itemsDb AFTER", itemsDb);

    expect(itemsDb.length).toEqual(0);
  });
});