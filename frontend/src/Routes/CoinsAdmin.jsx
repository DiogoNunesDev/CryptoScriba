import React from 'react';
import Header from '../components/Header';

const CoinsAdmin = () => {
  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1>Admin Coins</h1>
        <p>Manage admin-specific coins here.</p>
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

export default CoinsAdmin;
