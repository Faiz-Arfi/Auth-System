import { RefreshCcw } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
    return (
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-lg p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-lg mb-6 opacity-90">
            Experience the authentication system firsthand and explore all the features this platform offers.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-xl"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Auth-S Now
          </Link>
        </div>
    )
}

export default CTA