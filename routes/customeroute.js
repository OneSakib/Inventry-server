const express = require("express");
const route = express.Router();
const user = require("../controllers/userApi");
const path = require("path");

// views
route.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../template/index.html"));
});
// Auth
route.post("/api/login", user.login);
route.post("/api/register", user.register);

// Crud
route.post("/api/generateqrcode", user.generateqrcode);
route.get("/api/getcustomers", user.getcustomers);
route.get("/api/getcustomer/:id", user.getcustomer);
route.put("/api/updatecustomer/:id", user.updatecustomer);
route.post("/api/dispatch_customer/:id", user.dispatchCustomer);
route.delete("/api/delete/:id", user.delete);

module.exports = route;
