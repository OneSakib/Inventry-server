const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connect with database sucessfully");
  })
  .catch((e) => {
    console.log(e);
  });
