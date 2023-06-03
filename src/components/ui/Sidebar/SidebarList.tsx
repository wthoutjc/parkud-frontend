import {
  Typography,
  ListItem,
  List,
  ListItemIcon,
  Tooltip,
} from "@mui/material";

// Interfaces
import { Hierarchy } from "../../../interfaces";

// List - Data
import { CLIENT_LIST, SUPER_ADMIN_LIST } from "../../../components";

// StyledComponents
import { StyledListItemButton } from "..";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  hierarchy: Hierarchy;
}

const SidebarList = ({ open, hierarchy }: Props) => {
  return (
    <List>
      {hierarchy === "C" &&
        CLIENT_LIST.map(({ icon, message }, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <Tooltip title={!open && message}>
              <StyledListItemButton
                sx={{
                  justifyContent: open
                    ? "initial !important"
                    : "center !important",
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
      {hierarchy === "S" &&
        SUPER_ADMIN_LIST.map(({ icon, message, link }, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <Tooltip title={!open && message}>
              <Link
                to={link}
                style={{
                  textDecoration: "none",
                }}
              >
                <StyledListItemButton
                  sx={{
                    justifyContent: open
                      ? "initial !important"
                      : "center !important",
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
              </Link>
            </Tooltip>
          </ListItem>
        ))}
    </List>
  );
};

export default SidebarList;
