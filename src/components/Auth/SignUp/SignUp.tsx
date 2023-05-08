import { useState } from "react";
import { Box, InputAdornment, Typography } from "@mui/material";

// Icons
import EmailIcon from "@mui/icons-material/Email";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

// React Hook Form
import { useForm } from "react-hook-form";

// Styled Components
import {
  StyledTextField,
  StyledButton,
  StyledButton2,
  PaySignUp,
} from "../../../components";

// React Router DOM
import { Link } from "react-router-dom";

// Interfaces
import { ISignUp } from "../../../interfaces";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUp>();

  const [payMethod, setPayMethod] = useState(false);

  const handlePayMethod = async () => {
    console.log("handleLogin");
    setPayMethod(true);
  };

  if (payMethod)
    return <PaySignUp {...watch()} back={() => setPayMethod(false)} />;

  return (
    <Box className={"signup__container"}>
      <Box
        className={"signup__right signup__animation-toLeft"}
        sx={{
          backgroundColor: "primary.dark",
          color: "secondary.contrastText",
        }}
      >
        <Typography variant="h4">Crear una cuenta</Typography>
        <Box display={"flex"}>
          <Box sx={{ boxSizing: "border-box", padding: "1em", width: "100%" }}>
            <form onSubmit={handleSubmit(handlePayMethod)}>
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
                        <BadgeIcon />
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
                        <BadgeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <StyledTextField
                fullWidth
                type="text"
                placeholder="Ej Usuario123"
                label="Nombre de usuario*"
                error={!!errors.username}
                sx={{ mb: 2 }}
                helperText={
                  errors.username
                    ? errors.username.message
                    : "Confirma tu contraseña..."
                }
                {...register("username", {
                  required: "El nombre de usuario es obligatorio",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SwitchAccountIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                fullWidth
                color="secondary"
                sx={{ marginBottom: "1em", color: "white" }}
                placeholder="Ej 3001234567"
                label="Número de celular*"
                error={!!errors.phone}
                helperText={
                  errors.phone
                    ? errors.phone.message
                    : "Escibe tu número de celular..."
                }
                {...register("phone", {
                  required: "El número de celular es obligatorio",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneAndroidIcon />
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
