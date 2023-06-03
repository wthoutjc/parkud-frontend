import { useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

// React Hook Form
import { useForm } from "react-hook-form";

// Icons
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import SendIcon from "@mui/icons-material/Send";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";

// Services
import { sendReserva } from "../../services";

interface SendProps {
  correo: string;
}

const SendReserva = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendProps>({});

  const handleSend = async ({ correo }: SendProps) => {
    if (
      window.confirm("¿Estás seguro de enviar el formulario de reserva?") ===
      true
    ) {
      setLoading(true);
      sendReserva(correo).then(({ success, error, message }) => {
        setLoading(false);
        const notification = {
          id: uuid(),
          title: success ? "Éxito" : "Error",
          message:
            message || error || "Error al enviar el formulario de reserva",
          type: success ? "success" : ("error" as "success" | "error"),
          autoDismiss: 5000,
        };
        dispatch(newNotification(notification));
        reset();
        return navigate("/home");
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSend)}>
      <TextField
        disabled={loading}
        fullWidth
        type="correo"
        placeholder="Ej someemail@correo.es"
        label="Correo electrónico*"
        sx={{ mb: 2 }}
        error={!!errors.correo}
        helperText={
          errors.correo
            ? errors.correo.message
            : "Escribe el correo electrónico..."
        }
        {...register("correo", {
          required: "El correo electrónico es obligatorio",
          validate: (value) =>
            value.includes("@") || "El correo electrónico debe ser válido",
        })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AttachEmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={loading}
        type="submit"
        variant="outlined"
        startIcon={<SendIcon />}
      >
        Enviar
      </Button>
    </form>
  );
};

export { SendReserva };
