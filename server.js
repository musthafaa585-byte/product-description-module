const express = require("express");
  const cors = require("cors");
  require('dotenv').config();
  const stripe = require("stripe")(
    process.env.STRIPE_SECRET_KEY
  ); // your secret key

  const app = express();

  // ✅ Use CORS before any routes
  app.use(
    cors({
      origin: "http://localhost:4200", // allow Angular frontend
    })
  );

  // ✅ JSON middleware also before routes
  app.use(express.json());

  // ✅ Route: Stripe checkout session
  app.post("/create-checkout-session", async (req, res) => {
    const { product } = req.body;
    if (!product) {
      console.error("❌ No product received!");
      return res.status(400).send({ error: "No product provided" });
    }

    console.log("Creating Stripe session for:", product);

    try {
      const session = await stripe.checkout.sessions.create({
        //This creates a checkout session on Stripe’s servers. Stripe returns a session object like this:{"id": "cs_test_a1b2c3d4"}, you send only the id back to the frontend
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: product.title
              },
              unit_amount: Math.round(Number(product.price) * 100),
            },
            quantity: 1,
          },
          {
            price_data: {
              currency: "inr",
              product_data: { name: "Delivery Charges" },
              unit_amount: 200 * 100, // ₹200 in paise
            },
            quantity: 1,
          }
        ],
        metadata: {
          productId: product.id, // ✅ send product id to Stripe
        },
        success_url: `http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}&productId=${product.id}`,
        cancel_url: 'http://localhost:4200/cart?canceled=true',
      });

      res.send({ id: session.id });
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      res.status(500).send({ error: "Failed to create checkout session" });
    }
  });

  app.get("/checkout-session/:sessionId", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
      res.send(session);
    } catch (error) {
      console.error("Error fetching session:", error);
      res.status(500).send({ error: "Failed to fetch session" });
    }
  });
  // ✅ Start server
  app.listen(4242, () => console.log("Server running on http://localhost:4242"));

