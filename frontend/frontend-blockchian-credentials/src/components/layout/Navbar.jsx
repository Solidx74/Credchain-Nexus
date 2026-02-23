import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Chip,
  alpha,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  School,
  Business,
  VerifiedUser,
  AutoAwesome,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "student":
        return <School />;
      case "university":
        return <Business />;
      case "employer":
        return <VerifiedUser />;
      default:
        return <AccountCircle />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "student":
        return "#00ff88";
      case "university":
        return "#7b61ff";
      case "employer":
        return "#00a8ff";
      default:
        return "#b0b0b0";
    }
  };

  const menuItems = user
    ? [
        {
          label: "Dashboard",
          path: `/${user.role}`,
          roles: ["student", "university", "employer"],
        },
        {
          label: "Verify",
          path: "/verify",
          roles: ["student", "university", "employer"],
        },
      ]
    : [
        { label: "Home", path: "/" },
        { label: "Verify", path: "/verify" },
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ];

  const MobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      PaperProps={{
        sx: {
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          borderLeft: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          minWidth: 250,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        {user && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              {user.name}
            </Typography>
            <Chip
              icon={getRoleIcon(user.role)}
              label={user.role.toUpperCase()}
              size="small"
              sx={{
                backgroundColor: alpha(getRoleColor(user.role), 0.2),
                color: getRoleColor(user.role),
                border: `1px solid ${alpha(getRoleColor(user.role), 0.3)}`,
                mt: 1,
              }}
            />
          </Box>
        )}
        <List>
          {menuItems
            .filter((item) => !item.roles || item.roles.includes(user?.role))
            .map((item) => (
              <ListItem
                key={item.label}
                component={Link}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  backgroundColor:
                    location.pathname === item.path
                      ? alpha(theme.palette.primary.main, 0.2)
                      : "transparent",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <ListItemText primary={item.label} sx={{ color: "white" }} />
              </ListItem>
            ))}
          {user && (
            <ListItem
              onClick={handleLogout}
              sx={{
                borderRadius: 1,
                color: "#ff6b6b",
                "&:hover": {
                  backgroundColor: alpha("#ff6b6b", 0.1),
                },
              }}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <AutoAwesome sx={{ mr: 2, color: theme.palette.primary.main }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                background: "linear-gradient(45deg, #00ff88, #7b61ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              BLOCKCRED
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {menuItems
              .filter((item) => !item.roles || item.roles.includes(user?.role))
              .map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: "white",
                    backgroundColor:
                      location.pathname === item.path
                        ? alpha(theme.palette.primary.main, 0.2)
                        : "transparent",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

            {user ? (
              <>
                <Chip
                  icon={getRoleIcon(user.role)}
                  label={user.role.toUpperCase()}
                  sx={{
                    backgroundColor: alpha(getRoleColor(user.role), 0.2),
                    color: getRoleColor(user.role),
                    border: `1px solid ${alpha(getRoleColor(user.role), 0.3)}`,
                  }}
                />
                <Button
                  onClick={handleLogout}
                  sx={{
                    color: "#ff6b6b",
                    "&:hover": {
                      backgroundColor: alpha("#ff6b6b", 0.1),
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                component={Link}
                to="/register"
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
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MobileMenu />
    </>
  );
};

export default Navbar;
