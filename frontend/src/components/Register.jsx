import React, { useState } from 'react';
import { register } from '../services/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, fullName, password);
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed!');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
