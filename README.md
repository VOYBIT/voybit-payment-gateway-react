# Voybit checkout for React

## Get an API key

The API key is created in the dashboard and used only on your server. This library opens the `checkout_url` that server returns.

1. Create an account at [dashboard.voybit.com](https://dashboard.voybit.com).
2. Open **Gateways** and create a payment gateway. Keep it enabled.
3. Open **API keys**, choose **Create secret key**, and bind it to that gateway. Copy the full `vb_live_…` value once. Your server sends it as `X-Voybit-Api-Key` when it creates a checkout session.

Your server creates a checkout session and returns `checkout_url`. The hosted page lets the payer choose from the gateway’s enabled assets and confirm a live quote before the address and QR are created. This package does not take an API key.

```bash
npm install github:VOYBIT/voybit-payment-gateway-react
```

```jsx
<PayButton checkoutUrl={checkoutUrl}>Pay</PayButton>
```

`redirectToCheckout(checkoutUrl)` navigates to `https://voybit.com/pay/{id}`. Fulfil the order from the webhook on your server.

```js
const status = await checkoutStatus(publicId)
if (status.confirmed) {
  // paid or overpaid — refresh the screen only
}
```

`checkoutStatus` calls `GET https://api.voybit.com/api/v1/checkout/{public_id}` and is only for the screen. Peer dependency: React 18 or newer. Not published to npm.
