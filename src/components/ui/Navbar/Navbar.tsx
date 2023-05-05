import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
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
            <Button variant="contained" sx={{ my: 2, display: "block" }}>
              Iniciar sesión
            </Button>
            <Button
              variant="contained"
              sx={{ my: 2, display: "block", ml: 2 }}
              color="secondary"
            >
              Regístrate
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { Navbar };
