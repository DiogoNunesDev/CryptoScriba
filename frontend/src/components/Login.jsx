import React, { useState } from "react";
import { login } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      alert("Login successful!");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
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
  );
};

export default Login;
