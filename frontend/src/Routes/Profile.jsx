import React from 'react';
import Header from '../components/Header';

const Profile = () => {
  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1>Profile</h1>
        <p>User profile</p>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#0B1A30',
    color: 'white'
  },
};

export default Profile;
