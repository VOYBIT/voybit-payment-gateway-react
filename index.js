import React from 'react'

import { CheckoutError, checkoutStatus, checkoutUrl, publicIdFromCheckoutUrl } from './checkout.js'

export { CheckoutError, checkoutStatus, checkoutUrl, publicIdFromCheckoutUrl }

export function redirectToCheckout(value) {
  window.location.assign(checkoutUrl(publicIdFromCheckoutUrl(value)))
}

export function PayButton({ checkoutUrl: value, children = 'Pay' }) {
  let href = ''
  try {
    href = checkoutUrl(publicIdFromCheckoutUrl(value))
  } catch {
    href = ''
  }
  return React.createElement('a', {
    href: href || undefined,
    onClick: (event) => {
      if (!href) event.preventDefault()
    },
  }, children)
}
