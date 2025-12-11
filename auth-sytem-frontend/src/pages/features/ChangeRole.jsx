import React from 'react'
import OfferPlan from '../../components/feature/OfferPlan'
import { Link } from 'react-router-dom'

const ChangeRole = () => {
  const noviceFeatures = [
    'Access to basic features',
    'Limited support',
    'Explore the website',
  ];
  return (
    <div className='min-h-screen bg-gray-100 p-6 md:p-10'>

      <div className="navigations">
        <Link to="../user/dashboard" className="text-blue-600 hover:underline">Dashboard</Link> &#8250;
        <Link to="/user/change-role" className="text-green-800 hover:underline">Role</Link> &#8250;
      </div>

      <div className="heading mt-4 mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Select your <span className="text-green-600">Role</span>
        </h1>
      </div>

      <div className="offer-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OfferPlan type='NOVICE' price='100'  features={noviceFeatures} />
        <OfferPlan type='INTERMEDIATE' price='200'/>
        <OfferPlan type='PRO'/>
        <OfferPlan type='LEGEND'/>
      </div>

    </div>
  )
}

export default ChangeRole