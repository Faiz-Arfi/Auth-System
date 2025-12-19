import { AlertTriangle, X } from 'lucide-react'
import React, { useState } from 'react'
import { deleteAccount, resetAccount } from '../../api/profile';

const ModifyAccountModal = (
    { toggleModal, title, confirmText }
) => {

    const [confirmationText, setConfirmationText] = useState('');

    const handleModification = async (e) => {
        e.preventDefault()
        if (confirmationText === confirmText) {
            try {
                if (confirmText === 'DELETE') {
                    await deleteAccount();
                }
                else {
                    await resetAccount();
                }
            } catch (error) {
                alert("Action failed. Please try again.");
            } finally {
                toggleModal();
                setConfirmationText('');
                //navigate to login page
                navigation.navigate('/login');
            }
        }
    }

    const primaryColor = confirmText === 'DELETE' ? 'red' : 'yellow';

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animation-fadeIn">

                <button
                    onClick={toggleModal}
                    className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
                >
                    <X className='w-6 h-6' />
                </button>

                <div className="flex justify-center mb-4">
                    <div className={`bg-${primaryColor}-100 p-4 rounded-full`}>
                        <AlertTriangle className={`w-12 h-12 text-${primaryColor}-700`} />
                    </div>
                </div>

                <h2 className='text-2xl font-bold text-gray-800 text-center mb-2'>
                    {title || 'Delete Account'}
                </h2>
                <p className='text-gray-600 text-center mb-6'>
                    This action cannot be undone. All your data will be permanently deleted.
                </p>

                <form onSubmit={handleModification} className='space-y-4'>
                    <div>
                        <label htmlFor="modifyConfirm" className="block text-sm font-semibold text-gray-700 mb-2">
                            Type <span className={`font-bold text-${primaryColor}-700`}>{confirmText}</span> to confirm
                        </label>
                        <input
                            type="text"
                            id="modifyConfirm"
                            value={confirmationText}
                            onChange={(e) => setConfirmationText(e.target.value)}
                            className={`w-full border-2 border-gray-200 rounded-lg px-4 py-2 
                            focus:outline-none
                            focus:ring-2 focus:ring-${primaryColor}-500
                            focus:border-transparent
                            transition-all`}
                            placeholder={`Type ${confirmText}`}
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={toggleModal}
                            className="flex-1 bg-gray-200 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={confirmationText !== confirmText}
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${confirmationText === confirmText
                                    ? primaryColor === 'red' 
                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                        : 'bg-yellow-600 text-white hover:bg-yellow-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}>
                            {title || 'Delete Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModifyAccountModal