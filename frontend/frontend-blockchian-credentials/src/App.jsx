import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import UniversityDashboard from "./pages/UniversityDashboard";
import VerificationPortal from "./pages/VerificationPortal";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import blockchainTheme from "./theme";
import EmployerDashboard from "./pages/EmployerDashboard";

const AuthRedirect = () => {
  const { user } = useAuth();

  if (user) {
    // If user is logged in, redirect based on role
    switch (user.role) {
      case "student":
        return <Navigate to="/student" replace />;
      case "university":
        return <Navigate to="/university" replace />;
      case "employer":
        return <Navigate to="/employer" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // If not logged in, show welcome page
  return <WelcomePage />;
};

function App() {
  return (
    <ThemeProvider theme={blockchainTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<AuthRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<VerificationPortal />} />
            <Route path="/verify/:hash" element={<VerificationPortal />} />

            {/* Protected Routes */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/university"
              element={
                <ProtectedRoute allowedRoles={["university"]}>
                  <UniversityDashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />

            <Route
              path="/employer"
              element={
                <ProtectedRoute allowedRoles={["employer"]}>
                  <EmployerDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
