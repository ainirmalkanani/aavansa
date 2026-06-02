export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  prefill: {
    name: string
    email: string
    contact: string
  }
  theme: {
    color: string
  }
  handler: (response: RazorpayResponse) => void
  modal?: {
    ondismiss?: () => void
  }
}

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export async function initiateRazorpayPayment(options: RazorpayOptions): Promise<void> {
  const loaded = await loadRazorpay()
  if (!loaded) {
    throw new Error('Razorpay SDK failed to load')
  }
  const rzp = new (window as any).Razorpay(options)
  rzp.open()
}

export function createOrderPayload(amount: number) {
  return {
    amount: amount * 100,
    currency: 'INR',
    receipt: `order_${Date.now()}`,
  }
}
