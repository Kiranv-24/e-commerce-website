const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
// const categoryRouter = require('./routes/category');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Router
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");

// Mount the category router
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);

// Connect to MongoDB
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection is ready....");

    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
