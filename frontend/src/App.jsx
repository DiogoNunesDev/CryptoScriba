import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to the App</h1>} /> {/* Home page or welcome message */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute component={UserProfile} />} />
        <Route path="*" element={<h1>404 Not Found</h1>} /> {/* Fallback route for unmatched paths */}
      </Routes>
    </Router>
  );
};

export default App;
