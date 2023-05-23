import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  IconButton
} from "@mui/material";
import { ButtonProps } from "@mui/material/Button";

// React Router DOM
import { Link } from "react-router-dom";

// Styled Components
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  "&:hover": {
    color: theme.palette.background.default,
  },
}));

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.dark",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Box>

        </Box>
        <Grid alignItems="center">
          <Grid item xs={12}>
            <Typography color="black" variant="h5">
              React Starter App
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()} | React | Material UI | React Router`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export { Footer };
