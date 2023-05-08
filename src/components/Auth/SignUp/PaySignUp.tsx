import { useState } from "react";
import { Box, Typography, InputAdornment, MenuItem } from "@mui/material";

// Interfaces
import { ISignUp } from "../../../interfaces";

// React Hook Form
import { useForm } from "react-hook-form";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TaskIcon from "@mui/icons-material/Task";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

// Styled Components
import {
  StyledTextField,
  StyledButton,
  StyledButton2,
} from "../../../components";

// React Router DOM
import { Link } from "react-router-dom";

interface IPaySignUp {
  cardNumber: string;
  cardName: string;
  cardDate: string;
  cardCvv: string;
  cardType: string;
  typeCard: "C" | "D" | "Seleccionar";
  idNumber: string;
}

interface Props extends ISignUp {
  back: () => void;
}

const PaySignUp = ({ back }: Props) => {
  const [showCvv, setShowCvv] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IPaySignUp>({
    defaultValues: {
      typeCard: "Seleccionar",
    },
  });

  const handleSignup = async () => {
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
        <Typography variant="h4">Completar registro</Typography>
        <Box display={"flex"}>
          <Box sx={{ boxSizing: "border-box", padding: "1em", width: "100%" }}>
            <form onSubmit={handleSubmit(handleSignup)}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <StyledTextField
                  select
                  label="Tipo de tarjeta*"
                  error={!!errors.typeCard}
                  sx={{ mb: 2, mr: 2, width: "40%" }}
                  helperText={
                    errors.typeCard
                      ? errors.typeCard.message
                      : "Selecciona el tipo de tarjeta..."
                  }
                  {...register("typeCard", {
                    required: "El tipo de archivo es requerido",
                    validate: (value) =>
                      value !== "Seleccionar" ||
                      "Selecciona un tipo de tarjeta",
                  })}
                  value={watch("typeCard")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TaskIcon />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value={"Seleccionar"}>Seleccionar</MenuItem>
                  <MenuItem value={"C"}>Crédito</MenuItem>
                  <MenuItem value={"D"}>Débito</MenuItem>
                </StyledTextField>
                <StyledTextField
                  fullWidth
                  type="text"
                  sx={{ marginBottom: "1em", width: "60%" }}
                  placeholder="Ej 123456789"
                  label="Cédula*"
                  error={!!errors.idNumber}
                  helperText={
                    errors.idNumber
                      ? errors.idNumber.message
                      : "Escibe tu número de cédula..."
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
              </Box>
              <StyledTextField
                fullWidth
                sx={{ marginBottom: "1em" }}
                placeholder="Ej PEPE PEREZ"
                label="Nombre en la tarjeta*"
                error={!!errors.cardName}
                helperText={
                  errors.cardName
                    ? errors.cardName.message
                    : "Escibe el nombre que aparece en la tarjeta..."
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
                fullWidth
                sx={{ marginBottom: "1em" }}
                type="text"
                placeholder="0000 0000 0000 0000"
                label="Número de tarjeta*"
                error={!!errors.cardNumber}
                helperText={
                  errors.cardNumber
                    ? errors.cardNumber.message
                    : "Escibe el número de tu tarjeta..."
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
                  fullWidth
                  sx={{ marginBottom: "1em" }}
                  placeholder="MM/AA"
                  label="Fecha de expiración*"
                  error={!!errors.cardDate}
                  helperText={
                    errors.cardDate
                      ? errors.cardDate.message
                      : "Escibe la fecha de expiración de tu tarjeta..."
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
                  fullWidth
                  type={showCvv ? "text" : "password"}
                  sx={{ marginBottom: "1em", ml: 2 }}
                  placeholder="CVV"
                  label="CVV*"
                  error={!!errors.cardCvv}
                  helperText={
                    errors.cardCvv
                      ? errors.cardCvv.message
                      : "Escibe el CVV de tu tarjeta..."
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
              <StyledButton type="submit" variant="contained" fullWidth>
                Completar registro
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
          >
            <Typography variant="body1">Volver</Typography>
          </StyledButton2>
        </Link>
      </Box>
    </Box>
  );
};

export { PaySignUp };
