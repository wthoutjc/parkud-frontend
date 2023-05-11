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

export function Sidebar() {
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
            { message: "Cuenta", icon: <AccountBoxIcon /> },
            { message: "Cerrar sesión", icon: <LogoutIcon /> },
          ].map(({ icon, message }, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Tooltip title={!open && message}>
                <ListItemButton
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
