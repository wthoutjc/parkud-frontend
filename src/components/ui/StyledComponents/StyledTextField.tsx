import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& .MuiFormLabel-root": {
    color: theme.palette.secondary.light,
  },
  "& .MuiFormLabel-root.Mui-error": {
    color: theme.palette.error.main,
  },
  "& .MuiFormHelperText-root": {
    color: theme.palette.secondary.light,
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: theme.palette.error.main,
  },
  "& .MuiInputBase-input": {
    color: theme.palette.background.default,
  },
  "& label.Mui-focused": {
    color: theme.palette.background.default,
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.background.default,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.secondary.light,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.background.default,
    },
  },
}));

export { StyledTextField };
