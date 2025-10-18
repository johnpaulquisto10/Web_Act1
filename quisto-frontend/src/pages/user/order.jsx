import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/ui/navbar';

export default function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.cart || JSON.parse(localStorage.getItem('cart') || '[]'));
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    deliveryDate: '',
    deliveryTime: ''
  });
  const [insurance, setInsurance] = useState('');
  const [addons, setAddons] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Totals
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const insuranceCost =
    insurance === 'basic'
      ? 10 * cart.reduce((total, item) => total + item.quantity, 0)
      : insurance === 'premium'
      ? 20 * cart.reduce((total, item) => total + item.quantity, 0)
      : 0;
  const addonsCost = addons.reduce((total, addon) => {
    const cost =
      addon === 'gps' ? 5 :
      addon === 'carseat' ? 8 :
      addon === 'cleaning' ? 15 : 0;
    return total + cost * cart.reduce((total, item) => total + item.quantity, 0);
  }, 0);
  const total = subtotal + deliveryFee + insuranceCost + addonsCost - discount;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  };

  const handleAddonChange = (addon) => {
    setAddons(prev =>
      prev.includes(addon)
        ? prev.filter(a => a !== addon)
        : [...prev, addon]
    );
  };

  return (
    <>
      <Navbar />
      {/* 🖤 Background Gradient Wrapper */}
      <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-gray-100 text-white transition-all duration-700">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 max-w-7xl">

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4 sm:space-x-6">
              {['Cart', 'Details', 'Payment', 'Confirmation'].map((label, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                      index === 0
                        ? 'bg-gradient-to-r from-gray-200 to-white text-black shadow-md'
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`ml-2 text-sm ${
                      index === 0 ? 'text-gray-200' : 'text-gray-400'
                    }`}>
                      {label}
                    </span>
                  </div>
                  {index < 3 && <div className="w-10 sm:w-16 h-0.5 bg-gray-500"></div>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Order Summary
          </h1>

          {cart.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">Your cart is empty. Add some cars to get started!</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Summary */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-semibold mb-6">List of Selected Cars</h2>
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl mb-3">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-600"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-100">{item.title}</h3>
                          <p className="text-sm text-gray-400">{item.info}</p>
                          <p className="text-sm text-gray-500">${item.price}/day</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-600 text-white rounded-full w-7 h-7 hover:bg-gray-500"
                        >−</button>
                        <span className="w-8 text-center text-gray-200 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-600 text-white rounded-full w-7 h-7 hover:bg-gray-500"
                        >+</button>
                        <span className="text-lg font-bold text-gray-100">${item.price * item.quantity}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full w-7 h-7 hover:scale-105 transition-transform"
                        >🗑️</button>
                      </div>
                    </div>
                  ))}

                  {/* Totals */}
                  <div className="border-t border-gray-600 mt-6 pt-4 text-sm space-y-2">
                    <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal}</span></div>
                    <div className="flex justify-between"><span>Delivery Fee:</span><span>${deliveryFee}</span></div>
                    {insuranceCost > 0 && <div className="flex justify-between"><span>Insurance:</span><span>${insuranceCost}</span></div>}
                    {addonsCost > 0 && <div className="flex justify-between"><span>Add-ons:</span><span>${addonsCost}</span></div>}
                    {discount > 0 && <div className="flex justify-between text-green-400"><span>Discount:</span><span>-${discount}</span></div>}
                    <div className="flex justify-between text-lg font-bold text-white border-t border-gray-500 pt-3">
                      <span>Total:</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </div>

                {/* User Info Section */}
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-semibold mb-6">User Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries({
                      Name: 'name',
                      Email: 'email',
                      Phone: 'phone',
                      'Delivery Address': 'address',
                      'Delivery Date': 'deliveryDate'
                    }).map(([label, key]) => (
                      <div key={key}>
                        <label className="text-sm text-gray-400 mb-2 block">{label}</label>
                        <input
                          type={key.includes('email') ? 'email' : key.includes('Date') ? 'date' : 'text'}
                          value={userInfo[key]}
                          onChange={(e) => setUserInfo({ ...userInfo, [key]: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-gray-800 text-gray-100 focus:ring-2 focus:ring-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary Card */}
              <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-2xl shadow-xl p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-gray-400"><span>Total Items:</span><span>{cart.length}</span></div>
                  <div className="flex justify-between text-gray-400"><span>Total Days:</span><span>{cart.reduce((t, i) => t + i.quantity, 0)}</span></div>
                  <div className="flex justify-between text-gray-400"><span>Estimated Delivery:</span><span>{userInfo.deliveryDate || 'TBD'}</span></div>
                </div>
                <div className="border-t border-gray-600 pt-3 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">${total}</span>
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-gray-100 to-gray-400 text-black py-3 rounded-full font-semibold hover:scale-105 transition-all">
                  Review Order
                </button>
                <button
                  onClick={() => navigate('/cars')}
                  className="w-full mt-3 bg-gray-700 text-gray-200 py-3 rounded-full font-semibold hover:bg-gray-600 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
