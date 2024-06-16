import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { logsList } from '../services/auth';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await logsList();
        setLogs(response.data);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      }
    };

    fetchLogs();
  }, []);

  // Calculate the logs to display on the current page
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  const nextPage = () => {
    if (currentPage < Math.ceil(logs.length / logsPerPage)) {
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
        <h1>Logs</h1>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Action</th>
              <th style={styles.th}>Timestamp</th>
              <th style={styles.th}>Details</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.map(log => (
              <tr key={log.id} style={styles.tr}>
                <td style={styles.td}>{log.user}</td>
                <td style={styles.td}>{log.action}</td>
                <td style={styles.td}>{new Date(log.timestamp).toLocaleString()}</td>
                <td style={styles.td}>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.pagination}>
          <button style={styles.button} onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button style={styles.button} onClick={nextPage} disabled={currentPage === Math.ceil(logs.length / logsPerPage)}>
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

export default Logs;
