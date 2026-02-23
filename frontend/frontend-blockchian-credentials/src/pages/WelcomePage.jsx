import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Chip,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Security,
  School,
  VerifiedUser,
  ArrowForward,
  AutoAwesome,
  Code,
  Lock,
  AccountBalance,
} from "@mui/icons-material";

const WelcomePage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #16213e 50%, #0f3460 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, ${alpha(
              theme.palette.primary.main,
              0.1
            )} 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${alpha(
              theme.palette.secondary.main,
              0.1
            )} 0%, transparent 50%),
            linear-gradient(45deg, transparent 30%, ${alpha(
              "#00a8ff",
              0.05
            )} 100%)
          `,
          animation: "pulse 8s ease-in-out infinite alternate",
          "@keyframes pulse": {
            "0%": { opacity: 0.3 },
            "100%": { opacity: 0.6 },
          },
        }}
      />

      {/* Grid Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          opacity: 0.3,
        }}
      />

      {/* Header/Navigation */}
      {/* <AppBar position="static" elevation={0}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <AutoAwesome sx={{ mr: 2, color: theme.palette.primary.main }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(45deg, #00ff88, #7b61ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              BLOCKCRED
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              sx={{
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #00ff88, #7b61ff)",
                "&:hover": {
                  background: "linear-gradient(45deg, #00cc66, #5d42cc)",
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </AppBar> */}

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            textAlign: "center",
            py: 15,
          }}
        >
          <Chip
            icon={<Code />}
            label="BLOCKCHAIN POWERED"
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              mb: 3,
              fontWeight: "bold",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          />

          <Typography
            variant="h1"
            sx={{
              mb: 3,
              textShadow: "0 0 30px rgba(0, 255, 136, 0.5)",
            }}
          >
            ACADEMIC CREDENTIALS
          </Typography>

          <Typography
            variant="h2"
            sx={{
              mb: 3,
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: "300",
            }}
          >
            VERIFIED ON CHAIN
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 5,
              opacity: 0.8,
              maxWidth: "600px",
              mx: "auto",
              fontWeight: 300,
              color: theme.palette.text.secondary,
            }}
          >
            Secure, transparent, and immutable verification of academic
            credentials powered by blockchain technology. Fight fraud with
            cryptographic proof.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                background: "linear-gradient(45deg, #00ff88, #00cc66)",
                "&:hover": {
                  background: "linear-gradient(45deg, #00cc66, #00a855)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 255, 136, 0.4)",
                },
              }}
            >
              VERIFY CREDENTIALS
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  borderColor: theme.palette.primary.light,
                  transform: "translateY(-2px)",
                },
              }}
            >
              VIEW DEMO
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10, position: "relative", zIndex: 1 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 2,
            background: "linear-gradient(45deg, #00ff88, #7b61ff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          WHY BLOCKCRED?
        </Typography>

        <Typography
          variant="h6"
          align="center"
          sx={{
            mb: 6,
            color: theme.palette.text.secondary,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          Revolutionizing academic verification with decentralized trust
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 16px 48px rgba(0, 255, 136, 0.2)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #00ff88, #00cc66)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <Lock sx={{ fontSize: 40, color: "black" }} />
                </Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  IMMUTABLE SECURITY
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Every credential is cryptographically sealed on the
                  blockchain, making forgery mathematically impossible.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 16px 48px rgba(123, 97, 255, 0.2)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #7b61ff, #5d42cc)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <VerifiedUser sx={{ fontSize: 40, color: "white" }} />
                </Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  INSTANT VERIFICATION
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Verify any academic credential in real-time with our
                  decentralized verification protocol.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 16px 48px rgba(0, 168, 255, 0.2)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #00a8ff, #0077cc)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <AccountBalance sx={{ fontSize: 40, color: "white" }} />
                </Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  GLOBAL ACCESS
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Decentralized network ensures 24/7 global access for
                  institutions, employers, and students worldwide.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, rgba(10, 10, 15, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)",
          borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={12} sm={4}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                  textShadow: "0 0 20px rgba(0, 255, 136, 0.5)",
                }}
              >
                10K+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                CREDENTIALS VERIFIED
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.secondary.main,
                  textShadow: "0 0 20px rgba(123, 97, 255, 0.5)",
                }}
              >
                50+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                UNIVERSITIES ON CHAIN
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.info.main,
                  textShadow: "0 0 20px rgba(0, 168, 255, 0.5)",
                }}
              >
                99.9%
              </Typography>
              <Typography variant="h6" color="text.secondary">
                UPTIME RELIABILITY
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container
        maxWidth="md"
        sx={{ py: 10, textAlign: "center", position: "relative", zIndex: 1 }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          READY TO GO ON CHAIN?
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Join the decentralized revolution in academic credential verification.
        </Typography>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
          sx={{
            px: 6,
            py: 1.5,
            fontSize: "1.1rem",
            background: "linear-gradient(45deg, #00ff88, #7b61ff)",
            "&:hover": {
              background: "linear-gradient(45deg, #00cc66, #5d42cc)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(0, 255, 136, 0.4)",
            },
          }}
        >
          START VERIFICATION
        </Button>
      </Container>
    </Box>
  );
};

export default WelcomePage;
