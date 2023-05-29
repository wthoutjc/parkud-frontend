import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

// React Hook Form
import { useForm } from "react-hook-form";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import BadgeIcon from "@mui/icons-material/Badge";

// React Router DOM
// import { Link, useNavigate } from "react-router-dom";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";

// Interfaces
import { INewAdministrador } from "../../interfaces";

// Services
import { registerAdmin } from "../../services";

const NewAdministrador = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewAdministrador>({});

  const handleNewAdministrador = async (data: INewAdministrador) => {
    setLoading(true);
    registerAdmin(data).then(({ success, error, message }) => {
      setLoading(false);
      const notification = {
        id: uuid(),
        title: success ? "Éxito" : "Error",
        message: message || error || "Error al registrar la sede",
        type: success ? "success" : ("error" as "success" | "error"),
        autoDismiss: 5000,
      };
      dispatch(newNotification(notification));
    });
  };

  const [loading, setLoading] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="body1" sx={{ mb: 2 }} fontWeight={800}>
        Registrar: Nuevo administrador
      </Typography>
      <form onSubmit={handleSubmit(handleNewAdministrador)}>
        <TextField
          disabled={loading}
          fullWidth
          type="text"
          placeholder="Ej JuTo123"
          label="Usuario"
          sx={{ mb: 2 }}
          error={!!errors.idusuario}
          helperText={
            errors.idusuario
              ? errors.idusuario.message
              : "Escribe el usuario..."
          }
          {...register("idusuario", {
            required: "El usuario es obligatorio",
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SwitchAccountIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            disabled={loading}
            fullWidth
            type="text"
            placeholder="Ej Juan Daniel"
            label="Nombre"
            sx={{ mb: 2, width: "49%" }}
            error={!!errors.nombre}
            helperText={
              errors.nombre ? errors.nombre.message : "Escribe el nombre..."
            }
            {...register("nombre", {
              required: "El nombre es obligatorio",
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            disabled={loading}
            fullWidth
            type="text"
            placeholder="Ej Torres Silva"
            label="Apellido"
            sx={{ mb: 2, width: "49%" }}
            error={!!errors.apellido}
            helperText={
              errors.apellido
                ? errors.apellido.message
                : "Escribe el apellido..."
            }
            {...register("apellido", {
              required: "El apellido es obligatorio",
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
        <TextField
          disabled={loading}
          fullWidth
          type="text"
          placeholder="Ej 1001258963"
          label="Documento"
          sx={{ mb: 2 }}
          error={!!errors.documento}
          helperText={
            errors.documento
              ? errors.documento.message
              : "Escribe el documento..."
          }
          {...register("documento", {
            required: "El documento es obligatorio",
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          disabled={loading}
          fullWidth
          type="text"
          placeholder="Ej JuanCastro123@gmail.com"
          label="Correo"
          sx={{ mb: 2 }}
          error={!!errors.correo}
          helperText={
            errors.correo ? errors.correo.message : "Escribe el correo..."
          }
          {...register("correo", {
            required: "El correo es obligatorio",
          })}
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
          variant="contained"
          color="success"
          sx={{ mb: 2 }}
          disabled={loading}
        >
          Registrar
        </Button>
      </form>
    </Box>
  );
};

export { NewAdministrador };
