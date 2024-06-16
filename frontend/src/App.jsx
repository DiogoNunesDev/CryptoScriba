import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignInPage from "./Routes/SignInPage";
import SignUpPage from "./Routes/SignUpPage";
import Balance from "./Routes/Balance";
import Backrooms from "./Routes/Backrooms";
import Users from "./Routes/Users";
import CoinsAdmin from "./Routes/CoinsAdmin";
import Transactions from "./Routes/Transactions";
import Logs from "./Routes/Logs";
import Backup from "./Routes/Backup";
import CoinsUser from "./Routes/CoinsUser";
import WalletUser from "./Routes/WalletUser";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Profile from "./Routes/Profile";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("access") ? true : false
  );
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("is_staff"));

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Balance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/backrooms"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly={true}>
                <Backrooms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly={true}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coins-admin"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly={true}>
                <CoinsAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly={true}>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logs"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly={true}>
                <Logs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/backup"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly={true}>
                <Backup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coins"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CoinsUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <WalletUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
