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
  MenuItem,
  alpha,
  useTheme,
} from "@mui/material";
import { HowToReg, Security } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      navigate("/login", {
        state: { message: "Registration successful! Please login." },
      });
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      <Container maxWidth="md">
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
            JOIN BLOCKCRED
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
            Create your blockchain credentials account
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          {/* Registration Form */}
          <Card
            sx={{
              flex: 1,
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
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  select
                  label="I am a"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  margin="normal"
                  required
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="university">
                    University Representative
                  </MenuItem>
                  <MenuItem value="employer">Employer</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  helperText="Minimum 6 characters"
                />

                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ mb: 4 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={<HowToReg />}
                  sx={{
                    py: 1.5,
                    background: "linear-gradient(45deg, #00ff88, #7b61ff)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #00cc66, #5d42cc)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 255, 136, 0.4)",
                    },
                  }}
                >
                  {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                </Button>

                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      style={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                      }}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Box>
              </form>
            </CardContent>
          </Card>

          {/* Role Benefits */}
          <Card
            sx={{
              flex: 1,
              background: "linear-gradient(145deg, #1a1a2e, #16213e)",
              border: "1px solid rgba(123, 97, 255, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "white" }}
              >
                CHOOSE YOUR ROLE
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary, mb: 3 }}
              >
                Different roles have different capabilities in the BlockCred
                ecosystem
              </Typography>

              <Box sx={{ spaceY: 2 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: "50%",
                      mt: 0.5,
                      mr: 2,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      STUDENT
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Receive and manage your blockchain-verified academic
                      credentials
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      backgroundColor: theme.palette.secondary.main,
                      borderRadius: "50%",
                      mt: 0.5,
                      mr: 2,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      UNIVERSITY
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Issue and manage blockchain-secured credentials for your
                      students
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      backgroundColor: theme.palette.info.main,
                      borderRadius: "50%",
                      mt: 0.5,
                      mr: 2,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      EMPLOYER
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Instantly verify candidate credentials with blockchain
                      technology
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
