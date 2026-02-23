import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  alpha,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  VerifiedUser,
  ContentCopy,
  Search,
  AutoAwesome,
  Security,
} from "@mui/icons-material";
import { credentialService } from "../services/credentialService";
import { useAuth } from "../context/AuthContext";

const VerificationPortal = () => {
  const { hash } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useAuth();
  const [verificationHash, setVerificationHash] = useState(hash || "");
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions

  useEffect(() => {
    if (hash) {
      handleVerify(hash);
    }
  }, [hash]);

  const handleVerify = async (providedHash = null) => {
    const hashToVerify = providedHash || verificationHash;

    if (!hashToVerify.trim()) {
      setError("Please enter a verification hash");
      return;
    }

    // PREVENT MULTIPLE SUBMISSIONS
    if (isSubmitting) {
      console.log(
        "🛑 Frontend: Ignoring duplicate submission - already processing"
      );
      return;
    }

    console.log("🚀 Frontend: Starting verification request...");
    setIsSubmitting(true);
    setLoading(true);
    setError("");
    setVerificationResult(null);

    try {
      const result = await credentialService.verifyCredential(hashToVerify);
      console.log(
        "✅ Frontend: Verification completed - Request ID:",
        result.request_id
      );

      setVerificationResult(result);
      if (!providedHash) {
        navigate(`/verify/${hashToVerify}`, { replace: true });
      }
    } catch (err) {
      console.error("❌ Frontend: Verification failed:", err);
      setError("Credential not found or invalid blockchain hash");
      setVerificationResult(null);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      // You can add a snackbar here if needed
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const resetVerification = () => {
    setVerificationHash("");
    setVerificationResult(null);
    setError("");
    navigate("/verify");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Box
            sx={{
              width: 100,
              height: 100,
              background: "linear-gradient(45deg, #00ff88, #7b61ff)",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <Security sx={{ fontSize: 50, color: "black" }} />
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #00ff88, #7b61ff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 2,
            }}
          >
            BLOCKCHAIN VERIFICATION
          </Typography>
          <Typography variant="h5" sx={{ color: theme.palette.text.secondary }}>
            Instantly verify academic credentials with cryptographic proof
          </Typography>
        </Box>

        {/* Main Verification Card */}
        <Card
          sx={{
            background: "linear-gradient(145deg, #1a1a2e, #16213e)",
            border: "1px solid rgba(0, 255, 136, 0.2)",
            backdropFilter: "blur(10px)",
            mb: 6,
          }}
        >
          <CardContent sx={{ p: 6 }}>
            {/* Verification Input Section */}
            {!verificationResult && (
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 4,
                  }}
                >
                  <Search
                    sx={{ fontSize: 40, color: theme.palette.primary.main }}
                  />
                </Box>

                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "white", mb: 2 }}
                >
                  VERIFY A CREDENTIAL
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 4,
                    maxWidth: 600,
                    mx: "auto",
                  }}
                >
                  Enter the blockchain hash or use the verification link
                  provided by the credential holder
                </Typography>

                <Box sx={{ maxWidth: 600, mx: "auto" }}>
                  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <TextField
                      fullWidth
                      value={verificationHash}
                      onChange={(e) => setVerificationHash(e.target.value)}
                      placeholder="Enter 64-character blockchain hash"
                      disabled={loading || isSubmitting}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "& fieldset": {
                            borderColor: alpha(theme.palette.primary.main, 0.3),
                          },
                          "&:hover fieldset": {
                            borderColor: alpha(theme.palette.primary.main, 0.5),
                          },
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleVerify()}
                      disabled={loading || isSubmitting}
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
                          boxShadow: "0 8px 25px rgba(0, 255, 136, 0.4)",
                        },
                        minWidth: 140,
                      }}
                    >
                      {loading ? "VERIFYING..." : "VERIFY"}
                    </Button>
                  </Box>

                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  )}

                  {/* Feature Highlights */}
                  <Grid container spacing={3} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.1
                            ),
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2,
                          }}
                        >
                          <Typography
                            sx={{
                              color: theme.palette.primary.main,
                              fontSize: 24,
                            }}
                          >
                            🔒
                          </Typography>
                        </Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "white", mb: 1 }}
                        >
                          Secure
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          Blockchain Protected
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: alpha("#7b61ff", 0.1),
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2,
                          }}
                        >
                          <Typography sx={{ color: "#7b61ff", fontSize: 24 }}>
                            ⚡
                          </Typography>
                        </Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "white", mb: 1 }}
                        >
                          Instant
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          Real-time Results
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: alpha("#00a8ff", 0.1),
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2,
                          }}
                        >
                          <Typography sx={{ color: "#00a8ff", fontSize: 24 }}>
                            🌐
                          </Typography>
                        </Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "white", mb: 1 }}
                        >
                          Global
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          24/7 Access
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            )}

            {/* Verification Result */}
            {verificationResult && (
              <Box sx={{ textAlign: "center" }}>
                {/* Success Header */}
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    background: "linear-gradient(45deg, #00ff88, #00cc66)",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 4,
                  }}
                >
                  <VerifiedUser sx={{ fontSize: 50, color: "black" }} />
                </Box>

                <Typography
                  variant="h3"
                  sx={{ fontWeight: "bold", color: "white", mb: 2 }}
                >
                  CREDENTIAL VERIFIED!
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.primary.main, mb: 6 }}
                >
                  This credential is authentic and verified on the blockchain
                </Typography>

                {/* Credential Details Card */}
                <Card
                  sx={{
                    background: "linear-gradient(145deg, #16213e, #0f3460)",
                    border: "1px solid rgba(0, 255, 136, 0.3)",
                    mb: 4,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    {/* Header */}
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
                        {verificationResult.credential.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "rgba(0, 0, 0, 0.8)" }}
                      >
                        Issued by{" "}
                        {verificationResult.credential.university_name}
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
                              STUDENT NAME
                            </Typography>
                            <Typography variant="h6" sx={{ color: "white" }}>
                              {verificationResult.credential.student_name}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Card
                          sx={{
                            background: alpha(
                              theme.palette.secondary.main,
                              0.1
                            ),
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
                              {formatDate(
                                verificationResult.credential.issue_date
                              )}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>

                    {/* Verifier Info */}
                    <Card
                      sx={{
                        background: alpha("#7b61ff", 0.1),
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
                          VERIFIED BY
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "white", fontWeight: "bold" }}
                        >
                          {verificationResult.verified_by}
                          <Chip
                            label={verificationResult.verifier_type.toUpperCase()}
                            size="small"
                            sx={{
                              ml: 1,
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.2
                              ),
                              color: theme.palette.primary.main,
                            }}
                          />
                        </Typography>
                      </CardContent>
                    </Card>

                    {/* Description */}
                    {verificationResult.credential.description && (
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
                            {verificationResult.credential.description}
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
                          <AutoAwesome
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
                            p: 3,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: theme.palette.text.secondary,
                              display: "block",
                              mb: 2,
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
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<ContentCopy />}
                    onClick={() =>
                      copyToClipboard(window.location.href, "Verification Link")
                    }
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        borderColor: theme.palette.primary.light,
                      },
                    }}
                  >
                    COPY VERIFICATION LINK
                  </Button>

                  <Button
                    variant="contained"
                    onClick={resetVerification}
                    sx={{
                      px: 4,
                      py: 1.5,
                      background: "linear-gradient(45deg, #00ff88, #7b61ff)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #00cc66, #5d42cc)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    VERIFY ANOTHER
                  </Button>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: "1px solid rgba(0, 255, 136, 0.1)",
                backdropFilter: "blur(10px)",
                textAlign: "center",
                p: 3,
              }}
            >
              <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                Tamper-Proof
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                Credentials are secured with blockchain technology, making them
                impossible to forge
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: "1px solid rgba(123, 97, 255, 0.1)",
                backdropFilter: "blur(10px)",
                textAlign: "center",
                p: 3,
              }}
            >
              <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                Instant Verification
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                Verify any credential in seconds with our real-time blockchain
                verification system
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                border: "1px solid rgba(0, 168, 255, 0.1)",
                backdropFilter: "blur(10px)",
                textAlign: "center",
                p: 3,
              }}
            >
              <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                Global Access
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                Access the verification system from anywhere in the world, 24/7
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VerificationPortal;
