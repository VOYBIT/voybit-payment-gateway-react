import assert from 'node:assert/strict'
import test from 'node:test'

import { checkoutStatus, parseStatus, publicIdFromCheckoutUrl } from './checkout.js'

const id = 'nYVvXxsYGr5LZk8Dn7hU0Q'

test('accepts a voybit checkout URL', () => {
  assert.equal(publicIdFromCheckoutUrl(`https://voybit.com/pay/${id}`), id)
  assert.throws(() => publicIdFromCheckoutUrl(`https://example.com/pay/${id}`), /invalid/)
})

test('reads the top-level status', () => {
  const status = parseStatus(JSON.stringify({
    deposit_instructions: { status: 'ready', address: 'secret-address' },
    status: 'pending',
    public_id: id,
    checkout_url: `https://voybit.com/pay/${id}`,
  }), id)
  assert.equal(status.status, 'pending')
  assert.equal(status.confirmed, false)
  assert.equal(JSON.stringify(status).includes('secret-address'), false)
})

test('status request does not send an API key', async () => {
  let seen
  const status = await checkoutStatus(id, {
    fetch: async (url, options) => {
      seen = { url, options }
      return {
        ok: true,
        status: 200,
        text: async () => JSON.stringify({
          status: 'paid',
          public_id: id,
          checkout_url: `https://voybit.com/pay/${id}`,
          deposit_instructions: { address: 'secret-address' },
        }),
      }
    },
  })
  assert.equal(status.confirmed, true)
  assert.equal(seen.options.headers['X-Voybit-Api-Key'], undefined)
  assert.equal(seen.url, `https://api.voybit.com/api/v1/checkout/${id}`)
})
