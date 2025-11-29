import { LightbulbIcon } from 'lucide-react'
import React from 'react'

const InfoCard = ({
    title = "Title",
    instruction = "Instruction goes here",
    icon : Icon = LightbulbIcon
}) => {
  return (
    <div>
        <div className="bg-white rounded-xl shadow-lg p-2 mb-6 border-l-4 border-green-600 flex items-center gap-6">
            <div className="bg-green-600 p-3 w-fit rounded-full">
                <Icon className="text-gray-100 w-8 h-8" strokeWidth={1.5}/>
            </div>
            <div className="flex-col mt-4 gap-2">
                <div className="text-green-600 font-bold text-xl mb-1">
                    {title}
                </div>
                <div className="text-gray-700 mb-3"> {instruction}</div>
            </div>
        </div>
    </div>
  )
}

export default InfoCard