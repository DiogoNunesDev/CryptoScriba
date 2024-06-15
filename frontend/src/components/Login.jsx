import React, { useState } from "react";
import { login, setupMFA, verifyOTP } from "../services/auth"; 
import { useNavigate } from "react-router-dom"; 
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

        try {
          const mfaResponse = await setupMFA();
          if (mfaResponse.data.otp_uri) {
            setQrCodeUri(mfaResponse.data.otp_uri);
          }
        } catch (setupError) {
          if (setupError.response && setupError.response.data.detail === 'MFA already configured') {
            // MFA is already configured, proceed without setting up again
            setQrCodeUri('');
          } else {
            throw setupError;
          }
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
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
          alignItems: "center",
        }}
      >
        <input
          style={{
            width: 500,
            height: 40,
            borderColor: "#F9AB2B",
            borderWidth: 5,
            borderStyle: "solid",
            paddingLeft: 10,
            color: "white",
            borderRadius: 20,
            backgroundColor: "TRANSPARENT",
            fontSize: "1.5rem",
          }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          style={{
            width: 500,
            height: 40,
            borderColor: "#F9AB2B",
            borderWidth: 5,
            borderStyle: "solid",
            paddingLeft: 10,
            color: "white",
            borderRadius: 20,
            backgroundColor: "TRANSPARENT",
            fontSize: "1.5rem",
          }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
          style={{
            width: 500,
            height: 40,
            color: "#000000",
            borderRadius: 20,
            backgroundColor: "#F9AB2B",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      {mfaRequired && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            color: "white",
            padding: 20,
          }}
        >
          <p>{message}</p>
          {qrCodeUri && (
            <div style={{ marginBottom: 20 }}>
              <QRCode value={qrCodeUri} />
            </div>
          )}
          <form
            onSubmit={handleVerifyOTP}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              alignItems: "center",
            }}
          >
            <input
              style={{
                width: 300,
                height: 40,
                borderColor: "#F9AB2B",
                borderWidth: 5,
                borderStyle: "solid",
                paddingLeft: 10,
                color: "black",
                borderRadius: 20,
                backgroundColor: "TRANSPARENT",
                fontSize: "1.5rem",
              }}
              type="text"
              value={otpToken}
              onChange={(e) => setOtpToken(e.target.value)}
              placeholder="OTP Token"
            />
            <button
              type="submit"
              style={{
                width: 300,
                height: 40,
                color: "#000000",
                borderRadius: 20,
                backgroundColor: "#F9AB2B",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              Verify OTP
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
