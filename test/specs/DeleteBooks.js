const request = require("supertest");
const expect = require("chai").expect;
const login = require("../../data/login.json");
const base = require("../../data/base.json");
const Token = require("./Login")

let auth = null;
let userId = "467b8e26-3ffb-463b-82a4-3df0b92444af";
let isbn = "9781449365035";

describe("DELETE Books", () => {
  beforeEach(async function() {
    const res = await Token(login);
    auth = await res.body.token;
    console.log(auth);
  }),
  it("Delete List of book", async () => {
    const response = request(base.baseURL).delete(`/BookStore/v1/Books?UserId=${userId}`)
                                        .set("Authorization", `Bearer ${auth}`);
    console.log("status code is = " + (await response).status);
    console.log("Response Body = ");
    console.log((await response).body);
    expect((await response).status).to.equal(204);
    //expect((await response).body).to.null;
    console.log(response.body);
  });
});