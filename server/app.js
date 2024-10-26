const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware setup
const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST'], // Allowed methods
    credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// Router imports
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const userRouter = require("./routes/user");
const checkoutRouter = require("./routes/checkout");
const orderPaymentRouter = require("./routes/orderpayment");

// Mounting routers
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orderpayment", orderPaymentRouter);

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

// 404 Not Found handler
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});
