import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { useState } from "react";

// Components
import { OperatorSkeleton } from "../../components";

// React Hook Form
import { useForm } from "react-hook-form";

// Interfaces
import { IOperator } from "../../interfaces";

// Icons
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';

const NewOperator = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOperator>({});

  const handleRegister = (data: IOperator) => {
    setLoading(true);
    console.log(data);
    setLoading(false);
  };

  if (loading) return <OperatorSkeleton />;

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography variant="body1" fontWeight={600}>
        Registar un nuevo operario
      </Typography>
      <form onSubmit={handleSubmit(handleRegister)}>
        <TextField
          disabled={loading}
          fullWidth
          type="text"
          placeholder="Ej 123456578"
          label="Cédula*"
          sx={{ mb: 2 }}
          error={!!errors.id}
          helperText={errors.id ? errors.id.message : "Escribe la cédula..."}
          {...register("id", {
            required: "La cédula es obligatoria",
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
            placeholder="Ej JuTo123"
            label="Nombre*"
            sx={{ mb: 2, width: "49%" }}
            error={!!errors.name}
            helperText={
              errors.name ? errors.name.message : "Escribe el nombre..."
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
          <TextField
            disabled={loading}
            fullWidth
            type="text"
            placeholder="Ej Pérez"
            label="Apellido*"
            sx={{ mb: 2, width: "49%" }}
            error={!!errors.lastName}
            helperText={
              errors.lastName
                ? errors.lastName.message
                : "Escribe el apellido..."
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
        <TextField
          disabled={loading}
          fullWidth
          type="text"
          placeholder="Ej JuTo123"
          label="Usuario"
          sx={{ mb: 2 }}
          error={!!errors.user}
          helperText={
            errors.user ? errors.user.message : "Escribe el usuario..."
          }
          {...register("user", {
            required: "El usuario es obligatorio",
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AdminPanelSettingsIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          disabled={loading}
          fullWidth
          type="text"
          placeholder="Ej JuTo123"
          label="Correo electrónico*"
          sx={{ mb: 2 }}
          error={!!errors.email}
          helperText={
            errors.email
              ? errors.email.message
              : "Escribe el correo electrónico..."
          }
          {...register("email", {
            required: "El correo electrónico es obligatorio",
            validate: (value) =>
              value.includes("@") || "Escribe un correo electrónico válido",
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ContactMailIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" color="success" variant="contained" fullWidth>
          Registrar
        </Button>
      </form>
    </Box>
  );
};

export { NewOperator };
