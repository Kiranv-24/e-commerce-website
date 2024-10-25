const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authJwt = require("./helper/jwt");

dotenv.config();

const app = express();

// Middleware setup
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(express.json());
app.use(authJwt());  // JWT authentication middleware

// Router imports
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const userRouter = require("./routes/user");

// Mounting routers
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);

// Error Handling Middleware for Unauthorized Errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Invalid token" });
  }
  next(err);
});

// MongoDB connection
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
    console.log("Database connection error:", err);
  });
