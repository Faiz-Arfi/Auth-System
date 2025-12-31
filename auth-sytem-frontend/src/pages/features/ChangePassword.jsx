import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Lock, NotebookText } from 'lucide-react'
import { editPassword, skipActivity2ForUser } from '../../api/profile'
import Unauthorized from '../../components/extras/Unauthorized'
import InfoCardWithButton from '../../components/extras/InfoCardWithButton'
import ErrorModal from '../../components/extras/ErrorModal'
import CoinGained from '../../components/extras/CoinGained'
import SucessModal from '../../components/extras/SucessModal'

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [showCoinModal, setShowCoinModal] = useState(false)
  const [showActivity2Note, setShowActivity2Note] = useState(
    localStorage.getItem("activity2Status") !== 'true'
  )

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await editPassword(formData);
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setSuccessMessage('Password changed successfully!');
      setShowSuccessModal(true);
      if (response === 1) {
        setShowCoinModal(true);
        localStorage.setItem("activity2Status", true);
        setShowActivity2Note(false);
      }
    } catch (error) {
      // check error status code
      setErrorMessage(error.response.data || 'Failed to change password. Please try again later.');
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  }

  const skipActivity = async (e) => {
    e.preventDefault();
    try {
      const response = await skipActivity2ForUser();
      setShowCoinModal(true);
      localStorage.setItem("activity2Status", true);
      setShowActivity2Note(false);

    } catch (error) {
      setErrorMessage(error.response.data || 'Failed to skip Activity 2. Please try again later.');
      setShowErrorModal(true);
    }
  }

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  }

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setSuccessMessage('');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 p-6 md:p-10'>
      <Unauthorized roleRequired="INTERMEDIATE" />
      <ErrorModal errorMessage={errorMessage} onClose={closeErrorModal} />
      <SucessModal successMessage={successMessage} onClose={closeSuccessModal} />
      {showCoinModal && <CoinGained coinValue={150} onClose={() => setShowCoinModal(false)} />}
      {/* Breadcrumb Navigation */}
      <div className="navigations mb-6">
        <Link to="../user/dashboard" className="text-blue-600 hover:underline">Dashboard</Link> &#8250;
        <Link to="/user/change-password" className="text-green-800 hover:underline"> Change Password</Link> &#8250;
      </div>

      {showActivity2Note && <InfoCardWithButton title={"Actity-2 Note"} description={"Skip this activity if you logged in using OAuth (Google) "} buttonText={"Skip"} onButtonClick={skipActivity} icon={NotebookText} />}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          Change <span className="text-green-600">Password</span>
        </h1>
        <p className="text-gray-600 text-lg">Update your password to keep your account secure</p>
      </div>

      <div className="max-w-2xl mx-auto">

        {/* Password Change Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  id="oldPassword"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your current password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Confirm your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Updating...</span>
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' })}
                className={`px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword