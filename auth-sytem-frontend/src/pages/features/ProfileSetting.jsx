import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileSettingCard from '../../components/feature/ProfileSettingCard'
import ModifyAccountModal from '../../components/feature/ModifyAccountModal';
import { editName } from '../../api/profile';

const ProfileSetting = () => {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const toggleResetModal = () => {
    setShowResetModal(!showResetModal);
  }

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  }

  const [formData, setFormData] = useState({
    userName: ''
  });

  const handleProfileEdit = async (e) => {
    e.preventDefault();
    const messageDiv = document.querySelector('.Message');
    if(formData.userName.trim() === '') {
      messageDiv.innerHTML = `<p class="text-yellow-600 font-semibold">Name cannot be empty.</p>`;
      return;
    }

    // api call to edit name
    try {
      const response = await editName(formData.userName);
      messageDiv.innerHTML = `<p class="text-green-600 font-semibold">Profile updated successfully!</p>`;
    } catch (error) {
      messageDiv.innerHTML = `<p class="text-red-600 font-semibold">Failed to update profile. Please try again.</p>`;
      return;
    }

    //clear the input field
    setFormData({ userName: '' });
    const inputField = document.getElementById('userName');
    if (inputField) {
      inputField.value = '';
    }
  }
  

  return (
    <div className='min-h-screen bg-gray-100 p-6 md:p-10'>

      <div className="navigations">
        <Link to="../user/dashboard" className="text-blue-600 hover:underline">Dashboard</Link> &#8250;
        <Link to="/user/profile-setting" className="text-green-800 hover:underline"> Setting</Link> &#8250;
      </div>

      <div className="heading mt-4 mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          Profile <span className="text-green-600">Settings</span>
        </h1>
      </div>

      {/* change name */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
        <form
          onSubmit={handleProfileEdit} 
          className="space-y-6 max-w-lg">
          <div>
            <label htmlFor="userName" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              value={formData.userName}
              id="userName"
              name="userName"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="Message"></div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
          >
            Update Name
          </button>
        </form>
      </div>
      {/* Actions cards */}
      <div>
        <ProfileSettingCard name='Change Password' description='Click Here to update your Password' link='/user/change-password'/>
        <ProfileSettingCard name='Change Role' description='Time for a role switch, click me' link='/user/change-role' />
        <ProfileSettingCard name='Reset Account' description='Need a fresh start, just reset you account' toggleModal={toggleResetModal}/>
        <ProfileSettingCard name='Delete Account' description='Remember you can always create a new one ;)' toggleModal={toggleDeleteModal}/>
      </div>

      {/* Reset Modal */}
      {showResetModal && (<ModifyAccountModal toggleModal={toggleResetModal} title="Reset Account" confirmText="RESET" />)}

      {/* Delete Modal */}
      {showDeleteModal && (<ModifyAccountModal toggleModal={toggleDeleteModal} title="Delete Account" confirmText="DELETE" />)}

    </div>
  )
}

export default ProfileSetting