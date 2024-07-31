const express = require('express');
const app = express();
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/payment', async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: id,
      confirm: true,
    });

    res.json({ success: true, payment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
