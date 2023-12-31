const express = require("express");
const route = express.Router();
const user = require("../controllers/userApi");

// Auth
route.post("/login", user.login);
route.post("/register", user.register);

// Crud
route.post("/generateqrcode", user.generateqrcode);
route.get("/getcustomers", user.getcustomers);
route.get("/getcustomer/:id", user.getcustomer);
route.put("/updatecustomer/:id", user.updatecustomer);
route.post("/dispatch_customer/:id", user.dispatchCustomer);
route.delete("/delete/:id", user.delete);

module.exports = route;
