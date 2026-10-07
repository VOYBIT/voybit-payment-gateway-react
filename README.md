# Voybit checkout for React

Your server creates the payment and returns `checkout_url`. This package does not take an API key.

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
