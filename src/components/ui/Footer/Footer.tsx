import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  IconButton
} from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import  logoFooter  from "../../../styles/img/logoFooter.svg";
import  Twitter  from "../../../styles/img/Twitter.svg";
import  Ball  from "../../../styles/img/Ball.svg";
import  YouTube  from "../../../styles/img/YouTube.svg";
import  Instagram  from "../../../styles/img/Instagram.svg";
// React Router DOM
import { Link } from "react-router-dom";

// Styled Components
import { styled } from "@mui/material/styles";
import { height } from "@mui/system";

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
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
      sx={{
        width: "700px"
      }}
      >
        <Box
        sx={{
          width: "100%",
          display: {
            xs: "none",
            md: "flex",
            justifyContent: "space-evenly",
          },
        }}
        >
        <img src={logoFooter} alt="Logo" />
        </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "space-evenly",
                color: "primary.contrastText",
              },
            }}
          >
            {[
              { name: "Nosotros", to: "/#nosotros" },
              { name: "Parqueaderos", to: "/#parqueaderos" },
              { name: "Tarifas", to: "/#tarifas" },
              { name: "FAQ", to: "/#faq" },
              { name: "Contacto", to: "/#contacto" },
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
                <Button sx={{ margin: 2, display: "block", color: "primary.contrastText", }}>{name}</Button>
              </Link>
            ))}
          </Box>
          
    </Box>
    <Box
        sx={{
          width: "80%",
          display: {
          },
        }}
        >
        <Box
        sx={{
          display: {
            xs: "none",
            md: "flex",
            flexDirection: "column",
            justifyItems: "space-between",
            alignContent: "center",
            alignItems: "center",
            margin: 2,
          },
        }}
        >
        <Box
          sx={{
            width: "100%",
            display: "block",
            backgroundColor: "background.default",
            height: "1px",
            margin: 2,
          }}
        ></Box>
        <Box
        sx={{
          width: "100%",
          display: {
            xs: "none",
            md: "flex",
            justifyContent: "space-between",
            margin: 2,
          },
        }}
        >
          <Box>
          <Typography  variant="body2"  color="primary.contrastText">
          © 2023 PAR-KUD. Todos los derechos reservados.
          </Typography>
          </Box>

          <Box
          sx={{
            width: "200px",
            display:{
              md:"flex",
              justifyContent:"space-around",
            }
          }}
          >
            <Link to="https://www.google.com/url?sa=i&url=https%3A%2F%2Fco.pinterest.com%2Fpin%2F761600986986687382%2F&psig=AOvVaw3MaGNKZ0dQ2BsR-IrH3yTZ&ust=1684986315793000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIDjtaiFjf8CFQAAAAAdAAAAABAE" >
              <img src={Twitter} alt="Twitter" />
            </Link>
            <Link to="https://www.google.com/url?sa=i&url=https%3A%2F%2Fco.pinterest.com%2Fpin%2F761600986986687382%2F&psig=AOvVaw3MaGNKZ0dQ2BsR-IrH3yTZ&ust=1684986315793000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIDjtaiFjf8CFQAAAAAdAAAAABAE" >
              <img src={Ball} alt="Ball" />
            </Link>
            <Link to="https://www.google.com/url?sa=i&url=https%3A%2F%2Fco.pinterest.com%2Fpin%2F761600986986687382%2F&psig=AOvVaw3MaGNKZ0dQ2BsR-IrH3yTZ&ust=1684986315793000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIDjtaiFjf8CFQAAAAAdAAAAABAE" >
              <img src={YouTube} alt="YouTube" />
            </Link>
            <Link to="https://www.google.com/url?sa=i&url=https%3A%2F%2Fco.pinterest.com%2Fpin%2F761600986986687382%2F&psig=AOvVaw3MaGNKZ0dQ2BsR-IrH3yTZ&ust=1684986315793000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIDjtaiFjf8CFQAAAAAdAAAAABAE" >
              <img src={Instagram} alt="Instagram" />
          </Link></
          Box>
          </Box>

        </Box>
        </Box>
    </Box>
  );
};

export { Footer };
