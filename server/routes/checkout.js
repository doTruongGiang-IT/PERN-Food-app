const router = require("express").Router();
const stripe = require('stripe')('sk_test_51JzgJCIO8tPEgH0KUQFTtpoUmOsRUKBOEGy2gS300vt05yctoe35B3PJ0o87cyigNLXWLvzIIHOZdUmqXAirvkIY00rL2HM9xV');

router.post('/create-checkout-session', async (req, res) => {
    const products = req.body;
    const format = products.map((product) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.product_name,
                images: [product.product_image],
            },
            unit_amount: product.product_price * 100
        },
        quantity: product.qty
    }));
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: format,
        mode: 'payment',
        success_url: 'http://localhost:3000/',
        cancel_url: 'http://localhost:3000/cart',
    });
  
    // res.redirect(303, session.url);
    res.json({"url":session.url});
  });

module.exports = router;