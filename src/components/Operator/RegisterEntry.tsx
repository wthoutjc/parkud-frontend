import { useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

// React Hook Form
import { useForm } from "react-hook-form";

// Icons
import BookIcon from "@mui/icons-material/Book";
import SearchIcon from "@mui/icons-material/Search";

// Services
import { getReserva, registerEntry } from "../../services";

// Components
import { Reserva } from "../../components";

// Interfaces
import { IStatusReserva } from "../../interfaces";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";

interface EntryProps {
  id: string;
}

const RegisterEntry = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [statusReserva, setStatusReserva] = useState<null | IStatusReserva>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EntryProps>({});

  const handleGetReserva = async ({ id }: EntryProps) => {
    setLoading(true);
    getReserva(id).then((res) => {
      setLoading(false);
      setStatusReserva(res);
    });
  };

  const handleRegisterEntry = async () => {
    if (!statusReserva) return;
    if (!statusReserva.reserva) return;

    if (window.confirm("¿Estás seguro de registrar la entrada?") === true) {
      setLoading(true);
      registerEntry(String(statusReserva.reserva.idReserva)).then(
        ({ success, error, message }) => {
          setLoading(false);
          const notification = {
            id: uuid(),
            title: success ? "Éxito" : "Error",
            message: message || error || "Error al registrar la entrada",
            type: success ? "success" : ("error" as "success" | "error"),
            autoDismiss: 5000,
          };
          dispatch(newNotification(notification));
          reset();
          return navigate("/home");
        }
      );
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(handleGetReserva)}>
        <TextField
          disabled={loading}
          fullWidth
          type="text"
          placeholder="Ej 1"
          label="ID de la reserva*"
          sx={{ mb: 2 }}
          error={!!errors.id}
          helperText={
            errors.id ? errors.id.message : "Escribe el ID de la reserva..."
          }
          {...register("id", {
            required: "El ID de la reserva es obligatorio",
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BookIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          disabled={loading}
          type="submit"
          variant="outlined"
          startIcon={<SearchIcon />}
        >
          BUSCAR
        </Button>
      </form>
      {statusReserva && statusReserva.error && (
        <Box>
          <Reserva statusReserva={statusReserva} />
        </Box>
      )}
      {statusReserva && !statusReserva.error && (
        <Box>
          <Reserva statusReserva={statusReserva} />
          <Button
            disabled={loading}
            onClick={handleRegisterEntry}
            variant="contained"
          >
            REGISTRAR ENTRADA
          </Button>
        </Box>
      )}
    </Box>
  );
};

export { RegisterEntry };
