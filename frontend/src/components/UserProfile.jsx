import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/auth';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access');
      if (token) {
        const response = await getCurrentUser(token);
        setUser(response.data);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.full_name}</h1>
          <p>{user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
