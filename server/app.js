const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();


const corsOptions = {
    origin: process.env.CLIENT_BASE_URL,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());


const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/Cart");
const userRouter = require("./routes/user");
const checkoutRouter = require("./routes/checkout");
const orderPaymentRouter = require("./routes/orderpayment");
const OrderHistoryRouter = require("./routes/OrderHistory");
const AIassistance= require("./routes/AIassistance");


app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/Cart", cartRouter);
app.use("/api/user", userRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orderpayment", orderPaymentRouter);
app.use("/api/OrderHistory", OrderHistoryRouter);
app.use("/api", AIassistance);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Invalid token" });
  }
  next(err);
});


mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection is ready....");


    app.listen(process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});
