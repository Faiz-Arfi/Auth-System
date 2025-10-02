import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../api/auth';

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

  return (<>
    <div className="stats">
        <div className="stat">
            Registered On:
            <div className="stat-value">31/08/2025</div>
        </div>
        <div className="stat">
            Last Log-in:
            <div className="stat-value">31/08/2025</div>
        </div>
        <div className="stat">
            Number of Log-ins:
            <div className="stat-value">1</div>
        </div>
    </div>
  </>
  )
}

export default UserPage