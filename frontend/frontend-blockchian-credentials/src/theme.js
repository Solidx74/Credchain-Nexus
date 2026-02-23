import { createTheme } from "@mui/material/styles";

const blockchainTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00ff88", // Neon green - blockchain color
      light: "#66ffaa",
      dark: "#00cc66",
    },
    secondary: {
      main: "#7b61ff", // Purple accent
      light: "#9d8aff",
      dark: "#5d42cc",
    },
    background: {
      default: "#0a0a0f", // Deep space black
      paper: "#1a1a2e", // Dark blue-gray
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
    success: {
      main: "#00ff88",
    },
    info: {
      main: "#00a8ff",
    },
  },
  typography: {
    fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      background: "linear-gradient(45deg, #00ff88, #7b61ff)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#1a1a2e",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#00ff88",
            borderRadius: "4px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "8px",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(0, 255, 136, 0.3)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "linear-gradient(145deg, #1a1a2e, #16213e)",
          border: "1px solid rgba(0, 255, 136, 0.1)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            border: "1px solid rgba(0, 255, 136, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 255, 136, 0.1)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(10, 10, 15, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0, 255, 136, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(0, 255, 136, 0.3)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(0, 255, 136, 0.5)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00ff88",
            },
          },
        },
      },
    },
  },
});

export default blockchainTheme;
