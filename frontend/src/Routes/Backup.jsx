import React from 'react';
import Header from '../components/Header';
import { backupDatabase } from '../services/auth';

const Backup = () => {
  const handleBackup = async () => {
    try {
      const response = await backupDatabase();
      alert(response.data.message);
    } catch (error) {
      alert('Failed to create database backup: ' + error.message);
    }
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <button style={styles.button} onClick={handleBackup}>BACKUP</button>
        <p style={styles.text}>Last backup: dd/mm/yyyy</p>
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
  button: {
    padding: '20px 40px',
    backgroundColor: '#FFA726',
    border: 'none',
    borderRadius: '10px',
    fontSize: '20px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    fontWeight: 600,
    
  },
  text: {
    color: 'white',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    fontWeight: 600,
  }
};

export default Backup;
