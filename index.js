const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/customeroute");

require("dotenv").config();
require("./dbConnections/connection");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

//server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is ready to serve on ${port}`);
});
