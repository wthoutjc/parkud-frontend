import { useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

// React Hook Form
import { useForm } from "react-hook-form";

// Icons
import BookIcon from "@mui/icons-material/Book";
import SearchIcon from "@mui/icons-material/Search";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";

// Services
import { registerOutput } from "../../services";

interface OutputProps {
  id: string;
}

const RegisterOutput = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OutputProps>({});

  const handleRegisterOutput = async ({ id }: OutputProps) => {
    if (window.confirm("¿Estás seguro de registrar la salida?") === true) {
      setLoading(true);
      registerOutput(id).then(({ success, error, message }) => {
        setLoading(false);
        const notification = {
          id: uuid(),
          title: success ? "Éxito" : "Error",
          message: message || error || "Error al registrar la salida",
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
    <form onSubmit={handleSubmit(handleRegisterOutput)}>
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
        Registrar salida
      </Button>
    </form>
  );
};

export { RegisterOutput };
