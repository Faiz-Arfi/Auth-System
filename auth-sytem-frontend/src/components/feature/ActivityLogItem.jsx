import { Bell, Info, ShieldAlert, Clock } from 'lucide-react'
import React from 'react'

const ActivityLogItem = (
    {
        type = "Basic",
        description = "Activity description",
        time = "12:00 PM"
    }
) => {
    const getTypeStyles = () => {
        switch (type) {
            case 'Basic':
                return {
                    iconBg: 'bg-blue-500',
                    iconColor: 'text-white',
                    badge: 'bg-blue-100 text-blue-700 border-blue-200',
                    icon: <Info className='h-6 w-6' />
                }
            case 'Moderate':
                return {
                    iconBg: 'bg-yellow-500',
                    iconColor: 'text-white',
                    badge: 'bg-yellow-100 text-yellow-700 border-yellow-200',
                    icon: <Bell className='h-6 w-6' />
                }
            case 'Attention Required':
                return {
                    iconBg: 'bg-red-500',
                    iconColor: 'text-white',
                    badge: 'bg-red-100 text-red-700 border-red-200',
                    icon: <ShieldAlert className='h-6 w-6' />
                }
            default:
                return {
                    iconBg: 'bg-gray-500',
                    iconColor: 'text-white',
                    badge: 'bg-gray-100 text-gray-700 border-gray-200',
                    icon: <Info className='h-6 w-6' />
                }
        }
    }

    const styles = getTypeStyles()

    return (
        <div className='bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 p-4 mb-4 transition-all duration-200 hover:border-gray-300'>
            <div className='grid grid-cols-12 gap-4 items-center'>
                
                <div className='col-span-12 sm:col-span-2 flex justify-center sm:justify-start'>
                    <div className={`${styles.iconBg} ${styles.iconColor} p-3 rounded-full shadow-md`}>
                        {styles.icon}
                    </div>
                </div>

                <div className='col-span-12 sm:col-span-3 flex justify-center sm:justify-start'>
                    <span className={`${styles.badge} px-3 py-1.5 rounded-lg text-sm font-semibold border whitespace-nowrap`}>
                        {type}
                    </span>
                </div>

                <div className='col-span-12 sm:col-span-5 text-center sm:text-left'>
                    <p className='text-gray-700 font-medium text-base leading-relaxed'>
                        {description}
                    </p>
                </div>

                <div className='col-span-12 sm:col-span-2 flex items-center justify-center sm:justify-end gap-2'>
                    <Clock className='w-4 h-4 text-gray-400' />
                    <span className='text-gray-500 text-sm font-medium'>{time}</span>
                </div>
            </div>
        </div>
    )
}

export default ActivityLogItem