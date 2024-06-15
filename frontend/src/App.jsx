import SignInPage from "./Routes/SignInPage";
import SignUpPage from "./Routes/SignUpPage";
import Balance from "./Routes/Balance";
import Backrooms from "./Routes/Backrooms";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

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
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                balance
              >
                <Balance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/backrooms"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                adminOnly={true}
              >
                <Backrooms />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
