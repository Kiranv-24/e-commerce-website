const Order = require("../models/Orderpayment");

const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const router = express.Router();
router.post("/create-checkout-session", async (req, res) => {
  const { products, username, orderDetails, shippingDetails } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: { name: product.productTitle },
      unit_amount: 5000, 
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",

      cancel_url: `${process.env.CLIENT_BASE_URL}/cancel`,
      metadata: {
        username,
        orderDetails: JSON.stringify(orderDetails),
        shippingDetails: JSON.stringify(shippingDetails),
        billingDetails: JSON.stringify(orderDetails),
      },
      success_url: `${process.env.CLIENT_BASE_URL}/payment/complete?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Unable to create checkout session." });
  }
});

router.post("/payment/complete", async (req, res) => {
  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.status(400).json({ error: "Session ID is required." });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent.payment_method"],
    });

    const username = session.metadata.username;
    const orderDetails = JSON.parse(session.metadata.orderDetails);
    const shippingDetails = JSON.parse(session.metadata.shippingDetails);

    const newOrderData = {
      orderId: sessionId,
      orderDetails,
      shippingDetails,
      paymentStatus: "paid",
    };

    const existingOrderDoc = await Order.findOne({ username });

    if (existingOrderDoc) {
      const existingOrder = existingOrderDoc.orders.find(
        (order) => order.orderId === sessionId
      );

      if (!existingOrder) {
        existingOrderDoc.orders.push(newOrderData);
        await existingOrderDoc.save();
        return res.status(200).json({ success: true, order: newOrderData });
      } else {
        return res.status(200).json({
          success: true,
          message: "Order already exists.",
          order: existingOrder,
        });
      }
    } else {
      const newOrderDoc = await Order.create({
        username,
        orders: [newOrderData],
      });
      return res.status(200).json({ success: true, order: newOrderDoc });
    }
  } catch (error) {
    console.error("Error processing payment completion:", error);
    res.status(500).json({ error: "Error processing payment." });
  }
});

router.get("/cancel", (req, res) => {
  res.redirect("/");
});


router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      // console.log("Received webhook event:", event);

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

  
        const username = session.metadata.username;
        const orderDetails = JSON.parse(session.metadata.orderDetails);
        const shippingDetails = JSON.parse(session.metadata.shippingDetails);
        const billingDetails = JSON.parse(session.metadata.billingDetails);

        const newOrder = await Order.create({
          username,
          orderDetails,
          billingDetails,
          shippingDetails,
          paymentStatus: "paid",
          stripeSessionId: session.id,
        });


        // console.log("Order saved:", newOrder); 
        res.json({ received: true });
      } else {
        res.json({ received: true });
      }
    } catch (err) {
      console.error("Webhook error:", err);
      res.status(400).json({ error: "Webhook Error" });
    }
  }
);

module.exports = router;
