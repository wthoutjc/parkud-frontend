import {
  Box,
  Button,
  CircularProgress,
  Divider,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

// Interfaces
import {
  IClientReserva,
  ICreditCard,
  IResponseSedeClient,
} from "../../interfaces";
import { useEffect, useState } from "react";

// Services
import { getCreditCards, reservar } from "../../services";

// React Hook Form
import { useForm } from "react-hook-form";

// Icons
import CreditCardIcon from "@mui/icons-material/CreditCard";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import BookIcon from "@mui/icons-material/Book";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";

interface Props {
  sede: IResponseSedeClient;
}

const ReservarSede = ({ sede }: Props) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [loadingPayMethod, setLoadingPayMethod] = useState(false);

  const [creditCards, setCreditCards] = useState<ICreditCard[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IClientReserva>({
    defaultValues: {
      idCard: "Seleccionar",
      idSede: sede.idSede,
    },
  });

  const handleReservar = (data: IClientReserva) => {
    if (window.confirm("¿Estás seguro de reservar en esta sede?") === true) {
      setLoading(true);
      reservar(data).then(({ success, error, message }) => {
        setLoading(false);
        const notification = {
          id: uuid(),
          title: success ? "Éxito" : "Error",
          message: message || error || "Error al registrar la entrada",
          type: success ? "success" : ("error" as "success" | "error"),
          autoDismiss: 5000,
        };
        dispatch(newNotification(notification));
        if (success) reset();
        return;
      });
    }
  };

  useEffect(() => {
    setLoadingPayMethod(true);
    getCreditCards().then(({ tarjetas }) => {
      setLoadingPayMethod(false);
      setCreditCards(tarjetas);
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        p: 2,
      }}
    >
      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
        Reservar en <strong>{sede.nombre}</strong>
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <form onSubmit={handleSubmit(handleReservar)}>
        {loadingPayMethod ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <CircularProgress size={25} sx={{ mr: 2 }} />
            <Typography variant="body2">
              <i>Cargando métodos de pago, por favor espere...</i>
            </Typography>
          </Box>
        ) : (
          <TextField
            disabled={loading}
            fullWidth
            select
            placeholder="Ej XXXX-XXXX-XXXX-XXXX"
            label="Tarjeta de crédito*"
            error={!!errors.idCard}
            sx={{ mb: 2 }}
            helperText={
              errors.idCard
                ? errors.idCard.message
                : "Selecciona un método de pago"
            }
            {...register("idCard", {
              required: "El administrador es obligatorio",
              validate: (value) =>
                value !== "Seleccionar" || "Selecciona una tarjeta",
            })}
            value={watch("idCard")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value={"Seleccionar"}>Seleccionar</MenuItem>
            {creditCards.map(({ idTarjeta, tarjeta }) => (
              <MenuItem key={idTarjeta} value={idTarjeta}>
                {tarjeta}
              </MenuItem>
            ))}
          </TextField>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          className="animate__animated animate__fadeInDown"
        >
          <TextField
            fullWidth
            type="text"
            placeholder="Ej 06:00"
            autoComplete="parkud-start-time"
            label="Hora Inicio*"
            sx={{ mb: 1, width: "49%" }}
            error={!!errors.startTime}
            helperText={
              errors.startTime
                ? errors.startTime.message
                : "Escribe la hora de inicio..."
            }
            {...register("startTime", {
              required: "La hora de inicio es obligatoria...",
              validate: (value) =>
                /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) ||
                "Formato de hora incorrecto",
            })}
            value={watch("startTime")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HourglassTopIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            type="text"
            placeholder="Ej 23:00"
            autoComplete="parkud-end-time"
            label="Hora Fin*"
            sx={{ mb: 1, width: "50%" }}
            error={!!errors.endTime}
            helperText={
              errors.endTime
                ? errors.endTime.message
                : "Escribe la hora de fin..."
            }
            {...register("endTime", {
              required: "La hora de fin es obligatoria...",
              validate: (value) =>
                /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) ||
                "Formato de hora incorrecto",
            })}
            value={watch("endTime")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HourglassBottomIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          disabled={loading}
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          startIcon={<BookIcon />}
        >
          RESERVAR
        </Button>
      </form>
    </Box>
  );
};

export { ReservarSede };
