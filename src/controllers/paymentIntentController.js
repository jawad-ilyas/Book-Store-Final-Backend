// controllers/paymentIntentController.js
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const { amount =2999, currency = "usd" } = req.body;

  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount, // in cents, e.g., $20 → 2000
    currency,
    automatic_payment_methods: { enabled: true }, // auto enable cards, etc.
  });

  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
  });
};
