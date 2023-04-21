import React, { useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

import useCart from '../../../hooks/useCart'

function PaymentButton () {
  const { getCartUser, total } = useCart()
  const [products, setProducts] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData () {
      const result = await getCartUser()
      setProducts(result.data.cart[0].items)
    }
    fetchData()
  }, [])


  const paypalOptions = {
    'client-id':
      'ATl183MGhPezfeBR8JQF38yzfT1-TyjZoWxbNIlUmOcdUnJ4uZX_NTARquf6PUfp3F-NuIGeDcNMGO4l',
    currency: 'BRL',
    intent: 'capture',
    activeFunding: ''
  }

  const productsPayPal = products.map((product) => {
    return {
      name: product.name,
      description: 'Wesley',
      quantity: product.quantity,
      unit_amount: {
        currency_code: 'BRL',
        value: product.price
      }
    }
  })

  let amount = {
    currency_code: 'BRL',
    value: total,
    breakdown: {
      item_total: {
        currency_code: 'BRL',
        value: total
      }
    }
  }

  async function createOrder (data, actions) {
    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: amount,
          items: productsPayPal
        }
      ],
      application_context: {
        brand_name: 'My Store',
        landing_page: 'BILLING',
        user_action: 'PAY_NOW',
        return_url: 'https://example.com/return',
        cancel_url: 'https://example.com/cancel'
      }
    })
  }

  function onApprove (data, actions) {
    return actions.order.capture().then(function (details) {
      console.log(details)
    }).then(() => {
      navigate("/");

    })
  }

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        style={{ layout: 'horizontal', color: 'blue' }}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  )
}

export default PaymentButton
