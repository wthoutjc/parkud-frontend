import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ListItemButton,
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
import { StyledDrawer, StyledDrawerHeader } from "../../../components";

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
              <Typography
                variant="h6"
                sx={{
                  ml: 1,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                }}
                color="text.primary"
              >
                PAR-KUD
              </Typography>
              <IconButton
                onClick={handleDrawerClose}
                sx={{
                  color: "primary.dark",
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
                color: "primary.dark",
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
                <ListItemButton
                  onClick={action}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    "&:hover": {
                      backgroundColor: "primary.light",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "primary.dark",
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
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <SidebarList hierarchy={hierarchy} open={open} />
      </StyledDrawer>
    </Box>
  );
}
