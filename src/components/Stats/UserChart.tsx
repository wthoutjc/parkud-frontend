import { Box, CardActions, Typography } from "@mui/material";

// Components
import { StyledButton2 } from "..";

interface Props {
  value: number;
  value2: number;
}

const UserChart = ({ value, value2 }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1" fontWeight={800}>
            {value}
          </Typography>
          <Typography variant="body2">Value 1</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1" fontWeight={800}>
            {value2}
          </Typography>
          <Typography variant="body2">Value 2</Typography>
        </Box>
      </Box>
      <CardActions sx={{ mt: 2 }}>
        <StyledButton2
          variant="contained"
        >
          Detalles
        </StyledButton2>
      </CardActions>
    </Box>
  );
};

export { UserChart };
