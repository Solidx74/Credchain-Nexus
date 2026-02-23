import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  alpha,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  School,
  ContentCopy,
  Visibility,
  VerifiedUser,
  AutoAwesome,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { credentialService } from "../services/credentialService";

const StudentDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const response = await credentialService.getStudentCredentials();
      setCredentials(response.credentials || []);
    } catch (error) {
      console.error("Error fetching credentials:", error);
      showSnackbar("Error fetching credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      showSnackbar(`${type} copied to clipboard!`);
    } catch (err) {
      showSnackbar("Failed to copy to clipboard", "error");
    }
  };

  const getVerificationLink = (hash) => {
    return `${window.location.origin}/verify/${hash}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
          <CircularProgress
            size={60}
            sx={{ color: theme.palette.primary.main, mb: 2 }}
          />
          <Typography variant="h6" sx={{ color: "white" }}>
            Loading your credentials...
          </Typography>
        </Box>
      </Box>
    );
  }

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
            STUDENT DASHBOARD
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
            Welcome back, {user?.name}. Manage your blockchain-verified
            credentials.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: "1px solid rgba(0, 255, 136, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      background: "linear-gradient(45deg, #00ff88, #00cc66)",
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <School sx={{ fontSize: 30, color: "black" }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      {credentials.length}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Total Credentials
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: "1px solid rgba(123, 97, 255, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      background: "linear-gradient(45deg, #7b61ff, #5d42cc)",
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <VerifiedUser sx={{ fontSize: 30, color: "white" }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      {credentials.length}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Verified
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: "1px solid rgba(0, 168, 255, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      background: "linear-gradient(45deg, #00a8ff, #0077cc)",
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AutoAwesome sx={{ fontSize: 30, color: "white" }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      100%
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Blockchain Secured
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Credentials Section */}
        <Card
          sx={{
            background: "linear-gradient(145deg, #1a1a2e, #16213e)",
            border: "1px solid rgba(0, 255, 136, 0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                MY CREDENTIALS
              </Typography>
              <Chip
                label={`${credentials.length} CREDENTIALS`}
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  color: theme.palette.primary.main,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  fontWeight: "bold",
                }}
              />
            </Box>

            {credentials.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <School
                  sx={{
                    fontSize: 80,
                    color: theme.palette.text.secondary,
                    mb: 2,
                    opacity: 0.5,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.text.secondary, mb: 2 }}
                >
                  No credentials yet
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    maxWidth: 400,
                    mx: "auto",
                  }}
                >
                  Your issued academic credentials will appear here. Contact
                  your university to issue blockchain-verified credentials.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {credentials.map((credential) => (
                  <Grid item xs={12} key={credential.id}>
                    <Card
                      sx={{
                        background: "linear-gradient(145deg, #16213e, #0f3460)",
                        border: "1px solid rgba(0, 255, 136, 0.1)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          border: "1px solid rgba(0, 255, 136, 0.3)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 32px rgba(0, 255, 136, 0.1)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 2,
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold", color: "white", mb: 1 }}
                            >
                              {credential.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: theme.palette.text.secondary,
                                mb: 2,
                              }}
                            >
                              {credential.description ||
                                "No description provided"}
                            </Typography>

                            <Box
                              sx={{
                                display: "flex",
                                gap: 3,
                                flexWrap: "wrap",
                                mb: 2,
                              }}
                            >
                              <Chip
                                icon={<VerifiedUser />}
                                label="ISSUED BY"
                                size="small"
                                variant="outlined"
                                sx={{
                                  borderColor: alpha(
                                    theme.palette.primary.main,
                                    0.3
                                  ),
                                  color: theme.palette.primary.main,
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: theme.palette.primary.main }}
                              >
                                {credential.university_name}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: theme.palette.text.secondary }}
                              >
                                Issued: {formatDate(credential.issue_date)}
                              </Typography>
                            </Box>

                            {/* Blockchain Hash */}
                            <Box
                              sx={{
                                backgroundColor: alpha(
                                  theme.palette.primary.main,
                                  0.1
                                ),
                                border: `1px solid ${alpha(
                                  theme.palette.primary.main,
                                  0.2
                                )}`,
                                borderRadius: 2,
                                p: 2,
                                mb: 2,
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
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontFamily: "JetBrains Mono, monospace",
                                    color: theme.palette.primary.main,
                                    fontSize: "0.75rem",
                                    wordBreak: "break-all",
                                  }}
                                >
                                  {credential.blockchain_hash}
                                </Typography>
                                <Button
                                  size="small"
                                  startIcon={<ContentCopy />}
                                  onClick={() =>
                                    copyToClipboard(
                                      credential.blockchain_hash,
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
                          </Box>
                        </Box>

                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                          <Button
                            variant="contained"
                            startIcon={<Visibility />}
                            onClick={() => setSelectedCredential(credential)}
                            sx={{
                              background:
                                "linear-gradient(45deg, #00ff88, #00cc66)",
                              "&:hover": {
                                background:
                                  "linear-gradient(45deg, #00cc66, #00a855)",
                              },
                            }}
                          >
                            View Details
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<ContentCopy />}
                            onClick={() =>
                              copyToClipboard(
                                getVerificationLink(credential.blockchain_hash),
                                "Verification Link"
                              )
                            }
                            sx={{
                              borderColor: theme.palette.primary.main,
                              color: theme.palette.primary.main,
                            }}
                          >
                            Copy Link
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>

        {/* Credential Detail Dialog */}
        <Dialog
          open={!!selectedCredential}
          onClose={() => setSelectedCredential(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              background: "linear-gradient(145deg, #1a1a2e, #16213e)",
              border: "1px solid rgba(0, 255, 136, 0.2)",
              backdropFilter: "blur(10px)",
            },
          }}
        >
          {selectedCredential && (
            <>
              <DialogTitle
                sx={{
                  borderBottom: `1px solid ${alpha(
                    theme.palette.primary.main,
                    0.2
                  )}`,
                  pb: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  CREDENTIAL DETAILS
                </Typography>
              </DialogTitle>
              <DialogContent sx={{ pt: 3 }}>
                {/* Credential Header */}
                <Box
                  sx={{
                    background: "linear-gradient(45deg, #00ff88, #7b61ff)",
                    borderRadius: 3,
                    p: 4,
                    mb: 4,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "black", mb: 1 }}
                  >
                    {selectedCredential.title}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "rgba(0, 0, 0, 0.8)" }}>
                    Issued by {selectedCredential.university_name}
                  </Typography>
                </Box>

                {/* Details Grid */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={12} md={6}>
                    <Card
                      sx={{
                        background: alpha(theme.palette.primary.main, 0.1),
                        border: "none",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.text.secondary,
                            display: "block",
                            mb: 1,
                          }}
                        >
                          ISSUE DATE
                        </Typography>
                        <Typography variant="h6" sx={{ color: "white" }}>
                          {formatDate(selectedCredential.issue_date)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card
                      sx={{
                        background: alpha(theme.palette.secondary.main, 0.1),
                        border: "none",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.text.secondary,
                            display: "block",
                            mb: 1,
                          }}
                        >
                          CREDENTIAL ID
                        </Typography>
                        <Typography variant="h6" sx={{ color: "white" }}>
                          #{selectedCredential.id}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* Description */}
                {selectedCredential.description && (
                  <Card
                    sx={{
                      background: alpha("#00a8ff", 0.1),
                      border: "none",
                      mb: 4,
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          display: "block",
                          mb: 1,
                        }}
                      >
                        DESCRIPTION
                      </Typography>
                      <Typography variant="body1" sx={{ color: "white" }}>
                        {selectedCredential.description}
                      </Typography>
                    </CardContent>
                  </Card>
                )}

                {/* Blockchain Verification */}
                <Card
                  sx={{
                    background: alpha(theme.palette.primary.main, 0.1),
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.3
                    )}`,
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 3,
                      }}
                    >
                      <VerifiedUser
                        sx={{ color: theme.palette.primary.main }}
                      />
                      <Box>
                        <Typography variant="h6" sx={{ color: "white" }}>
                          BLOCKCHAIN VERIFIED
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          This credential is permanently recorded on the
                          blockchain
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: alpha("#000", 0.3),
                        border: `1px solid ${alpha(
                          theme.palette.primary.main,
                          0.2
                        )}`,
                        borderRadius: 2,
                        p: 2,
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
                          gap: 2,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "JetBrains Mono, monospace",
                            color: theme.palette.primary.main,
                            fontSize: "0.75rem",
                            wordBreak: "break-all",
                            flex: 1,
                          }}
                        >
                          {selectedCredential.blockchain_hash}
                        </Typography>
                        <Button
                          size="small"
                          startIcon={<ContentCopy />}
                          onClick={() =>
                            copyToClipboard(
                              selectedCredential.blockchain_hash,
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
                  </CardContent>
                </Card>
              </DialogContent>
              <DialogActions
                sx={{
                  borderTop: `1px solid ${alpha(
                    theme.palette.primary.main,
                    0.2
                  )}`,
                  pt: 2,
                  px: 3,
                  pb: 3,
                }}
              >
                <Button
                  onClick={() => setSelectedCredential(null)}
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ContentCopy />}
                  onClick={() =>
                    copyToClipboard(
                      getVerificationLink(selectedCredential.blockchain_hash),
                      "Verification Link"
                    )
                  }
                  sx={{
                    background: "linear-gradient(45deg, #00ff88, #7b61ff)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #00cc66, #5d42cc)",
                    },
                  }}
                >
                  Copy Verification Link
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Snackbar for notifications */}
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

export default StudentDashboard;
