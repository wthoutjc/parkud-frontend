import {
  Typography,
  ListItemButton,
  ListItem,
  List,
  ListItemIcon,
  Tooltip,
} from "@mui/material";

// Interfaces
import { Hierarchy } from "../../../interfaces";

// List - Data
import { CLIENT_LIST } from "./ClientList";

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
  );
};

export default SidebarList;
