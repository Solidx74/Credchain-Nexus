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
  MenuItem,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  alpha,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import {
  School,
  Add,
  VerifiedUser,
  AutoAwesome,
  ContentCopy,
  PersonAdd,
  People,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { credentialService } from "../services/credentialService";
import { studentService } from "../services/studentService";

const UniversityDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [credentials, setCredentials] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [issueLoading, setIssueLoading] = useState(false);
  const [addStudentLoading, setAddStudentLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [addStudentDialogOpen, setAddStudentDialogOpen] = useState(false);

  const [issueForm, setIssueForm] = useState({
    student_id: "",
    title: "",
    description: "",
    issue_date: new Date().toISOString().split("T")[0],
  });

  const [addStudentForm, setAddStudentForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [credsResponse, studentsResponse] = await Promise.all([
        credentialService.getUniversityCredentials(),
        studentService.getStudents(),
      ]);
      setCredentials(credsResponse.credentials || []);
      setStudents(studentsResponse.students || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      showSnackbar("Error fetching data", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setAddStudentLoading(true);

    try {
      await studentService.addStudent(addStudentForm);
      showSnackbar("Student added successfully! Default password: student123");
      setAddStudentDialogOpen(false);
      setAddStudentForm({ name: "", email: "" });
      fetchData(); // Refresh students list
    } catch (error) {
      console.error("Error adding student:", error);
      showSnackbar(
        error.response?.data?.error || "Error adding student",
        "error"
      );
    } finally {
      setAddStudentLoading(false);
    }
  };

  const handleIssueCredential = async (e) => {
    e.preventDefault();
    setIssueLoading(true);

    try {
      const response = await credentialService.issueCredential(issueForm);
      showSnackbar(
        `Credential issued successfully! Hash: ${response.credential.blockchain_hash}`
      );
      setIssueDialogOpen(false);
      setIssueForm({
        student_id: "",
        title: "",
        description: "",
        issue_date: new Date().toISOString().split("T")[0],
      });
      fetchData();
    } catch (error) {
      console.error("Error issuing credential:", error);
      showSnackbar("Error issuing credential", "error");
    } finally {
      setIssueLoading(false);
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
            Loading university dashboard...
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
            UNIVERSITY PORTAL
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
            Welcome, {user?.name}. Manage students and issue blockchain
            credentials.
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
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                    mb: 1,
                  }}
                >
                  {credentials.length}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  CREDENTIALS ISSUED
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
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.secondary.main,
                    mb: 1,
                  }}
                >
                  {students.length}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  TOTAL STUDENTS
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
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.info.main,
                    mb: 1,
                  }}
                >
                  98%
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  VERIFICATION RATE
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
                <Typography
                  variant="h2"
                  sx={{ fontWeight: "bold", color: "#ffc107", mb: 1 }}
                >
                  100%
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  BLOCKCHAIN SECURE
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Card
          sx={{
            background: "linear-gradient(145deg, #1a1a2e, #16213e)",
            border: "1px solid rgba(0, 255, 136, 0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{
                  "& .MuiTab-root": {
                    color: theme.palette.text.secondary,
                    "&.Mui-selected": {
                      color: theme.palette.primary.main,
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              >
                <Tab label="Manage Students" />
                <Tab label="Issue Credential" />
                <Tab label="Credentials History" />
              </Tabs>
            </Box>

            {/* Tab Content */}
            <Box sx={{ p: 4 }}>
              {/* Manage Students Tab */}
              {activeTab === 0 && (
                <Box>
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
                      STUDENT MANAGEMENT
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<PersonAdd />}
                      onClick={() => setAddStudentDialogOpen(true)}
                      sx={{
                        background: "linear-gradient(45deg, #00ff88, #7b61ff)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #00cc66, #5d42cc)",
                        },
                      }}
                    >
                      ADD NEW STUDENT
                    </Button>
                  </Box>

                  {students.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                      <People
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
                        No students yet
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary, mb: 4 }}
                      >
                        Add your first student to start issuing credentials.
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => setAddStudentDialogOpen(true)}
                        sx={{
                          background:
                            "linear-gradient(45deg, #00ff88, #7b61ff)",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #00cc66, #5d42cc)",
                          },
                        }}
                      >
                        ADD FIRST STUDENT
                      </Button>
                    </Box>
                  ) : (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                              }}
                            >
                              ID
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                              }}
                            >
                              Name
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                              }}
                            >
                              Email
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                              }}
                            >
                              Joined
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                              }}
                            >
                              Credentials
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {students.map((student) => {
                            const studentCreds = credentials.filter(
                              (cred) => cred.student_id === student.id
                            );
                            return (
                              <TableRow
                                key={student.id}
                                sx={{
                                  "&:hover": {
                                    backgroundColor: alpha(
                                      theme.palette.primary.main,
                                      0.05
                                    ),
                                  },
                                }}
                              >
                                <TableCell
                                  sx={{
                                    color: "white",
                                    fontFamily: "JetBrains Mono",
                                  }}
                                >
                                  #{student.id}
                                </TableCell>
                                <TableCell
                                  sx={{ color: "white", fontWeight: "bold" }}
                                >
                                  {student.name}
                                </TableCell>
                                <TableCell
                                  sx={{ color: theme.palette.text.secondary }}
                                >
                                  {student.email}
                                </TableCell>
                                <TableCell
                                  sx={{ color: theme.palette.text.secondary }}
                                >
                                  {new Date(
                                    student.created_at
                                  ).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    label={`${studentCreds.length} CREDENTIALS`}
                                    size="small"
                                    sx={{
                                      backgroundColor: alpha(
                                        studentCreds.length > 0
                                          ? theme.palette.primary.main
                                          : theme.palette.text.secondary,
                                        0.2
                                      ),
                                      color:
                                        studentCreds.length > 0
                                          ? theme.palette.primary.main
                                          : theme.palette.text.secondary,
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Box>
              )}

              {/* Issue Credential Tab */}
              {activeTab === 1 && (
                <Box>
                  <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => setIssueDialogOpen(true)}
                      disabled={students.length === 0}
                      sx={{
                        background:
                          students.length === 0
                            ? alpha(theme.palette.text.secondary, 0.3)
                            : "linear-gradient(45deg, #00ff88, #00cc66)",
                        "&:hover":
                          students.length > 0
                            ? {
                                background:
                                  "linear-gradient(45deg, #00cc66, #00a855)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 25px rgba(0, 255, 136, 0.4)",
                              }
                            : {},
                        px: 4,
                        py: 1.5,
                        fontSize: "1.1rem",
                      }}
                    >
                      {students.length === 0
                        ? "ADD STUDENTS FIRST"
                        : "ISSUE NEW CREDENTIAL"}
                    </Button>
                  </Box>

                  <Grid container spacing={4}>
                    {/* Student Stats */}
                    <Grid item xs={12} md={4}>
                      <Card
                        sx={{
                          background: alpha(theme.palette.primary.main, 0.1),
                          border: "none",
                          mb: 3,
                        }}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <People
                              sx={{ color: theme.palette.primary.main }}
                            />
                            <Box>
                              <Typography variant="h6" sx={{ color: "white" }}>
                                {students.length} Students
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: theme.palette.text.secondary }}
                              >
                                Available for credentials
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>

                      <Card
                        sx={{
                          background: alpha(theme.palette.secondary.main, 0.1),
                          border: "none",
                          mb: 3,
                        }}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <VerifiedUser
                              sx={{ color: theme.palette.secondary.main }}
                            />
                            <Box>
                              <Typography variant="h6" sx={{ color: "white" }}>
                                Blockchain Secure
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: theme.palette.text.secondary }}
                              >
                                Military grade security
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>

                      <Card
                        sx={{
                          background: alpha(theme.palette.info.main, 0.1),
                          border: "none",
                        }}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <AutoAwesome
                              sx={{ color: theme.palette.info.main }}
                            />
                            <Box>
                              <Typography variant="h6" sx={{ color: "white" }}>
                                Global Verification
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: theme.palette.text.secondary }}
                              >
                                24/7 access worldwide
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Instructions */}
                    <Grid item xs={12} md={8}>
                      <Card
                        sx={{
                          background: alpha("#7b61ff", 0.1),
                          border: `1px solid ${alpha("#7b61ff", 0.3)}`,
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{ color: "white", mb: 2 }}
                          >
                            HOW TO ISSUE CREDENTIALS
                          </Typography>
                          <Box sx={{ spaceY: 2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                mb: 2,
                              }}
                            >
                              <Chip
                                label="1"
                                size="small"
                                sx={{
                                  mr: 2,
                                  backgroundColor: theme.palette.primary.main,
                                  color: "black",
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: theme.palette.text.secondary }}
                              >
                                Add students using the "Manage Students" tab
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                mb: 2,
                              }}
                            >
                              <Chip
                                label="2"
                                size="small"
                                sx={{
                                  mr: 2,
                                  backgroundColor: theme.palette.primary.main,
                                  color: "black",
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: theme.palette.text.secondary }}
                              >
                                Select a student and enter credential details
                              </Typography>
                            </Box>
                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Chip
                                label="3"
                                size="small"
                                sx={{
                                  mr: 2,
                                  backgroundColor: theme.palette.primary.main,
                                  color: "black",
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: theme.palette.text.secondary }}
                              >
                                Credential will be permanently recorded on
                                blockchain
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Credentials History Tab */}
              {activeTab === 2 && (
                <Box>
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
                      CREDENTIALS HISTORY
                    </Typography>
                    <Chip
                      label={`${credentials.length} TOTAL`}
                      sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        color: theme.palette.primary.main,
                        border: `1px solid ${alpha(
                          theme.palette.primary.main,
                          0.3
                        )}`,
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
                        No credentials issued yet
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary, mb: 4 }}
                      >
                        Start issuing credentials to your students.
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => setActiveTab(1)}
                        sx={{
                          background:
                            "linear-gradient(45deg, #00ff88, #7b61ff)",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #00cc66, #5d42cc)",
                          },
                        }}
                      >
                        ISSUE FIRST CREDENTIAL
                      </Button>
                    </Box>
                  ) : (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                              }}
                            >
                              STUDENT
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                              }}
                            >
                              CREDENTIAL
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                              }}
                            >
                              ISSUE DATE
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                              }}
                            >
                              BLOCKCHAIN HASH
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                              }}
                            >
                              STATUS
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {credentials.map((credential) => (
                            <TableRow
                              key={credential.id}
                              sx={{
                                "&:hover": {
                                  backgroundColor: alpha(
                                    theme.palette.primary.main,
                                    0.05
                                  ),
                                },
                              }}
                            >
                              <TableCell>
                                <Box>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "white", fontWeight: "bold" }}
                                  >
                                    {credential.student_name}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    sx={{ color: theme.palette.text.secondary }}
                                  >
                                    {credential.student_email}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "white" }}
                                >
                                  {credential.title}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ color: theme.palette.text.secondary }}
                                >
                                  {credential.description || "No description"}
                                </Typography>
                              </TableCell>
                              <TableCell
                                sx={{ color: theme.palette.text.secondary }}
                              >
                                {formatDate(credential.issue_date)}
                              </TableCell>
                              <TableCell>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontFamily: "JetBrains Mono, monospace",
                                      color: theme.palette.primary.main,
                                      wordBreak: "break-all",
                                    }}
                                  >
                                    {credential.blockchain_hash.slice(0, 20)}...
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
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label="ISSUED"
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
                  )}
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Add Student Dialog */}
        <Dialog
          open={addStudentDialogOpen}
          onClose={() => setAddStudentDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              background: "linear-gradient(145deg, #1a1a2e, #16213e)",
              border: "1px solid rgba(123, 97, 255, 0.2)",
              backdropFilter: "blur(10px)",
            },
          }}
        >
          <DialogTitle
            sx={{
              borderBottom: `1px solid ${alpha(
                theme.palette.secondary.main,
                0.2
              )}`,
              pb: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              ADD NEW STUDENT
            </Typography>
          </DialogTitle>
          <form onSubmit={handleAddStudent}>
            <DialogContent sx={{ pt: 3 }}>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary, mb: 3 }}
              >
                Add a new student to your institution. The student will receive
                a default password that they can change later.
              </Typography>

              <TextField
                fullWidth
                label="Student Name"
                value={addStudentForm.name}
                onChange={(e) =>
                  setAddStudentForm({ ...addStudentForm, name: e.target.value })
                }
                required
                margin="normal"
              />

              <TextField
                fullWidth
                label="Student Email"
                type="email"
                value={addStudentForm.email}
                onChange={(e) =>
                  setAddStudentForm({
                    ...addStudentForm,
                    email: e.target.value,
                  })
                }
                required
                margin="normal"
                helperText="Student will use this email to login"
              />
            </DialogContent>
            <DialogActions
              sx={{
                borderTop: `1px solid ${alpha(
                  theme.palette.secondary.main,
                  0.2
                )}`,
                pt: 2,
                px: 3,
                pb: 3,
              }}
            >
              <Button
                onClick={() => setAddStudentDialogOpen(false)}
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={addStudentLoading}
                sx={{
                  background: "linear-gradient(45deg, #7b61ff, #5d42cc)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #5d42cc, #4a36a3)",
                  },
                }}
              >
                {addStudentLoading ? "ADDING..." : "ADD STUDENT"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Issue Credential Dialog */}
        <Dialog
          open={issueDialogOpen}
          onClose={() => setIssueDialogOpen(false)}
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
              ISSUE NEW CREDENTIAL
            </Typography>
          </DialogTitle>
          <form onSubmit={handleIssueCredential}>
            <DialogContent sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Select Student"
                    value={issueForm.student_id}
                    onChange={(e) =>
                      setIssueForm({ ...issueForm, student_id: e.target.value })
                    }
                    required
                  >
                    <MenuItem value="">Choose a student</MenuItem>
                    {students.map((student) => (
                      <MenuItem key={student.id} value={student.id}>
                        {student.name} ({student.email})
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Issue Date"
                    value={issueForm.issue_date}
                    onChange={(e) =>
                      setIssueForm({ ...issueForm, issue_date: e.target.value })
                    }
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Credential Title"
                    placeholder="e.g., Bachelor of Science in Computer Science"
                    value={issueForm.title}
                    onChange={(e) =>
                      setIssueForm({ ...issueForm, title: e.target.value })
                    }
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    placeholder="Provide details about this credential, courses completed, honors, etc."
                    value={issueForm.description}
                    onChange={(e) =>
                      setIssueForm({
                        ...issueForm,
                        description: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
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
                onClick={() => setIssueDialogOpen(false)}
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={issueLoading}
                sx={{
                  background: "linear-gradient(45deg, #00ff88, #00cc66)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #00cc66, #00a855)",
                  },
                }}
              >
                {issueLoading ? "ISSUING..." : "ISSUE CREDENTIAL"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

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

export default UniversityDashboard;
