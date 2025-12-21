import { ArrowRight, Check } from 'lucide-react'
import React, { useState } from 'react'
import { changeUserRole, checkPromoCode } from '../../api/profile';

const OfferPlan = ({
  type = "type",
  features = ['feature1', 'feature2'],
  price = "100",
  promo
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [rolePrice, setRolePrice] = useState(price);
  const [promoCode, setPromoCode] = useState("");
  const [message, setMessage] = useState({ text: '', type: '' });
  const currentPlan = localStorage.getItem('role') === type;

  const applyPromoCode = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!promoCode.trim()) {
      setMessage({ text: 'Please enter a promo code.', type: 'error' });
      return;
    }

    try {
      const response = await checkPromoCode(promoCode, type);
      if (response) {
        const discountedPrice = Number(price) - Number(response);
        setRolePrice(discountedPrice >= 0 ? discountedPrice : 0);
        setMessage({ 
          text: `Promo code applied! You saved ${response} Points.`, 
          type: 'success' 
        });
      }
    } catch (error) {
      console.log(error);
      setRolePrice(price);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Invalid promo code.';
      setMessage({ 
        text: typeof errorMessage === 'string' ? errorMessage : 'Invalid promo code.', 
        type: 'error' 
      });
    }
  }

  const processRoleChange = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    try {
      const response = await changeUserRole(type, promoCode);
      if (response !== undefined && response !== null) {
        setMessage({ 
          text: 'Role changed successfully! Reload in 2 seconds...', 
          type: 'success' 
        });
        localStorage.setItem('role', type);
        localStorage.setItem('points', response);
        //reload page in 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to change role. Please try again.';
      setMessage({ 
        text: typeof errorMessage === 'string' ? errorMessage : 'Failed to change role. Your session may have expired.',
        type: 'error' 
      });
    }
  }

  return (
    <div
      onMouseEnter={() => !currentPlan && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={isHovered ? 'bg-gray-800 border-gray-300 border-2 rounded-2xl p-4 hover:shadow-1xl hover:scale-105 transition-all duration-300' : 'border-gray-300 border-2 rounded-2xl p-4'}>
      <div className="heading">
        <h2 className='text-xl font-semibold text-gray-400'>{type}</h2>
        <p className={isHovered ? 'text-3xl font-bold my-4 text-gray-200' : 'text-3xl font-bold my-4 text-gray-800'}>{rolePrice} <span className='text-gray-400'>Points</span></p>
        <p className='text-gray-400 mb-4'>This Role includes the following Benifits:</p>
      </div>
      {
        features.map((feature, index) => (
          <div key={index} className='flex items-center mb-2'>
            <Check className='stroke-2 bg-gray-500 rounded-2xl text-amber-50 inline-block mr-4' />
            <p className={`inline-block text-lg ${isHovered ? 'text-gray-300' : 'text-gray-700'}`}>
              {feature}
            </p>
          </div>
        ))
      }
      {promo && (
        <div className='bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-400 rounded-lg p-3 my-4'>
          <p className='text-sm font-semibold text-gray-600 mb-1'>Available Promo Code:</p>
          <p className='text-lg font-bold text-green-500'>{promo}</p>
        </div>
      )}
      <div className='promo flex flex-col items-center'>
        <div className='flex items-center w-full gap-2 my-3'>
          <input
            type="text"
            placeholder="Enter promo code"
            disabled={currentPlan}
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className={`border border-gray-300 rounded-lg p-2 flex-1 ${isHovered ? 'placeholder-gray-400 text-gray-200 bg-gray-700' : 'text-gray-800 placeholder-gray-600 bg-white'} ${currentPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          <button 
            className={`bg-gray-100 text-gray-500 border border-gray-300 p-2 rounded-lg ${!currentPlan && !isHovered ? 'hover:bg-gray-200' : ''}`} 
            disabled={currentPlan} 
            onClick={applyPromoCode}
          >
            <ArrowRight />
          </button>
        </div>
        {message.text && (
          <div className={`w-full text-sm font-semibold my-2 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message.text}
          </div>
        )}
      </div>
      <div className=''>
        <button className={`w-full p-3 rounded-lg text-lg font-semibold ${currentPlan ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-gray-500 text-amber-50 hover:bg-gray-200 hover:text-gray-500'}`} disabled={currentPlan} onClick={processRoleChange}>
          {currentPlan ? 'Current Plan' : 'Choose Plan'}
        </button>
      </div>
    </div>
  )
}

export default OfferPlan