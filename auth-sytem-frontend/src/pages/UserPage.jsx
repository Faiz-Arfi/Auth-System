import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../api/auth';
import AuthDetailCard from '../components/user-page/AuthDetailCard';
import { UserPlus } from 'lucide-react';
import InfoCard from '../components/user-page/InfoCard';

const UserPage = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
    fetchUserData();
    console.log("UserPage mounted");
    console.log(user);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto mb-4">
        
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Welcome Back, <span className="text-green-600">User</span>
          </h1>
        </div>

        <InfoCard title='Quick Info' instruction='Here are your basic authentication details and account statistics. 
            Hover over any card to see the theme toggle effect.'/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AuthDetailCard title='A/C created on' heading='25th Jan' subHeading='2025' icon={UserPlus}/>
          <AuthDetailCard theme='dark' title='No of logins' heading='142' subHeading='times'/>
          <AuthDetailCard title='Last Login' heading='28th Nov' subHeading='2025'/>
          <AuthDetailCard theme='dark' title='A/C Status' heading='Active' subHeading='Verified'/>
        </div>
      </div>

    </div>
  )
}

export default UserPage