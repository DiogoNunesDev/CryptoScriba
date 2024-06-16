import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { listUsers } from '../services/auth';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await listUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Calculate the users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1>Users</h1>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Full Name</th>
              <th style={styles.th}>Date Joined</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id} style={styles.tr}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.full_name}</td>
                <td style={styles.td}>{new Date(user.date_joined).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.pagination}>
          <button style={styles.button} onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button style={styles.button} onClick={nextPage} disabled={currentPage === Math.ceil(users.length / usersPerPage)}>
            Next
          </button>
        </div>
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
  table: {
    width: '80%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    color: 'white',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#333',
    color: 'white',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  tr: {
    backgroundColor: '#0B1A30',
    '&:nth-child(even)': { backgroundColor: '#1E2A38' },
    '&:hover': { backgroundColor: '#333' },
  },
  pagination: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 20px',
    margin: '0 5px',
    backgroundColor: '#FFA726',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    fontWeight: 600,
  },
};

export default Users;
