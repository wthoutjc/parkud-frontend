import { styled } from "@mui/material/styles";
import TableRow, { TableRowProps } from "@mui/material/TableRow";

const StyledTableRow = styled(TableRow)<TableRowProps>(({ theme }) => ({
  "& .MuiTableCell-root": {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.secondary.main,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.primary.light,
  },
  "&:last-of-type": {
    "& .MuiTableCell-root": {
      borderBottom: "none",
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.text.secondary,
    "& .MuiSvgIcon-root ": {
      color: theme.palette.background.paper,
    },
    "& .MuiTableCell-root": {
      color: theme.palette.primary.contrastText,
    },
  },
}));
export { StyledTableRow };
