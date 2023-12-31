const CustomerModel = require("../models/customerschema");
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
function getToday() {
  let dd = new Date().getDate();
  let mm = new Date().getMonth() + 1;
  let yyyy = new Date().getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

exports.generateqrcode = async (req, res) => {
  try {
    const { name, date, quantity } = req.body;
    const customer = new CustomerModel({
      name: name,
      dateReceived: date,
      quantityReceived: quantity,
      pendingItems: quantity,
      status: false,
    });
    await customer.save();
    return res.json(customer);
  } catch (error) {
    console.log(error);
  }
};

exports.getcustomers = async (req, res) => {
  try {
    const alldata = await CustomerModel.find();
    return res.json(alldata);
  } catch (error) {
    console.log(error);
  }
};
exports.getcustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await CustomerModel.findOne({
      _id: id,
    });
    return res.json(employee);
  } catch (error) {
    console.log(error);
  }
};
exports.updatecustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, quantity } = req.body;
    const body = {
      name: name,
      dateReceived: date,
      quantityReceived: quantity,
      pendingItems: quantity,
    };
    const customer = await CustomerModel.findByIdAndUpdate(id, body);
    return res.json(customer);
  } catch (error) {
    console.log(error);
  }
};
exports.dispatchCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerModel.findOne({ _id: id });
    if (!customer) {
      res.status(400);
      return res.send("Wrong qr code!");
    } else {
      const newData = {
        dateDispatched: getToday(),
        quantityDispatched: customer.quantityDispatched
          ? customer.quantityDispatched + 1
          : 1,
        pendingItems: customer.pendingItems - 1,
      };
      const customer_res = await CustomerModel.updateOne({ _id: id }, newData);
      return res.json(customer_res);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  //validation
  if (!(email && password)) {
    res.status(400).send("Put all the Field");
  }
  //find user in db
  const user = await UserModel.findOne({ email });
  // match password
  const checkpassword = await bcrypt.compare(password, user.password);
  console.log(":CLAED", checkpassword);
  if (user && checkpassword) {
    console.log("CLAL----");
    const token = jwt.sign(
      {
        id: user._id,
      },
      "danish",
      {
        expiresIn: "24h",
      }
    );
    user.token = token;
    // send token to cookie-parser
    // res.cookie("token", token, { expires: new Date(Date.now()) }).json({
    //   success: true,
    // });
    return res.send(user);
  } else {
    res.status(400);
    return res.send({ res: "Wrong user email and password!" });
  }
};

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    return res.status(400).send("Please fill all the details first.");
  }
  //checking whether user is already present or not
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }
  const encryptPassword = await bcrypt.hash(password, 10);
  //saving user into db
  const newUser = new UserModel({
    name: name,
    email: email,
    password: encryptPassword,
  });
  // Generating jwt token
  const token = await jwt.sign(
    {
      id: newUser._id,
      email,
    },
    "danish",
    { expiresIn: "24h" }
  );
  newUser.token = token;
  newUser.save();
  res.status(200).send("User Successfully Login!");
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await CustomerModel.findOne({
      _id: id,
    });
    // Employee does not exist
    if (!employee) {
      return next();
    }
    await CustomerModel.findByIdAndDelete({
      _id: id,
    });

    return res.json(employee);
  } catch (error) {
    next(error);
  }
};
