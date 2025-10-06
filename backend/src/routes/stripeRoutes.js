const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const router = express.Router();
const { createOrder } = require("../controllers/orderController");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/checkout", async (req, res) => {
  try {
    const { items } = req.body;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.title },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url:
        "http://localhost:5173/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/checkout/cancel",
      metadata: {
        userId: req.body.userId || "guest",
        items: JSON.stringify(items),
      },
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ message: "Stripe checkout failed" });
  }
});

router.get("/checkout/success", async (req, res) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      res.json({ success: true, session });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error("Stripe success error:", err);
    res.status(500).json({ message: "Failed to verify session" });
  }
});

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET 
      );
    } catch (err) {
      console.error("Webhook error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const userId = session.metadata.userId;
      const items = JSON.parse(session.metadata.items);

      await createOrder({
        user: userId,
        orderItems: items,
        totalPrice: session.amount_total / 100,
        paymentMethod: "Stripe",
        isPaid: true,
        paidAt: new Date(),
      });
    }

    res.status(200).json({ received: true });
  }
);

module.exports = router;
