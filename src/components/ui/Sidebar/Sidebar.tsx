import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ListItem,
  IconButton,
  List,
  Box,
  Tooltip,
  Typography,
} from "@mui/material";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

// StyledComponents
import {
  StyledDrawer,
  StyledDrawerHeader,
  StyledListItemButton,
} from "../../../components";

// Redux
import { useAppSelector } from "../../../hooks";
import SidebarList from "./SidebarList";

// Auth
import { useAuth } from "../../../hooks";

export function Sidebar() {
  const navigate = useNavigate();
  const { LogOut } = useAuth();

  const { user } = useAppSelector((state) => state.auth);
  const { hierarchy } = user;

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <StyledDrawer variant="permanent" open={open}>
        <StyledDrawerHeader>
          {open ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link
                to="/home"
                style={{
                  textDecoration: "none",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    ml: 1,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    textDecoration: "none",
                    userSelect: "none",
                    backgroundColor: "primary.light",
                    p: 1,
                    borderRadius: 2,
                  }}
                  color="primary.dark"
                >
                  PAR-<span style={{ color: "#f1c40f" }}>K</span>U
                  <span style={{ color: "red" }}>D</span>
                </Typography>
              </Link>
              <IconButton
                onClick={handleDrawerClose}
                sx={{
                  color: "primary.contrastText",
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Box>
          ) : (
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                color: "primary.contrastText",
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </StyledDrawerHeader>
        <List>
          {[
            {
              message: "Cuenta",
              icon: <AccountBoxIcon />,
              action: () => navigate("/account"),
            },
            {
              message: "Cerrar sesión",
              icon: <LogoutIcon />,
              action: LogOut,
            },
          ].map(({ icon, message, action }, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Tooltip title={!open && message}>
                <StyledListItemButton
                  onClick={action}
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "primary.contrastText",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <Typography
                    variant="body2"
                    sx={{
                      display: open ? "block" : "none",
                    }}
                  >
                    {message}
                  </Typography>
                </StyledListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <SidebarList hierarchy={hierarchy} open={open} />
      </StyledDrawer>
    </Box>
  );
}
