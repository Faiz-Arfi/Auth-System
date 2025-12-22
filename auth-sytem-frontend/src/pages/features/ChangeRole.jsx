import React, { useEffect, useState } from 'react'
import OfferPlan from '../../components/feature/OfferPlan'
import { Link } from 'react-router-dom'
import { Coins, Wallet } from 'lucide-react'
import RoleChangeConfirmation from '../../components/feature/RoleChangeConfirmation'

const ChangeRole = () => {
  const noviceFeatures = [
    'Access to Auth Info',
    'Access to Activity Zone',
    'Access to Dashboard',
    'Access to Change Plan option',
    'Explore the website',
  ];
  const intermediateFeatures = [
    'All Novice features',
    'Access to reset passwords option',
    
  ];
  const proFeatures = [
    'All Intermediate features',
    'Access to Activity Logs option'
  ];
  const legendFeatures = [
    'All Pro features',
    'Access to Profile Settings option'
  ];

  const currentPlan = localStorage.getItem('role');
  const userPoints = localStorage.getItem('points') || '0';

  const [showSuccessModel, setShowSuccessModel] = useState(false);

  const toggleShowSuccessModal = () => {
    setShowSuccessModel(!showSuccessModel);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 p-6 md:p-10'>
      {showSuccessModel && (
        <RoleChangeConfirmation onClose={toggleShowSuccessModal} />
      )}

      <div className="navigations">
        <Link to="../user/dashboard" className="text-blue-600 hover:underline">Dashboard</Link> &#8250;
        <Link to="/user/change-role" className="text-green-800 hover:underline">Role</Link> &#8250;
      </div>

      <div className="heading mt-4 mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Select your <span className="text-green-600">Role</span>
        </h1>
      </div>

      {/* User Points Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-green-500 to-gray-700 rounded-2xl shadow-lg p-6 border border-green-400 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-4 rounded-xl">
                <Wallet className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Available Balance</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-4xl font-bold text-white">{userPoints}</h2>
                  <span className="text-green-100 text-lg font-semibold">Points</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-lg ">
              <Coins className="w-5 h-5 text-green-600" />
              <span className="text-green-600 font-medium text-sm">Current Plan: {currentPlan || 'None'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="offer-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OfferPlan type='NOVICE' price='0'  features={noviceFeatures} toggleShowSucess={toggleShowSuccessModal}/>
        <OfferPlan type='INTERMEDIATE' price='100' features={intermediateFeatures} promo='FREE'toggleShowSucess={toggleShowSuccessModal}/>
        <OfferPlan type='PRO' price='200' features={proFeatures} promo='FLAT100'toggleShowSucess={toggleShowSuccessModal}/>
        <OfferPlan type='LEGEND' price='500' features={legendFeatures} promo='FLAT200'toggleShowSucess={toggleShowSuccessModal}/>
      </div>

    </div>
  )
}

export default ChangeRole