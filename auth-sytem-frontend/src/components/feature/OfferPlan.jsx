import { ArrowRight, Check } from 'lucide-react'
import React, { useState } from 'react'

const OfferPlan = ({
  type = "type",
  features = ['feature1', 'feature2'],
  price = "100",
  currentPlan = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => !currentPlan && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={isHovered ? 'bg-gray-800 border-gray-300 border-2 rounded-2xl p-4 hover:shadow-1xl hover:scale-105 transition-all duration-300' : 'border-gray-300 border-2 rounded-2xl p-4'}>
      <div className="heading">
        <h2 className='text-xl font-semibold text-gray-400'>{type}</h2>
        <p className={isHovered ? 'text-3xl font-bold my-4 text-gray-200' : 'text-3xl font-bold my-4 text-gray-800'}>{price} <span className='text-gray-400'>Points</span></p>
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
      <div className='promo flex flex-col items-center'>
        <div className='flex items-center w-full gap-2 my-3'>
          <input
            type="text"
            placeholder="Enter promo code"
            disabled={currentPlan}
            className={`border border-gray-300 rounded-lg p-2 flex-1 ${isHovered ? 'placeholder-gray-400 text-gray-200' : 'text-gray-800 placeholder-gray-600'} ${currentPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          <button className='bg-gray-100 text-gray-500 border border-gray-300 p-2 rounded-lg' disabled={currentPlan}><ArrowRight /></button>
        </div>
      </div>
      <div className=''>
        <button className={`w-full p-3 rounded-lg text-lg font-semibold ${currentPlan ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-gray-500 text-amber-50 hover:bg-gray-200 hover:text-gray-500'}`} disabled={currentPlan}>
          {currentPlan ? 'Current Plan' : 'Choose Plan'}
        </button>
      </div>
    </div>
  )
}

export default OfferPlan