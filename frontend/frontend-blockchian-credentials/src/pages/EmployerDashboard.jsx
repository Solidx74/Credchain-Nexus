import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  alpha,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Business,
  Search,
  VerifiedUser,
  ContentCopy,
  History,
  AutoAwesome,
} from "@mui/icons-material";
import { credentialService } from "../services/credentialService";
import { useAuth } from "../context/AuthContext";

const EmployerDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [verificationHash, setVerificationHash] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [verificationHistory, setVerificationHistory] = useState([]);

  useEffect(() => {
    setVerificationHistory([
      {
        id: 1,
        credential_title: "Bachelor of Computer Science",
        student_name: "John Student",
        university_name: "Tech University",
        verified_at: new Date().toISOString(),
        status: "verified",
      },
      {
        id: 2,
        credential_title: "Master of Business Administration",
        student_name: "Jane Doe",
        university_name: "Business School",
        verified_at: new Date(Date.now() - 86400000).toISOString(),
        status: "verified",
      },
    ]);
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleVerify = async (e) => {
    if (e) e.preventDefault();

    if (!verificationHash.trim()) {
      setError("Please enter a verification hash");
      return;
    }

    setLoading(true);
    setError("");
    setVerificationResult(null);

    try {
      const result = await credentialService.verifyCredential(verificationHash);
      setVerificationResult(result);

      setVerificationHistory((prev) => [
        {
          id: prev.length + 1,
          credential_title: result.credential.title,
          student_name: result.credential.student_name,
          university_name: result.credential.university_name,
          verified_at: new Date().toISOString(),
          status: "verified",
          verified_by: result.verified_by || user.email,
          verifier_type: result.verifier_type || "employer",
        },
        ...prev,
      ]);

      showSnackbar("Credential verified successfully!");
    } catch (err) {
      setError("Credential not found or invalid blockchain hash");
      setVerificationResult(null);
      showSnackbar("Verification failed - Invalid hash", "error");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      showSnackbar(`${type} copied to clipboard!`);
    } catch (err) {
      showSnackbar("Failed to copy to clipboard", "error");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #16213e 50%, #0f3460 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #00ff88, #7b61ff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 2,
            }}
          >
            EMPLOYER DASHBOARD
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
            Welcome, {user?.name}. Instantly verify candidate credentials with
            blockchain technology.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: "1px solid rgba(0, 255, 136, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <Business
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "white", mb: 1 }}
                >
                  Employer
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Verification Portal
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              sx={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: "1px solid rgba(123, 97, 255, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <VerifiedUser
                  sx={{
                    fontSize: 40,
                    color: theme.palette.secondary.main,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "white", mb: 1 }}
                >
                  {verificationHistory.length}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Verifications
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              sx={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: "1px solid rgba(0, 168, 255, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <AutoAwesome
                  sx={{ fontSize: 40, color: theme.palette.info.main, mb: 2 }}
                />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "white", mb: 1 }}
                >
                  100%
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Accuracy
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              sx={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: "1px solid rgba(255, 193, 7, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <Search sx={{ fontSize: 40, color: "#ffc107", mb: 2 }} />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "white", mb: 1 }}
                >
                  Instant
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Results
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Verification Section */}
          <Grid item xs={12} lg={6}>
            <Card
              sx={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: "1px solid rgba(0, 255, 136, 0.2)",
                backdropFilter: "blur(10px)",
                mb: 4,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "white", mb: 3 }}
                >
                  VERIFY CREDENTIALS
                </Typography>

                <form onSubmit={handleVerify}>
                  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <TextField
                      fullWidth
                      value={verificationHash}
                      onChange={(e) => setVerificationHash(e.target.value)}
                      placeholder="Enter blockchain hash provided by candidate"
                      disabled={loading}
                      label="Blockchain Hash"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "& fieldset": {
                            borderColor: alpha(theme.palette.primary.main, 0.3),
                          },
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      startIcon={
                        loading ? <CircularProgress size={20} /> : <Search />
                      }
                      sx={{
                        px: 4,
                        background: "linear-gradient(45deg, #00ff88, #00cc66)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #00cc66, #00a855)",
                          transform: "translateY(-2px)",
                        },
                        minWidth: 140,
                      }}
                    >
                      {loading ? "VERIFYING..." : "VERIFY"}
                    </Button>
                  </Box>
                </form>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                {/* Verification Result */}
                {verificationResult && (
                  <Box
                    sx={{
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: 2,
                      p: 3,
                      background: alpha(theme.palette.primary.main, 0.1),
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 3,
                      }}
                    >
                      <VerifiedUser
                        sx={{ color: theme.palette.primary.main, fontSize: 40 }}
                      />
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ color: "white", fontWeight: "bold" }}
                        >
                          CREDENTIAL VERIFIED
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.primary.main }}
                        >
                          This credential is authentic and verified on the
                          blockchain
                        </Typography>
                      </Box>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "white", fontWeight: "bold" }}
                        >
                          {verificationResult.credential.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          Student: {verificationResult.credential.student_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          Issued by:{" "}
                          {verificationResult.credential.university_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            backgroundColor: alpha("#000", 0.3),
                            borderRadius: 1,
                            p: 2,
                            mt: 2,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: theme.palette.text.secondary,
                              display: "block",
                              mb: 1,
                            }}
                          >
                            BLOCKCHAIN HASH
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: "JetBrains Mono, monospace",
                                color: theme.palette.primary.main,
                                fontSize: "0.7rem",
                                wordBreak: "break-all",
                              }}
                            >
                              {verificationResult.credential.blockchain_hash}
                            </Typography>
                            <Button
                              size="small"
                              startIcon={<ContentCopy />}
                              onClick={() =>
                                copyToClipboard(
                                  verificationResult.credential.blockchain_hash,
                                  "Hash"
                                )
                              }
                              sx={{
                                color: theme.palette.primary.main,
                                minWidth: "auto",
                              }}
                            >
                              Copy
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Instructions */}
                <Box
                  sx={{
                    mt: 4,
                    p: 3,
                    background: alpha(theme.palette.info.main, 0.1),
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                    HOW TO VERIFY CREDENTIALS
                  </Typography>
                  <Box sx={{ spaceY: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      1. Ask candidates to share their blockchain verification
                      link
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      2. Or enter the 64-character blockchain hash directly
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      3. Click verify to check authenticity instantly
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Verification History */}
          <Grid item xs={12} lg={6}>
            <Card
              sx={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: "1px solid rgba(123, 97, 255, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{
                    p: 3,
                    borderBottom: `1px solid ${alpha(
                      theme.palette.secondary.main,
                      0.2
                    )}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    VERIFICATION HISTORY
                  </Typography>
                  <Chip
                    icon={<History />}
                    label={`${verificationHistory.length} VERIFICATIONS`}
                    sx={{
                      backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                      color: theme.palette.secondary.main,
                    }}
                  />
                </Box>

                <TableContainer
                  component={Paper}
                  sx={{
                    background: "transparent",
                    maxHeight: 400,
                  }}
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            color: theme.palette.secondary.main,
                            fontWeight: "bold",
                          }}
                        >
                          Credential
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.palette.secondary.main,
                            fontWeight: "bold",
                          }}
                        >
                          Student
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.palette.secondary.main,
                            fontWeight: "bold",
                          }}
                        >
                          University
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.palette.secondary.main,
                            fontWeight: "bold",
                          }}
                        >
                          Verified
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.palette.secondary.main,
                            fontWeight: "bold",
                          }}
                        >
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {verificationHistory.map((item) => (
                        <TableRow
                          key={item.id}
                          sx={{
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.secondary.main,
                                0.05
                              ),
                            },
                          }}
                        >
                          <TableCell
                            sx={{ color: "white", fontSize: "0.875rem" }}
                          >
                            {item.credential_title}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: "0.875rem",
                            }}
                          >
                            {item.student_name}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: "0.875rem",
                            }}
                          >
                            {item.university_name}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: "0.875rem",
                            }}
                          >
                            {formatDate(item.verified_at)}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label="VERIFIED"
                              size="small"
                              sx={{
                                backgroundColor: alpha(
                                  theme.palette.primary.main,
                                  0.2
                                ),
                                color: theme.palette.primary.main,
                                border: `1px solid ${alpha(
                                  theme.palette.primary.main,
                                  0.3
                                )}`,
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {verificationHistory.length === 0 && (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <History
                      sx={{
                        fontSize: 60,
                        color: theme.palette.text.secondary,
                        mb: 2,
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: theme.palette.text.secondary, mb: 1 }}
                    >
                      No verification history
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Start verifying credentials to see your history here
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card
              sx={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: "1px solid rgba(0, 168, 255, 0.2)",
                backdropFilter: "blur(10px)",
                mt: 4,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
                  QUICK ACTIONS
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<ContentCopy />}
                      onClick={() =>
                        copyToClipboard(
                          "Share this with candidates: " +
                            window.location.origin +
                            "/verify",
                          "Instructions"
                        )
                      }
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1
                          ),
                        },
                      }}
                    >
                      Copy Verification Link
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Business />}
                      onClick={() => window.open("/verify", "_blank")}
                      sx={{
                        borderColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.main,
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.secondary.main,
                            0.1
                          ),
                        },
                      }}
                    >
                      Open Verification Portal
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            sx={{
              background: "linear-gradient(145deg, #1a1a2e, #16213e)",
              border: `1px solid ${
                snackbar.severity === "error"
                  ? alpha("#ff6b6b", 0.3)
                  : alpha(theme.palette.primary.main, 0.3)
              }`,
              color: "white",
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default EmployerDashboard;
