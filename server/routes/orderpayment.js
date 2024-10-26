const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
    const products = req.body.products;

    // Log the received products
    console.log("Received request body:", req.body);

    // if (!Array.isArray(products) || products.length === 0) {
    //     console.error("Invalid products array.");
    //     return res.status(400).json({ error: "Invalid products array." });
    // }

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.productTitle,
            },
        
        unit_amount: 5000
     }, // Make sure to convert price to the correct unit
        quantity: product.quantity,
    }));



        // const customer = await stripe.customers.create({
        //     metadata: {
        //         userId: req.body.userId,
        //         cart: JSON.stringify(lineItems),
        //     },
        // });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            // customer: customer.id,
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_BASE_URL}/payment/complete/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_BASE_URL}/cancel`,
        });

        res.json({ id: session.id });
    
});





router.get("/payment/complete", async (req, res) => {
    try {
        const result = await Promise.all([
            stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
            stripe.checkout.sessions.listLineItems(req.query.session_id),
        ]);
        res.status(200).send(JSON.stringify(result));
    } catch (error) {
        res.status(500).json({ error: "Error retrieving payment details." });
    }
});

router.get("/cancel", (req, res) => {
    res.redirect("/");
});

// Webhook for Stripe to confirm payment
router.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
    const sig = req.headers["stripe-signature"];

    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            // Update order status
            Order.findOneAndUpdate({ stripeSessionId: session.id }, { paymentStatus: "paid" }, { new: true })
                .then(() => res.json({ received: true }))
                .catch((err) => res.status(500).json({ error: "Error updating order status" }));
        } else {
            res.json({ received: true });
        }
    } catch (err) {
        res.status(400).json({ error: "Webhook Error" });
    }
});

module.exports = router;
