// server.js
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import bodyParser from 'body-parser';

process.env.STRIPE_SECRET_KEY =
    'sk_test_5';

const app = express();
app.use(bodyParser.json());
app.use(cors());
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // lấy từ Dashboard

app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount, // đơn vị nhỏ nhất (vd: 2000 = 20.00 USD cents)
        currency, // "usd", "eur",...
        automatic_payment_methods: { enabled: true },
    });

    console.log('🚀 ~ paymentIntent:', paymentIntent);

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.listen(8010, () => console.log('Server running on 8010'));

    /**
    ~ paymentIntent: {
    id: 'pi_3S1NX1KdB2VITCqw0r7dkftB',
    object: 'payment_intent',
    amount: 2000,
    amount_capturable: 0,
    amount_details: { tip: {} },
    amount_received: 0,
    application: null,
    application_fee_amount: null,
    automatic_payment_methods: { allow_redirects: 'always', enabled: true },
    canceled_at: null,
    cancellation_reason: null,
    capture_method: 'automatic_async',
    client_secret: 'pi_3S1NX1KdB2VITCqw0r7dkftB_secret_8TlRz4ws9e6UYijV7ckmEmwvJ',
    confirmation_method: 'automatic',
    created: 1756455575,
    currency: 'usd',
    customer: null,
    description: null,
    excluded_payment_method_types: null,
    last_payment_error: null,
    latest_charge: null,
    livemode: false,
    metadata: {},
    next_action: null,
    on_behalf_of: null,
    payment_method: null,
    payment_method_configuration_details: { id: 'pmc_1RzsEVKdB2VITCqw47QYu1il', parent: null },
    payment_method_options: {
        card: {
        installments: null,
        mandate_options: null,
        network: null,
        request_three_d_secure: 'automatic'
        }
    },
    payment_method_types: [ 'card' ],
    processing: null,
    receipt_email: null,
    review: null,
    setup_future_usage: null,
    shipping: null,
    source: null,
    statement_descriptor: null,
    statement_descriptor_suffix: null,
    status: 'requires_payment_method',
    transfer_data: null,
    transfer_group: null
    }
     */
