"use strict";

const request = require("supertest");

const app = require("../app");
let { itemsDb } = require("../fakeDb");

let testItem = { name: "testItem", price: "5.55" }

beforeEach(function () {
  itemsDb.push(testItem);
});

afterEach(function () {
  itemsDb.splice(0, itemsDb.length);
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

    const beforeCount = itemsDb.length;

    const resp = await request(app)
      .delete(`/items/${testItem.name}`);
    expect(resp.body).toEqual({ message: "Deleted." });
    expect(itemsDb.length).toEqual(beforeCount - 1);
  });
  it("Fails to delete", async function () {

    const beforeCount = itemsDb.length;

    const resp = await request(app)
      .delete(`/items/FAKE_NAME`);
    expect(resp.body).toEqual({ message: "Item not found. No deletion." });
    expect(itemsDb.length).toEqual(beforeCount);
  });
});