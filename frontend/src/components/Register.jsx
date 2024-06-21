import React, { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [full_name, setFull_Name] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, full_name, password);
      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        alignItems: "center",
      }}
      onSubmit={handleRegister}
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
          backgroundColor: "#142636",
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
          backgroundColor: "#142636",
          fontSize: "1.5rem",
        }}
        type="text"
        value={full_name}
        onChange={(e) => setFull_Name(e.target.value)}
        placeholder="Full Name"
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
          backgroundColor: "#142636",
          fontSize: "1.5rem",
        }}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        style={{
          width: 500,
          height: 40,
          color: "#000000",
          borderRadius: 20,
          backgroundColor: "#F9AB2B",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
