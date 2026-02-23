import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  alpha,
  useTheme,
} from "@mui/material";
import { Login as LoginIcon, Security } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  React.useEffect(() => {
    if (user) {
      redirectBasedOnRole(user.role);
    }
  }, [user]);

  const redirectBasedOnRole = (role) => {
    switch (role) {
      case "student":
        navigate("/student");
        break;
      case "university":
        navigate("/university");
        break;
      case "employer":
        navigate("/");
        break;
      default:
        navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(formData.email, formData.password);

      console.log("Login successful:", response);
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.error ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #16213e 50%, #0f3460 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Security
            sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #00ff88, #7b61ff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 1,
            }}
          >
            WELCOME BACK
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
            Sign in to your BlockCred account
          </Typography>
        </Box>

        <Card
          sx={{
            background: "linear-gradient(145deg, #1a1a2e, #16213e)",
            border: "1px solid rgba(0, 255, 136, 0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                margin="normal"
                required
                disabled={loading}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                margin="normal"
                required
                disabled={loading}
                sx={{ mb: 4 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={<LoginIcon />}
                sx={{
                  py: 1.5,
                  background: "linear-gradient(45deg, #00ff88, #00cc66)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #00cc66, #00a855)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0, 255, 136, 0.4)",
                  },
                  mb: 3,
                }}
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    style={{
                      color: theme.palette.primary.main,
                      textDecoration: "none",
                    }}
                  >
                    Create account
                  </Link>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 3 }}>
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 1,
              }}
            >
              <Typography
                sx={{ color: theme.palette.primary.main, fontSize: 20 }}
              >
                🔒
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
            >
              Secure
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: alpha("#7b61ff", 0.1),
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 1,
              }}
            >
              <Typography sx={{ color: "#7b61ff", fontSize: 20 }}>
                ⛓️
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
            >
              Blockchain
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: alpha("#00a8ff", 0.1),
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 1,
              }}
            >
              <Typography sx={{ color: "#00a8ff", fontSize: 20 }}>
                🌐
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
            >
              Global
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
