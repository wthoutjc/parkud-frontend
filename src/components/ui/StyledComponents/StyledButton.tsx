import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
  },
}));

export { StyledButton };
