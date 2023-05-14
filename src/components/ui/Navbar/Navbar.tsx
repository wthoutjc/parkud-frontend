import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Divider,
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

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        top: 0,
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
          <Link
            to="/#bienvenido"
            style={{
              textDecoration: "none",
            }}
            onClick={() => {
              const anchor = document.querySelector("#bienvenido");
              anchor?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
              });
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                textDecoration: "none",
                userSelect: "none",
              }}
              color="text.primary"
            >
              PAR-<span style={{ color: "#f1c40f" }}>K</span>U
              <span style={{ color: "red" }}>D</span>
            </Typography>
          </Link>

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
            {[
              { name: "Servicios", to: "/#servicios" },
              { name: "Características", to: "/#caracteristicas" },
              { name: "Contáctenos", to: "/#contactenos" },
            ].map(({ name, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => {
                  const anchor = document.querySelector(to.replace("/", ""));
                  anchor?.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "start",
                  });
                }}
                style={{
                  textDecoration: "none",
                }}
              >
                <Button sx={{ my: 2, display: "block" }}>{name}</Button>
              </Link>
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
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ ml: 2 }}
            />
            <Link
              to={"/signup"}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  my: 2,
                  display: "block",
                  ml: 2,
                  backgroundColor: "primary.dark",
                  "&:hover": {
                    backgroundColor: "primary.main",
                  },
                }}
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

export { Navbar };
