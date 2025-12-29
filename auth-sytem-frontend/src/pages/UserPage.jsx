import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../api/auth';
import AuthDetailCard from '../components/user-page/AuthDetailCard';
import { CopyPlusIcon, Crown, History, Key, Lock, LogInIcon, Logs, LucideBadgeInfo, Star, UserCog, UserPlus, UserStarIcon } from 'lucide-react';
import InfoCard from '../components/user-page/InfoCard';
import ActivityCard from '../components/user-page/ActivityCard';
import { Link } from 'react-router-dom';

const UserPage = () => {

  const [user, setUser] = useState(null);
  const [numberOfLogins, setNumberOfLogins] = useState(0);
  const [lastLoginDate, setLastLoginDate] = useState(null);
  const [lastLoginTime, setLastLoginTime] = useState(null);
  const [accountCreatedOnDate, setAccountCreatedOnDate] = useState(null);
  const [accountCreatedOnTime, setAccountCreatedOnTime] = useState(null);
  const [role, setRole] = useState("Not Set");
  const [userName, setUserName] = useState("");
  const [points, setPoints] = useState(0);
  const [activity1Status, setActivity1Status] = useState(false);
  const [activity2Status, setActivity2Status] = useState(false);
  const [activity3Status, setActivity3Status] = useState(false);
  const [activity4Status, setActivity4Status] = useState(false);
  const [activity5Status, setActivity5Status] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        const response = await getCurrentUser();
        
        setUser(response);
        setRole(response.role || "User");
        localStorage.setItem('role', response.role || "User");
        setUserName(response.userName || "");
        setNumberOfLogins(response.authInfo.noOfLogins || 0);
        setPoints(response.points || 0);
        localStorage.setItem('points', response.points || 0);
        setActivity1Status(response.activity1Status || false);
        setActivity2Status(response.activity2Status || false);
        setActivity3Status(response.activity3Status || false);
        setActivity4Status(response.activity4Status || false);
        setActivity5Status(response.activity5Status || false);
        localStorage.setItem('activity2Status', response.activity2Status || false);
        localStorage.setItem('activity3Status', response.activity3Status || false);
        localStorage.setItem('activity4Status', response.activity4Status || false);

        
        if (response.authInfo.previousLogin) {
          setLastLoginDate(extractDate(response.authInfo.previousLogin));
          setLastLoginTime(extractTime(response.authInfo.previousLogin));
        }
        if (response.authInfo.createdAt) {
          setAccountCreatedOnDate(extractDate(response.authInfo.createdAt));
          setAccountCreatedOnTime(extractTime(response.authInfo.createdAt));
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
    fetchUserData();
  }, []);

  const extractDate = (dateString) => {
    const date = new Date(dateString).toISOString().split('T')[0];
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-GB', options).toUpperCase();
  }

  const extractTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString(undefined, options);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto mb-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Welcome Back, <span className="text-green-600">{userName}</span>
          </h1>
        </div>

        <InfoCard title='Quick Info' instruction='Here are your basic authentication details and account statistics. 
            Hover over any card to see the theme toggle effect.'/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <AuthDetailCard title='A/C created on' heading={accountCreatedOnTime} subHeading={accountCreatedOnDate} icon={UserPlus}/>
          <AuthDetailCard theme='dark' title='No of logins' heading={numberOfLogins} subHeading='times' icon={LogInIcon} />
          <AuthDetailCard title='Prev Login' heading={lastLoginTime} subHeading={lastLoginDate} icon={History}/>
          <AuthDetailCard theme='dark' title='A/C Status' heading={role} subHeading='Verified' icon={Crown}/>
        </div>

        <InfoCard title='Activity Zone' instruction='Try some fun activities which will demonstrate the robustness of this platform.' icon={LucideBadgeInfo}/>

        <div className="Activity-zone quick-info grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">

          {/* Change Role */}
          <Link to="../user/change-role">
            <ActivityCard theme='dark' title='Activity 1' heading='Change Role ' subHeading='Click here to Proceed' icon={UserStarIcon} coinValue={50} isCompleted={activity1Status}/>
          </Link>

          {/* change password */}
          <Link to="../user/change-password">
            <ActivityCard theme='light' title='Activity 2' heading='Change Password ' subHeading='Click here to Proceed' icon={Key} coinValue={150} isCompleted={activity2Status}/>
          </Link>
          <Link to="../user/activity-log">
            <ActivityCard theme='dark' title='Activity 3' heading='Activity Logs' subHeading='Click here to Proceed' icon={Logs} coinValue={400} isCompleted={activity3Status}/>
          </Link>
          <Link to="../user/profile-setting">
            <ActivityCard theme='light' title='Activity 4' heading='Profile Setting' subHeading='Click here to Proceed' icon={UserCog} isCompleted={activity4Status}/>
          </Link>
        </div>
        <InfoCard title='Bonus Activity' instruction='Complete this activity to get the legend tag on you status and transform the site .' icon={CopyPlusIcon}/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {activity4Status ?
          <ActivityCard title='Last Activity' heading='You Are Awesome ' subHeading='Click here to Proceed' icon={Star} isCompleted={activity5Status} coinValue={500}/> 
          :
          <ActivityCard theme='dark' title='Last Activity' heading='Complete previous' subHeading='activities to Unlock' icon={Lock} isCompleted={activity5Status} coinValue={500}/>
        }
          
        </div>
      </div>

    </div>
  )
}

export default UserPage