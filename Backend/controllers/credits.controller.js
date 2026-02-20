
import Stripe from "stripe";
import UserModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

const CREDITS_MAP = {
  100: 50,
  200: 120,
  500: 300,
};

/* ============================= */
/* Create Checkout Session       */
/* ============================= */
export const createCreditsOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount } = req.body;

    if (!CREDITS_MAP[amount]) {
      return res.status(400).json({
        message: "Invalid credit plan",
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${CREDITS_MAP[amount]} Credits`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId.toString(),
        credits: CREDITS_MAP[amount].toString(),
      },
    });

    // ✅ IMPORTANT CHANGE
    return res.status(200).json({
      url: session.url,
    });

  } catch (error) {
    console.error("Stripe Order Error:", error);
    return res.status(500).json({
      message: "Stripe order failed",
    });
  }
};


/* ============================= */
/* Stripe Webhook                */
/* ============================= */
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_KEY
    );
  } catch (err) {
    console.error("Webhook Signature Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const userId = session.metadata.userId;
      const creditsToAdd = Number(session.metadata.credits);

      if (!userId || !creditsToAdd) {
        return res.status(400).json({
          message: "Invalid metadata",
        });
      }

      await UserModel.findByIdAndUpdate(
        userId,
        {
          $inc: { credits: creditsToAdd },
          $set: { isCreditAvailable: true },
        },
        { new: true }
      );

      console.log("Credits added successfully ✅");
    }

    return res.json({ received: true });

  } catch (dbError) {
    console.error("Webhook DB Error:", dbError);
    return res.status(500).json({
      message: "Database update failed",
    });
  }
};