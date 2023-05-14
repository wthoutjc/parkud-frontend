import { useState } from "react";
import { Box, InputAdornment, Typography } from "@mui/material";

// Interfaces
import { ILogin } from "../../../interfaces";

// Icons
import PasswordIcon from "@mui/icons-material/Password";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

// React Hook Form
import { useForm } from "react-hook-form";

// Styled Components & Components
import {
  StyledTextField,
  StyledButton,
  StyledButton2,
  TwoFactor,
  UpdatePassword,
} from "../../../components";

// React Router DOM
import { Link } from "react-router-dom";

// Auth - Custom Hook
import { useAuth } from "../../../hooks";

const LogIn = () => {
  const {
    status,
    LogIn: logIn,
    TwoFactor: twoFactorAuth,
    UpdatePassword: updatePasswordService,
  } = useAuth();
  const { error, message, twoFactor, user, updatePassword } = status;

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILogin>();

  const handleLogin = async (data: ILogin) => {
    setLoading(true);
    await logIn(data);
    reset();
    setLoading(false);
  };

  if (updatePassword)
    return <UpdatePassword updatePassword={updatePasswordService} />;

  if (twoFactor && user)
    return <TwoFactor TwoFactor={twoFactorAuth} user={user} />;

  return (
    <Box className={"login__container"}>
      <Box
        className={"login__left login__animation-toRight"}
        sx={{
          backgroundColor: "primary.dark",
          color: "secondary.contrastText",
        }}
      >
        <Typography variant="h4">Iniciar sesión</Typography>
        <Box
          display={"flex"}
          sx={{
            width: "100%",
          }}
        >
          <Box sx={{ boxSizing: "border-box", padding: "1em", width: "100%" }}>
            <form onSubmit={handleSubmit(handleLogin)}>
              <StyledTextField
                disabled={loading}
                fullWidth
                sx={{ marginBottom: "1em" }}
                placeholder="Nombre de usuario"
                autoComplete="parkud-username"
                label="Nombre de usuario*"
                error={!!errors.username}
                helperText={
                  errors.username
                    ? errors.username.message
                    : "Escibe tu nombre de usuario..."
                }
                {...register("username", {
                  required: "El nombre de usuario es obligatorio",
                  minLength: {
                    value: 5,
                    message:
                      "El nombre de usuario debe tener mínimo 5 caracteres",
                  },
                  maxLength: {
                    value: 8,
                    message:
                      "El nombre de usuario debe tener máximo 8 caracteres",
                  },
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                disabled={loading}
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                label="Contraseña*"
                autoComplete="off"
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
                  endAdornment: !loading && (
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
              {error && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "error.main",
                    backgroundColor: "error.light",
                    p: 1,
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="error.main"
                    fontWeight={800}
                  >
                    {message}
                  </Typography>
                </Box>
              )}
              <StyledButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                {loading ? "Comprobando..." : "Iniciar sesión"}
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
          ¡Bienvenid@!
        </Typography>
        <Typography variant="body1" className="fade-animation">
          Para mantenerte en contacto con nosotros, inicia sesión con tus datos
          personales
        </Typography>
        <Link to={"/signup"}>
          <StyledButton2
            variant={"outlined"}
            className="fade-animation"
            disabled={loading}
          >
            <Typography variant="body1">Regístrate</Typography>
          </StyledButton2>
        </Link>
      </Box>
    </Box>
  );
};

export { LogIn };
