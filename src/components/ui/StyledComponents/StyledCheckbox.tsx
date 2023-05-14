import { styled } from "@mui/material/styles";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

const StyledCheckbox = styled(Checkbox)<CheckboxProps>(({ theme }) => ({
  "& .MuiSvgIcon-root ": {
    color: theme.palette.background.paper,
  },
}));

export { StyledCheckbox };
