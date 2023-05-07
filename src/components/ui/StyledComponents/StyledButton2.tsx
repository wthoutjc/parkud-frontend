import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const StyledButton2 = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  borderRadius: "2em",
  padding: "0.8em 1.3em 0.8em 1.3em",
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

export { StyledButton2 };
