import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../api/auth';
import AuthDetailCard from '../components/user-page/AuthDetailCard';
import { CopyPlusIcon, Key, ListPlusIcon, Lock, Logs, LucideBadgeInfo, UserPlus, UserStarIcon } from 'lucide-react';
import InfoCard from '../components/user-page/InfoCard';
import ActivityCard from '../components/user-page/ActivityCard';

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
            Welcome Back, <span className="text-green-600">Alpha Beta Gamma</span>
          </h1>
        </div>

        <InfoCard title='Quick Info' instruction='Here are your basic authentication details and account statistics. 
            Hover over any card to see the theme toggle effect.'/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <AuthDetailCard title='A/C created on' heading='25th Jan' subHeading='2025' icon={UserPlus}/>
          <AuthDetailCard theme='dark' title='No of logins' heading='142' subHeading='times'/>
          <AuthDetailCard title='Last Login' heading='28th Nov' subHeading='2025'/>
          <AuthDetailCard theme='dark' title='A/C Status' heading='Active' subHeading='Verified'/>
        </div>

        <InfoCard title='Activity Zone' instruction='Try some fun activities which will demonstrate the robustness of this platform.' icon={LucideBadgeInfo}/>

        <div className="Activity-zone quick-info grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <ActivityCard theme='dark' title='Activity 1' heading='Change Role ' subHeading='Click here to Proceed' icon={UserStarIcon}/>
          <ActivityCard theme='light' title='Activity 2' heading='Change Password ' subHeading='Click here to Proceed' icon={Key}/>
          <ActivityCard theme='dark' title='Activity 3' heading='Activity Logs' subHeading='Click here to Proceed' icon={Logs}/>
          <ActivityCard theme='light' title='Activity 4' heading='2nd Device' subHeading='Click here to Proceed' icon={ListPlusIcon}/>
        </div>
        <InfoCard title='Bonus Activity' instruction='Complete this activity to get the legend tag on you status and transform the site .' icon={CopyPlusIcon}/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <ActivityCard title='Last Activity' heading='Become a Legend ' subHeading='Click here to Proceed' icon={UserStarIcon} isCompleted={false} coinValue={500}/>
          <ActivityCard theme='dark' title='Last Activity' heading='Complete previous' subHeading='activities to Unlock' icon={Lock} isCompleted={false} coinValue={500}/>
        </div>
      </div>

    </div>
  )
}

export default UserPage