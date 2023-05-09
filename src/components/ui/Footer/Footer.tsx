import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
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
    <AppBar
      position="static"
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PAR-KUD
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "space-evenly",
              },
            }}
          >
            {["Option 1", "Option 2", "Option 3"].map((page) => (
              <Button
                key={page}
                variant="contained"
                sx={{ my: 2, display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Link
              to={"/login"}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <StyledButton
                variant="contained"
                sx={{
                  my: 2,
                  display: "block",
                  backgroundColor: "background.default",
                }}
              >
                Iniciar sesión
              </StyledButton>
            </Link>
            <Link
              to={"/signup"}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Button
                variant="contained"
                sx={{ my: 2, display: "block", ml: 2 }}
              >
                Regístrate
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { Footer };
