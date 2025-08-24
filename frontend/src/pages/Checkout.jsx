import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Truck, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

const Checkout = () => {
  const navigate = useNavigate()
  const { items, getTotal, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const [isProcessing, setIsProcessing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || '',
      country: user?.address?.country || 'United States',
      paymentMethod: 'credit-card'
    }
  })

  const subtotal = getTotal()
  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + tax + shipping

  const onSubmit = async (data) => {
    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would:
      // 1. Process payment with payment provider
      // 2. Create order in backend
      // 3. Send confirmation email
      
      clearCart()
      toast.success('Order placed successfully!')
      navigate('/profile') // Redirect to orders page
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-8">
              {/* Shipping Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <Truck className="w-5 h-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Shipping Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      {...register('fullName', { required: 'Full name is required' })}
                      className="input-field"
                    />
                    {errors.fullName && (
                      <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="input-field"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone
                    </label>
                    <input
                      {...register('phone')}
                      className="input-field"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address *
                    </label>
                    <input
                      {...register('address', { required: 'Address is required' })}
                      className="input-field"
                    />
                    {errors.address && (
                      <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      City *
                    </label>
                    <input
                      {...register('city', { required: 'City is required' })}
                      className="input-field"
                    />
                    {errors.city && (
                      <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      State *
                    </label>
                    <input
                      {...register('state', { required: 'State is required' })}
                      className="input-field"
                    />
                    {errors.state && (
                      <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      {...register('zipCode', { required: 'ZIP code is required' })}
                      className="input-field"
                    />
                    {errors.zipCode && (
                      <p className="text-red-600 text-sm mt-1">{errors.zipCode.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Country *
                    </label>
                    <select
                      {...register('country', { required: 'Country is required' })}
                      className="input-field"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Payment Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <CreditCard className="w-5 h-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="credit-card"
                      value="credit-card"
                      {...register('paymentMethod')}
                      className="w-4 h-4 text-primary-600"
                    />
                    <label htmlFor="credit-card" className="text-gray-900 dark:text-gray-100">
                      Credit Card
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="paypal"
                      value="paypal"
                      {...register('paymentMethod')}
                      className="w-4 h-4 text-primary-600"
                    />
                    <label htmlFor="paypal" className="text-gray-900 dark:text-gray-100">
                      PayPal
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="cash-on-delivery"
                      value="cash-on-delivery"
                      {...register('paymentMethod')}
                      className="w-4 h-4 text-primary-600"
                    />
                    <label htmlFor="cash-on-delivery" className="text-gray-900 dark:text-gray-100">
                      Cash on Delivery
                    </label>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Your payment information is secure and encrypted
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6 sticky top-24"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-center space-x-3">
                      <img
                        src={item.images?.[0] || '/placeholder-product.jpg'}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      ${tax.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 dark:border-gray-700 pt-3">
                    <span className="text-gray-900 dark:text-gray-100">Total</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                </button>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout