const request = require("supertest");
const expect = require("chai").expect;
const login = require("../../data/login.json");
const base = require("../../data/base.json");

async function getUserToken(login){
    const response = request(base.baseURL).post("/Account/v1/GenerateToken").send(login);
    return response
  }

module.exports = getUserToken