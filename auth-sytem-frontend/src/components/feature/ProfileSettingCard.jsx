import React from 'react'
import { Link } from 'react-router-dom'

const ProfileSettingCard = (
    { name = "Profile Setting",
        description = "Manage your profile setting here.",
        link,
        toggleModal
    }
) => {
    const handleClick = () => {
        if (toggleModal) {
            toggleModal();
        }
    }

    const cardContent = (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 mt-6 hover:shadow-xl transition-shadow cursor-pointer">
            <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
        </div>
    );

    return (
        <div>
            {toggleModal ? (
                <div onClick={handleClick}>
                    {cardContent}
                </div>
            ) : (
                <Link to={link}>
                    {cardContent}
                </Link>
            )}
        </div>
    )
}

export default ProfileSettingCard