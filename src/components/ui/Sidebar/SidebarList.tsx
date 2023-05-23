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
import { CLIENT_LIST } from "./ClientList";

// StyledComponents
import { StyledListItemButton } from "..";

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
    </List>
  );
};

export default SidebarList;
