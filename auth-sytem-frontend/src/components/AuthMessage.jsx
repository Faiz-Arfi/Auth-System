import React from 'react'

const AuthMessage = ({ message, type }) => {
    if (!message) return null;

    return (<>
        {type == 'error'? <div className="w-full text-center py-2 rounded-md shadow-red-200 text-red-500 bg-red-100">
            {message}
        </div> : null}
        {type == 'success'? <div className="w-full text-center py-2 rounded-md shadow-green-200 text-green-500 bg-green-100">
            {message}
        </div> : null}
        {type == 'warn'? <div className="w-full text-center py-2 rounded-md shadow-yellow-200 text-yellow-500 bg-yellow-100">
            {message}
        </div> : null}
        {type == 'info'? <div className="w-full text-center py-2 rounded-md shadow-blue-200 text-blue-500 bg-blue-100">
            {message}
        </div> : null}
    </>
    )
}

export default AuthMessage