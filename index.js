const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/customeroute");

require("dotenv").config();
require("./db connections/connection");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(router);

//server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is ready to serve on ${port}`);
});
