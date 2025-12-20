import React, { use, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ActivityLogItem from '../../components/feature/ActivityLogItem'
import CalendarView from '../../components/feature/CalendarView'
import { getActivityLogsOfDate } from '../../api/profile'

const ActivityLog = () => {

  const [date, setDate] = useState(new Date());
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDateChange = async (selectedDate) => {
    setDate(selectedDate);
    setLoading(true);
    try {
      const response = await getActivityLogsOfDate(selectedDate);
      setActivityLogs(response.content || []);
    } catch (error) {
      console.error('Error fetching activity logs for date', selectedDate, ':', error);
      setActivityLogs([]);
    } finally {
      setLoading(false);
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }

  const mapSeverityToType = (severity) => {
    const severityMap = {
      'BASIC': 'Basic',
      'MODERATE': 'Moderate',
      'ATTENTION_REQUIRED': 'Attention Required'
    };
    return severityMap[severity] || 'Basic';
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
    onDateChange(today);
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
        
        {loading ? (
          <div className='text-center py-8'>
            <p className='text-gray-600'>Loading activity logs...</p>
          </div>
        ) : activityLogs.length > 0 ? (
          activityLogs.map((log) => (
            <ActivityLogItem 
              key={log.id}
              time={formatTime(log.recordedAt)}
              description={log.description}
              type={mapSeverityToType(log.severity)}
            />
          ))
        ) : (
          <div className='text-center py-8 bg-white rounded-xl shadow-md border border-gray-200'>
            <p className='text-gray-600'>No activity logs found for this date.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityLog