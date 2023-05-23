import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";

const StyledListItemButton = styled(ListItemButton)<ListItemButtonProps>(
  ({ theme }) => ({
    minHeight: 48,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.dark,
      "& .MuiSvgIcon-root": {
        fill: theme.palette.primary.dark,
      },
    },
  })
);

export { StyledListItemButton };
