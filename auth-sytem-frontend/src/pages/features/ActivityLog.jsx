import React, { use, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ActivityLogItem from '../../components/feature/ActivityLogItem'
import CalendarView from '../../components/feature/CalendarView'

const ActivityLog = () => {

  const [date, setDate] = useState(new Date());

  const onDateChange = (date) => {
    setDate(date);
  }

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  const today = new Date();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 p-8 md:p-10'>
      
      <div className="navigations mb-6">
        <Link to="../user/dashboard" className="text-blue-600 hover:underline">Dashboard</Link> &#8250;
        <Link to="/user/activity-log" className="text-green-800 hover:underline"> Activity Log</Link> &#8250;
      </div>

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          Your Account <span className="text-green-600">Activities</span>
        </h1>
        <p className="text-gray-600 text-lg">Pick the date you want to view log for</p>
      </div>

      <CalendarView initialDate={today} onDateChange={onDateChange}/>

      <div className='mt-6'>
        <div className='Date'>
          <h2 className='text-2xl md:3xl font-semibold text-gray-700'>{formatDate(date)}</h2>
        </div>
        <ActivityLogItem time="10:00 AM" description="Logged in to the account" type="Moderate"/>
        <ActivityLogItem time="10:30 AM" description="Changed password" type="Attention Required"/>
        <ActivityLogItem time="11:00 AM" description="Upgraded role to PRO" type="Basic" />

      </div>
    </div>
  )
}

export default ActivityLog