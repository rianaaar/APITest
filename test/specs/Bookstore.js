const request = require("supertest");
const expect = require("chai").expect;
const login = require("../../data/login.json");
const base = require("../../data/base.json");
const Token = require("../specs/Login")

let auth = null;
let userId = "467b8e26-3ffb-463b-82a4-3df0b92444af";
let isbn = "9781449365035";

describe("POST Bookstore", () => {
  beforeEach(async function() {
    const res = await Token(login);
    //console.log(res);
    auth = await res.body.token;
    //console.log(auth);
  }),
  it("Add List of book use valid userId", async () => {
    const response = request(base.baseURL).post("/BookStore/v1/Books")
                                        .send({
                                            "userId": userId,
                                            "collectionOfIsbns": [
                                              {
                                                "isbn": isbn
                                              }
                                            ]
                                        }).set("Authorization", `Bearer ${auth}`);
    console.log("status code is = " + (await response).status);
    console.log("Response Body = ");
    console.log((await response).body);
    expect((await response).status).to.equal(201);
    expect((await response).body.books[0].isbn).to.equal(isbn);
    //console.log(response.body.books[0].isbn);
  });
  it("Add List of book use invalid userid", async () => {
    const response = request(base.baseURL).post("/BookStore/v1/Books")
                                        .send({
                                            "userId": "11111",
                                            "collectionOfIsbns": [
                                              {
                                                "isbn": isbn
                                              }
                                            ]
                                        }).set("Authorization", `Bearer ${auth}`);
    console.log("status code is = " + (await response).status);
    console.log("Response Body = ");
    console.log((await response).body);
    expect((await response).status).to.equal(401);
    expect((await response).body.message).to.equal("User Id not correct!");
  });
  it("Add List of book that already exist", async () => {
    const response = request(base.baseURL).post("/BookStore/v1/Books")
                                        .send({
                                            "userId": userId,
                                            "collectionOfIsbns": [
                                              {
                                                "isbn": isbn
                                              }
                                            ]
                                        }).set("Authorization", `Bearer ${auth}`);
    console.log("status code is = " + (await response).status);
    console.log("Response Body = ");
    console.log((await response).body);
    expect((await response).status).to.equal(400);
    expect((await response).body.message).to.equal("ISBN already present in the User's Collection!");
    //console.log(response.body.isbn);
  });
  it("Add List of book use invalid ISBN", async () => {
    const response = request(base.baseURL).post("/BookStore/v1/Books")
                                        .send({
                                            "userId": userId,
                                            "collectionOfIsbns": [
                                              {
                                                "isbn": 12345
                                              }
                                            ]
                                        }).set("Authorization", `Bearer ${auth}`);
    console.log("status code is = " + (await response).status);
    console.log("Response Body = ");
    console.log((await response).body);
    expect((await response).status).to.equal(400);
    expect((await response).body.message).to.equal("ISBN supplied is not available in Books Collection!");
  });
});