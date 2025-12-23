import { AlertTriangle, X } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom';

const Unauthorized = ({
    roleRequired = "LEGEND",
}) => {

    const roleValues = {
        "NOVICE": 1,
        "INTERMEDIATE": 2,
        "PRO": 3,
        "LEGEND": 4
    }

    const userRole = localStorage.getItem('role') || "Novice";
    const userRoleValue = roleValues[userRole];
    const requiredRoleValue = roleValues[roleRequired];

    return (
        userRoleValue >= requiredRoleValue ? null :
            <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animation-fadeIn">
                    <Link to="/user/dashboard" className="mr-4">
                        <button
                            className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
                        >
                            <X className='w-6 h-6' />
                        </button>
                    </Link>

                    <div className="flex justify-center mb-4">
                        <div className='bg-yellow-100 p-4 rounded-full'>
                            <AlertTriangle className='w-12 h-12 text-yellow-700' />
                        </div>
                    </div>

                    <h2 className='text-2xl font-bold text-gray-800 text-center mb-2'>
                        Unauthorized Access
                    </h2>
                    <p className='text-gray-600 text-center mb-6'>
                        You need to have <span className="font-semibold text-gray-800">{roleRequired}</span> or Above role to access this feature. Your current role is <span className="font-semibold text-gray-800">{userRole}</span>.
                    </p>
                    <p className='text-gray-600 text-center mb-6'>
                        <span className="font-semibold text-gray-800">Don't worry!</span> Complete <span className="font-semibold text-yellow-600">previous Activities</span> to gain <span className="font-bold text-green-600">Points</span> then you can upgrade your role from the <span className="font-semibold text-blue-600">Change Role</span> section in your dashboard.
                    </p>
                    <div className="flex justify-center">
                        <Link to="/user/change-role" className="mr-4">
                            <button
                                className="text-sm bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors md:text-base"
                            > Change Role</button>
                        </Link>
                        <Link to="/user/dashboard" className="mr-4">
                            <button
                                className="text-sm bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors md:text-base"
                            > Back to Dashboard</button>
                        </Link>
                    </div>

                </div>
            </div>
    )
}

export default Unauthorized