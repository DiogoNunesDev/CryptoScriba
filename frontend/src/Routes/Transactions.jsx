import React from 'react';
import Header from '../components/Header';

const Transactions = () => {
  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1>Transactions</h1>
        <p>View and manage transactions here.</p>
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

export default Transactions;
