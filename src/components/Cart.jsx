import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cartSlice';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const salesTax = subtotal * 0.1; // Assuming 10% sales tax
  const coupon = 0; // Placeholder for coupon discount
  const grandTotal = subtotal + salesTax - coupon;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white p-8 font-sans text-gray-800">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-12">Your Cart (0 items)</h1>
          <p className="text-center text-gray-500">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8 font-sans text-gray-800">
      {/* --- Main Container --- */}
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-12">
          Your Cart ({cartItems.length} items)
        </h1>

        {/* --- Header Row --- */}
        <div className="grid grid-cols-12 gap-6 border-b border-gray-200 pb-4 text-sm font-bold text-gray-900 mb-6">
          <div className="col-span-6 pl-2">Item</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right pr-2">Total</div>
        </div>

        {/* --- Cart Items Section --- */}
        <div className="space-y-8 mb-12">
          {cartItems.map(item => (
            <div key={item.id} className="grid grid-cols-12 gap-6 items-start border-b border-gray-100 pb-8">
              {/* Image & Text */}
              <div className="col-span-6 flex gap-6">
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
                  {/* Additional details can be added here if available */}
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 text-center font-medium">${item.price.toFixed(2)}</div>

              {/* Quantity Input */}
              <div className="col-span-2 flex justify-center">
                <div className="flex items-center border border-gray-300 rounded overflow-hidden h-10 w-28">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-8 h-full flex items-center justify-center hover:bg-gray-100 text-lg"
                  >
                    −
                  </button>
                  <div className="flex-1 h-full flex items-center justify-center border-l border-r border-gray-300 font-medium">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-full flex items-center justify-center hover:bg-gray-100 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total & Remove Icon */}
              <div className="col-span-2 flex justify-between items-start pl-4 relative">
                <span className="font-bold ml-auto pr-8">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-gray-300 hover:text-gray-500 absolute right-0 top-1"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- Summary / Footer Section --- */}
        <div className="flex flex-col items-end border-t border-gray-200 pt-8">
          <div className="w-full max-w-sm space-y-4">
            {/* Subtotal Rows */}
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span>Subtotal:</span>
              <span className="text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span>Sales Tax:</span>
              <span className="text-gray-900">${salesTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-600 border-b border-gray-200 pb-4">
              <span>Coupon Code:</span>
              <button className="text-gray-500 underline hover:text-gray-800">Add Coupon</button>
            </div>

            {/* Grand Total */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold">Grand total:</span>
              <span className="text-3xl font-bold">${grandTotal.toFixed(2)}</span>
            </div>

            {/* Free Shipping Bar */}
            <div className="pt-6">
              <div className="flex items-center gap-2 mb-2 text-sm">
                <span className="text-gray-800">
                  Congrats, you're eligible for <b>Free Shipping</b>
                </span>
                {/* Truck Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full rounded-full"></div>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-black text-white font-bold text-lg py-4 rounded hover:bg-gray-800 transition-colors mt-4">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
