import React from 'react'

const InfoCardWithButton = ({
  title,
  description,
  buttonText,
  onButtonClick,
  icon: Icon,
  disabled = false
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 mb-4">
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <Icon className="w-10 h-10 text-green-600" strokeWidth={1.5} />
          </div>
        </div>
      )}

      <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">
        {title}
      </h3>

      <p className="text-gray-600 text-center mb-6 leading-relaxed">
        {description}
      </p>

      {buttonText && onButtonClick && (
        <div className="flex justify-center">
          <button
            onClick={onButtonClick}
            disabled={disabled}
            className={`
              px-6 py-3 rounded-lg font-semibold transition-all duration-300
              ${disabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md transform hover:scale-105'
              }
            `}
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  )
}

export default InfoCardWithButton