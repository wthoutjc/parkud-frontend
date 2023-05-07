import { useState } from "react";
import { Box, InputAdornment, Typography } from "@mui/material";

// Icons
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
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

interface ISignUp {
  email: string;
  name: string;
  lastName: string;
  password: string;
  password2: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUp>();

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handleSignup = async () => {
    console.log("handleLogin");
  };

  return (
    <Box className={"signup__container"}>
      <Box
        className={"signup__right signup__animation-toLeft"}
        sx={{
          backgroundColor: "primary.dark",
          color: "secondary.contrastText",
        }}
      >
        <Typography variant="h4" color={"secondary.contrastText"}>
          Crear una cuenta
        </Typography>
        <Box sx={{ boxSizing: "border-box", padding: "1em", width: "100%" }}>
          <form onSubmit={handleSubmit(handleSignup)}>
            <StyledTextField
              fullWidth
              color="secondary"
              sx={{ marginBottom: "1em", color: "white" }}
              placeholder="E-mail*"
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
            <Box sx={{ display: "flex" }}>
              <StyledTextField
                fullWidth
                sx={{ marginBottom: "1em" }}
                placeholder="Ej. Juan"
                label="Nombre*"
                error={!!errors.name}
                helperText={
                  errors.name ? errors.name.message : "Escibe tu nombre..."
                }
                {...register("name", {
                  required: "El nombre es obligatorio",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                fullWidth
                sx={{ marginBottom: "1em", ml: 2 }}
                placeholder="Ej. Pérez"
                label="Apellido*"
                error={!!errors.lastName}
                helperText={
                  errors.lastName
                    ? errors.lastName.message
                    : "Escibe tu apellido..."
                }
                {...register("lastName", {
                  required: "El apellido es obligatorio",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <StyledTextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="*****"
              label="Password"
              error={!!errors.password}
              sx={{ marginBottom: "1em" }}
              helperText={
                errors.password
                  ? errors.password.message
                  : "Escibe tu contraseña..."
              }
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
            <StyledTextField
              fullWidth
              type={showCPassword ? "text" : "password"}
              placeholder="*****"
              label="Confirmar contraseña"
              error={!!errors.password2}
              sx={{ mb: 2 }}
              helperText={
                errors.password2
                  ? errors.password2.message
                  : "Confirma tu contraseña..."
              }
              {...register("password2", {
                required: "La contraseña es obligatoria",
                validate: (value) =>
                  value === watch("password")
                    ? undefined
                    : "Las contraseñas no coinciden",
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {showCPassword ? (
                      <VisibilityOffIcon
                        onClick={() => setShowCPassword(!showCPassword)}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <VisibilityIcon
                        onClick={() => setShowCPassword(!showCPassword)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <StyledButton type="submit" variant="contained" fullWidth>
              Crear cuenta
            </StyledButton>
          </form>
        </Box>
      </Box>
      <Box
        className={"signup__left signup__animation-toRight"}
        sx={{
          backgroundColor: "primary.light",
        }}
      >
        <Typography variant="h4" className="fade-animation">
        ¡Hazte miembro hoy!
        </Typography>
        <Typography variant="body1" className="fade-animation">
          Introduzca sus datos personales y empiece a viajar con nosotros
        </Typography>
        <Link to={"/login"}>
          <StyledButton2 variant={"outlined"} className="fade-animation">
            <Typography variant="body1">Inicia sesión</Typography>
          </StyledButton2>
        </Link>
      </Box>
    </Box>
  );
};

export { SignUp };
