import { styled } from "@mui/material/styles";
import Select, { SelectProps } from "@mui/material/Select";

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  "& .MuiSelect-select": {
    color: theme.palette.background.paper,
  },
  "& .MuiSvgIcon-root path": {
    fill: theme.palette.background.paper,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderBottom: `1px solid ${theme.palette.background.paper}`,
    content: '"XDXDXDXD"',
  },
}));

export { StyledSelect };
