const mongoose = require("mongoose");

const customerModel = new mongoose.Schema({
  name: String,
  dateReceived: String,
  dateDispatched: String,
  quantityReceived: Number,
  quantityDispatched: Number,
  pendingItems: Number,
  status: Boolean,
});

const CustomerModel = mongoose.model("Customer", customerModel);

module.exports = CustomerModel;
