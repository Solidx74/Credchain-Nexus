import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #16213e 50%, #0f3460 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} sx={{ color: "#00ff88", mb: 2 }} />
          <Typography variant="h6" sx={{ color: "white" }}>
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #16213e 50%, #0f3460 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 100,
              height: 100,
              backgroundColor: "rgba(255, 107, 107, 0.1)",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <Typography sx={{ fontSize: 40 }}>🚫</Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{ color: "white", mb: 2, fontWeight: "bold" }}
          >
            ACCESS DENIED
          </Typography>
          <Typography variant="body1" sx={{ color: "#b0b0b0", mb: 4 }}>
            You don't have permission to access this page.
          </Typography>
          <Navigate to="/login" replace />
        </Box>
      </Box>
    );
  }

  return children;
};

export default ProtectedRoute;
