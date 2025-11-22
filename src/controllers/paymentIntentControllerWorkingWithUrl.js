// controllers/paymentIntentController.js
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    // const { items, email } = req.body;

    // //— Calculate amount —//
    // let total = 0;
    // items.forEach(i => {
    //   total += i.price * i.qty; // cents
    // });

    // // Create payment intent
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: total,
    //   currency: "usd",
    //   receipt_email: email,
    //   metadata: {
    //     integration_check: "accept_a_payment",
    //   }
    // });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "jawad",

            },
            unit_amount: 1000,
          },
          quantity: 20
        }
      ],
      mode: "payment",
      success_url: "http://localhost:5173",
      cancel_url: "http://localhost:5173/cancel",
    })
    res.status(200).json({
      // clientSecret: paymentIntent.client_secret
      url: session?.url
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
