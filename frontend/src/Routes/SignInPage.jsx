import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, verifyOTP, setupMFA } from '../services/auth';
import QRCode from 'qrcode.react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [mfaRequired, setMfaRequired] = useState(false);
  const [qrCodeUri, setQrCodeUri] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.data.mfa_required) {
        setMfaRequired(true);
        setMessage('MFA required. Please enter your OTP token.');
        // Store tokens in local storage
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        
        const mfaResponse = await setupMFA();
        if (mfaResponse.data.otp_uri) {
          setQrCodeUri(mfaResponse.data.otp_uri);
        }
      } else {
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        alert('Login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      alert('Login failed!');
      console.error('Login error:', error.response.data);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOTP(otpToken);
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      alert('OTP verification failed!');
      console.error('OTP verification error:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={mfaRequired ? handleVerifyOTP : handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={mfaRequired}
          />
        </div>
        {mfaRequired && (
          <div>
            <label>OTP Token:</label>
            <input
              type="text"
              value={otpToken}
              onChange={(e) => setOtpToken(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit">
          {mfaRequired ? 'Verify OTP' : 'Login'}
        </button>
      </form>
      {message && <p>{message}</p>}
      {qrCodeUri && (
        <div>
          <h3>Scan the QR Code with your Google Authenticator app:</h3>
          <QRCode value={qrCodeUri} />
        </div>
      )}
    </div>
  );
};

export default Login;
