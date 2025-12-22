import { Check, X } from 'lucide-react'
import React, { useState } from 'react'
import CoinGained from '../extras/CoinGained'

const RoleChangeConfirmation = ({
    onClose,
    role=localStorage.getItem('role')
}) => {

    const [showCoinGained, setShowCoinGained] = useState(role === 'INTERMEDIATE');

    const handleCoinGainedClose = () => {
        setShowCoinGained(false);
    }
    
  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
        {showCoinGained ? <CoinGained coinValue={50} onClose={handleCoinGainedClose}/> : null}
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animation-fadeIn">
            <button
              onClick={onClose}
              className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
            >
              <X className='w-6 h-6' />
            </button>
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <Check className="w-12 h-12 text-green-700" />
              </div>
            </div>
            <h2 className='text-2xl font-bold text-gray-800 text-center mb-2'>
              Role Changed Successfully!
            </h2>
            <p className='text-gray-600 text-center mb-6'>
              You have successfully upgraded your role. Enjoy your new features!
            </p>
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              > Got It</button>
            </div>
          </div>
        </div>
  )
}

export default RoleChangeConfirmation