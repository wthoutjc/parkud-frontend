import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

// React Hook Form
import { useForm } from "react-hook-form";

// Icons
import EmailIcon from "@mui/icons-material/Email";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

// Services
import { unblockUser } from "../../services";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";

// React Router DOM
import { useNavigate } from "react-router-dom";

const BlockedUsers = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleUnblock = ({ email }: { email: string }) => {
    setLoading(true);
    unblockUser(email).then(({ success, error, message }) => {
      setLoading(false);
      const notification = {
        id: uuid(),
        title: success ? "Éxito" : "Error",
        message: message || error || "Error al registrar la sede",
        type: success ? "success" : ("error" as "success" | "error"),
        autoDismiss: 5000,
      };
      dispatch(newNotification(notification));
      return navigate("/home");
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{
    email: string;
  }>();

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
        Desbloquear usuarios
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body2" fontWeight={400} sx={{ mb: 2 }}>
        <i>
          <strong>Nota:</strong> en tu bandeja de entrada de correo electrónico
          encontrarás un correo con el usuario bloqueado.
        </i>
      </Typography>
      <form onSubmit={handleSubmit(handleUnblock)}>
        <TextField
          fullWidth
          disabled={loading}
          type="email"
          placeholder="Ej someemail@email.com"
          autoComplete="parkud-email-user"
          label="Correo electrónico*"
          sx={{ mb: 2 }}
          error={!!errors.email}
          helperText={
            errors.email
              ? errors.email.message
              : "Escribe el correo electrónico..."
          }
          {...register("email", {
            required: "El correo electrónico es requerido",
            validate: (value) =>
              value.includes("@") || "El correo electrónico no es válido",
          })}
          value={watch("email") || ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          type="submit"
          disabled={loading}
          variant="contained"
          color="success"
          startIcon={<AdminPanelSettingsIcon />}
        >
          Desbloquear
        </Button>
      </form>
    </Box>
  );
};

export { BlockedUsers };
