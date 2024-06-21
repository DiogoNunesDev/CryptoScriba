import React from 'react';
import Header from '../components/Header';

const Backrooms = () => {
  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>CryptoScriba_</h1>
        <p style={styles.subtitle}>backrooms_</p>
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
    color: 'white',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    fontWeight: 600,
  },
  title: {
    fontSize: '9em',  
    color: '#FFA726', 
    margin: 0,
  },
  subtitle: {
    fontSize: '7em',  
    color: 'white',  
    fontFamily: 'monospace', 
  },
};

export default Backrooms;
