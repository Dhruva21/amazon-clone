const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HPvXEHWpsGDAeTfwHyRt6WTeW5zQrK1V2ri4qAszHZa4QQ3yF3vQOka1YmbbiIj34fK8Vu1YmT2l2gPwNqhxUBS00PHkFWjpw"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors());
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "inr",
    description : "stripe integration testing"
  })
  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api