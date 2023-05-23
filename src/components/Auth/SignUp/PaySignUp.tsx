import { useState } from "react";
import { Box, Typography, InputAdornment } from "@mui/material";

// Interfaces
import { ISignUp, IPaySignUp } from "../../../interfaces";

// React Hook Form
import { useForm } from "react-hook-form";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

// Styled Components & Components
import {
  StyledTextField,
  StyledButton,
  StyledButton2,
} from "../../../components";

// React Router DOM
import { Link, useNavigate } from "react-router-dom";

// Services
import { SignUp } from "../../../services";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../../../hooks";
import { newNotification } from "../../../reducers";

// Images
import logo from "../../../styles/img/logo.png";

interface Props {
  back: () => void;
  signUpPrev: ISignUp;
}

const PaySignUp = ({ back, signUpPrev }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPaySignUp>({
    defaultValues: {
      cardType: "C",
    },
  });

  const handleSignup = async (data: IPaySignUp) => {
    setLoading(true);
    const { success, error, message } = await SignUp({
      ...signUpPrev,
      ...data,
    });
    const notification = {
      id: uuid(),
      title: success ? "Registro exitoso" : "Error al registrarse",
      message: success
        ? message ?? "Usuario registrado correctamente"
        : error ?? "Error al registrarse",
      type: success ? "success" : ("error" as "success" | "error"),
      autoDismiss: 5000,
    };
    dispatch(newNotification(notification));
    setLoading(false);
    if (success) {
      reset();
      return navigate("/login");
    }
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
        <Typography variant="h4">Completar registro</Typography>
        <Box display={"flex"}>
          <Box sx={{ boxSizing: "border-box", padding: "1em", width: "100%" }}>
            <form onSubmit={handleSubmit(handleSignup)}>
              <StyledTextField
                disabled={loading}
                fullWidth
                type="text"
                placeholder="Ej 123456789"
                label="Cédula*"
                error={!!errors.idNumber}
                helperText={
                  errors.idNumber
                    ? errors.idNumber.message
                    : "Escribe tu número de cédula..."
                }
                {...register("idNumber", {
                  required: "El número de cédula es obligatorio",
                  validate: (value) =>
                    value.trim() !== "" ||
                    "El nombre en la tarjeta es obligatorio",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography
                variant="body2"
                color="secondary"
                fontWeight={500}
                sx={{ mb: 2, mt: 1 }}
              >
                <strong>Nota:</strong>{" "}
                <i>Solo se aceptan tarjetas de crédito</i>
              </Typography>
              <StyledTextField
                disabled={loading}
                fullWidth
                sx={{ marginBottom: "1em" }}
                placeholder="Ej PEPE PEREZ"
                label="Nombre en la tarjeta*"
                error={!!errors.cardName}
                helperText={
                  errors.cardName
                    ? errors.cardName.message
                    : "Escribe el nombre que aparece en la tarjeta..."
                }
                {...register("cardName", {
                  required: "El nombre en la tarjeta es obligatorio",
                  validate: (value) =>
                    value.trim().length !== 0 ? undefined : "Nombre no válido",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                disabled={loading}
                fullWidth
                sx={{ marginBottom: "1em" }}
                type="text"
                placeholder="0000 0000 0000 0000"
                label="Número de tarjeta*"
                error={!!errors.cardNumber}
                helperText={
                  errors.cardNumber
                    ? errors.cardNumber.message
                    : "Escribe el número de tu tarjeta..."
                }
                {...register("cardNumber", {
                  required: "El número de tarjeta es obligatorio",
                  validate: (value) =>
                    value.trim().length === 16
                      ? undefined
                      : "Nombre en la tarjeta no válido",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <StyledTextField
                  disabled={loading}
                  fullWidth
                  sx={{ marginBottom: "1em" }}
                  placeholder="MM/AA"
                  label="Fecha de expiración*"
                  error={!!errors.cardDate}
                  helperText={
                    errors.cardDate
                      ? errors.cardDate.message
                      : "Escribe la fecha de expiración de tu tarjeta..."
                  }
                  {...register("cardDate", {
                    required: "La fecha de expiración es obligatoria",
                    validate: (value) => {
                      value = value.replace("/", "");
                      return value.length === 4 &&
                        parseInt(value.substring(0, 2)) > 0 &&
                        parseInt(value.substring(0, 2)) < 13 &&
                        parseInt(value.substring(2, 4)) > 21 &&
                        parseInt(value.substring(2, 4)) < 100
                        ? undefined
                        : "Fecha no válida";
                    },
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledTextField
                  disabled={loading}
                  fullWidth
                  type={showCvv ? "text" : "password"}
                  sx={{ marginBottom: "1em", ml: 2 }}
                  placeholder="CVV"
                  label="CVV*"
                  autoComplete="off"
                  error={!!errors.cardCvv}
                  helperText={
                    errors.cardCvv
                      ? errors.cardCvv.message
                      : "Escribe el CVV de tu tarjeta..."
                  }
                  {...register("cardCvv", {
                    required: "El CVV es obligatorio",
                    validate: (value) => value.length === 3 || "CVV no válido",
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditScoreIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {showCvv ? (
                          <VisibilityIcon
                            onClick={() => setShowCvv(!showCvv)}
                            sx={{ cursor: "pointer" }}
                          />
                        ) : (
                          <VisibilityOffIcon
                            onClick={() => setShowCvv(!showCvv)}
                            sx={{ cursor: "pointer" }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <StyledButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                {loading ? "Espere, por favor" : "Completar registro"}
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
        <Box
          sx={{
            width: "100px",
            mr: 3,
          }}
        >
          <img
            src={logo}
            alt="Parkud"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Typography variant="h4" className="fade-animation">
          ¡Ya casi terminas!
        </Typography>
        <Typography variant="body1" className="fade-animation">
          Completa tu registro añadiendo tus datos bancarios para facturación .
        </Typography>
        <Link to={"/signup"}>
          <StyledButton2
            variant={"outlined"}
            className="fade-animation"
            onClick={back}
            disabled={loading}
          >
            <Typography variant="body1">Volver</Typography>
          </StyledButton2>
        </Link>
      </Box>
    </Box>
  );
};

export { PaySignUp };
