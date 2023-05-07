import { useState } from "react";
import { Box, InputAdornment, Typography } from "@mui/material";

// Redux
// import { useAppDispatch } from "../../../hooks";

// Icons
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

// React Hook Form
import { useForm } from "react-hook-form";

// Styled Components
import {
  StyledTextField,
  StyledButton,
  StyledButton2,
} from "../../../components";

// React Router DOM
import { Link } from "react-router-dom";

interface ILogin {
  email: string;
  password: string;
}

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const handleLogin = async () => {
    console.log("handleLogin");
  };

  return (
    <Box className="login__container">
      <Box
        className={"login__left login__animation-toRight"}
        sx={{
          backgroundColor: "primary.dark",
          color: "secondary.contrastText",
        }}
      >
        <Typography variant="h4">Iniciar sesión</Typography>
        <Box display={"flex"}>
          <Box sx={{ boxSizing: "border-box", padding: "1em", width: "100%" }}>
            <form onSubmit={handleSubmit(handleLogin)}>
              <StyledTextField
                fullWidth
                sx={{ marginBottom: "1em" }}
                placeholder="E-mail"
                label="E-mail"
                error={!!errors.email}
                helperText={
                  errors.email
                    ? errors.email.message
                    : "Escibe tu correo electrónico..."
                }
                // onBlur={() => setTouchedUser(true)}
                {...register("email", {
                  required: "El correo electrónico es obligatorio",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                label="Password"
                error={!!errors.password}
                helperText={
                  errors.password
                    ? errors.password.message
                    : "Escibe tu contraseña..."
                }
                sx={{ mb: 2 }}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <VisibilityOffIcon
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <VisibilityIcon
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <StyledButton type="submit" variant="contained" fullWidth>
                Iniciar sesión
              </StyledButton>
            </form>
          </Box>
        </Box>
      </Box>
      <Box
        className={"login__right login__animation-toLeft"}
        sx={{
          backgroundColor: "primary.light",
        }}
      >
        <Typography variant="h4" className="fade-animation">
          ¡Bienvenido de nuevo!
        </Typography>
        <Typography variant="body1" className="fade-animation">
          Para mantenerte en contacto con nosotros, inicia sesión con tus datos
          personales
        </Typography>
        <Link to={"/signup"}>
          <StyledButton2 variant={"outlined"} className="fade-animation">
            <Typography variant="body1">Regístrate</Typography>
          </StyledButton2>
        </Link>
      </Box>
    </Box>
  );
};

export { LogIn };
