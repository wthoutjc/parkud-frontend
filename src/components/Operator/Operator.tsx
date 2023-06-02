import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

// React Router DOM
import { useParams } from "react-router-dom";

// Components
import { OperatorSkeleton } from "../../components";

// React Hook Form
import { useForm } from "react-hook-form";

// Interfaces
import { IOperator } from "../../interfaces";

// Icons
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import EditIcon from "@mui/icons-material/Edit";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';

const Operator = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);

  const [edit, setEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOperator>({
    defaultValues: {
      id: 1002356897,
      email: "correo@gmail.com",
      lastName: "Pérez",
      name: "Pepe",
      user: "pepeperez",
    },
  });

  const handleUpdate = (data: IOperator) => {
    console.log(data);
  };

  useEffect(() => {
    setLoading(true);
    console.log(id);
    setLoading(false);
  }, [id]);

  if (loading) return <OperatorSkeleton />;

  return (
    <Box
      sx={{
        p: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1" fontWeight={600}>
          Datos del operario #{id} de la sede {"xd"}
        </Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          size="small"
          sx={{ mb: 2 }}
          onClick={() => setEdit(!edit)}
          color={edit ? "error" : "primary"}
        >
          {edit ? "Cancelar" : "Editar"}
        </Button>
      </Box>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <TextField
          disabled={loading}
          fullWidth
          type="text"
          placeholder="Ej 123456578"
          label="Cédula*"
          sx={{ mb: 2 }}
          error={!!errors.id}
          helperText={
            edit ? (errors.id ? errors.id.message : "Escribe la cédula...") : ""
          }
          {...register("id", {
            required: "La cédula es obligatoria",
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SwitchAccountIcon />
              </InputAdornment>
            ),
            readOnly: !edit,
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
              edit
                ? errors.name
                  ? errors.name.message
                  : "Escribe el nombre..."
                : ""
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
              readOnly: !edit,
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
              edit
                ? errors.lastName
                  ? errors.lastName.message
                  : "Escribe el apellido..."
                : ""
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
              readOnly: !edit,
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
            edit
              ? errors.user
                ? errors.user.message
                : "Escribe el usuario..."
              : ""
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
            readOnly: !edit,
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
            edit
              ? errors.email
                ? errors.email.message
                : "Escribe el correo electrónico..."
              : ""
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
            readOnly: !edit,
          }}
        />
        {edit && (
          <Button type="submit" color="success" variant="contained" fullWidth>
            Actualizar
          </Button>
        )}
      </form>
    </Box>
  );
};

export { Operator };
