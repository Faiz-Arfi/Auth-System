import React, { useState } from 'react'
import { FileWarning } from 'lucide-react'

const AuthDetailCard = ({ 
    theme = "light",
    title = "Title", 
    heading = "Heading", 
    subHeading = "Subheading",
    icon: Icon = FileWarning
}) => {
    const [isHovered, setIsHovered] = useState(false)
    const activeTheme = isHovered ? (theme === "light" ? "dark" : "light") : theme

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
        {activeTheme === "light" ?
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 border-b-8 border-b-gray-800 p-8 hover:shadow-1xl hover:scale-90 transition-all duration-300 max-w-sm">
            <div className="flex items-center justify-between gap-6">
                <div className="flex-1">
                    <div className="text-sm text-gray-100 font-bold uppercase tracking-wide mb-1 bg-gray-800 w-fit p-1 rounded-sm">{title}</div>
                    <div className="text-3xl font-bold text-gray-800 mb-1">{heading}</div>
                    <div className="text-xl font-semibold text-gray-600">{subHeading}</div>
                </div>
                {heading !== "INTERMEDIATE" && (
                    <div className="bg-gray-800 p-4 rounded-full">
                        <Icon className="text-gray-100 w-8 h-8" strokeWidth={2.5} />
                    </div>
                )}
            </div>
        </div>
        :
        <div className="bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-800 border-b-8 border-b-gray-700 p-8 hover:shadow-1xl hover:scale-90 transition-all duration-300 max-w-sm">
            <div className="flex items-center justify-between gap-6">
                <div className="flex-1">
                    <div className="text-sm text-gray-800 font-bold uppercase tracking-wide mb-1 bg-white w-fit p-1 rounded-sm">{title}</div>
                    <div className="text-3xl font-bold text-gray-100 mb-1">{heading}</div>
                    <div className="text-xl font-semibold text-gray-400">{subHeading}</div>
                </div>
                {heading !== "INTERMEDIATE" && (
                    <div className="bg-white p-4 rounded-full">
                        <Icon className="text-gray-800 w-8 h-8" strokeWidth={2.5} />
                    </div>
                )}
            </div>
        </div>
        }
        </div>
    )
}

export default AuthDetailCard