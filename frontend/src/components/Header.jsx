import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CryptoScriba_.png';
import '../components/styles/header.css';
import { getCurrentUser, logout } from '../services/auth';

const Header = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser();
        console.log('Current user:', response);
        setUserType(response.data.isAdmin ? 'admin' : 'user');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refresh');
    console.log('Logging out with refresh token:', refreshToken);
    logout(refreshToken)
      .then(() => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/');
      })
      .catch(error => console.error('Error logging out:', error));
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <nav className="nav-links">
        {userType === 'admin' ? (
          <>
            <div className="nav-link" onClick={() => navigateTo('/users')}>USERS</div>
            <div className="nav-link" onClick={() => navigateTo('/coins-admin')}>COINS</div>
            <div className="nav-link" onClick={() => navigateTo('/logs')}>LOGS</div>
            <div className="nav-link" onClick={() => navigateTo('/backup')}>BACKUP</div>
          </>
        ) : (
          <>
            <div className="nav-link" onClick={() => navigateTo('/wallet')}>WALLET</div>
            <div className="nav-link" onClick={() => navigateTo('/transactions')}>TRANSACTIONS</div>
            <div className="nav-link" onClick={() => navigateTo('/coins')}>COINS</div>
            <div className="nav-link" onClick={() => navigateTo('/profile')}>PROFILE</div>
          </>
        )}
      </nav>
      <button className="logout-button" onClick={handleLogout}>Log out</button>
    </header>
  );
};

export default Header;
