import { useState } from "react";
import { Box, Typography, TextField, InputAdornment, Button } from "@mui/material";

// Interfaces
import { ISignUp, IPaySignUp } from "../../../interfaces";

// React Hook Form
import { useForm } from "react-hook-form";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import BadgeIcon from "@mui/icons-material/Badge";

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
import { INewAdministrador } from "../../interfaces";


const NewAdministrador = () => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewAdministrador>({

  });

const handleNewAdministrador = async (data: INewAdministrador) => {}

const [loading, setLoading] = useState(false);

  return (
    <Box sx={{

        width: "100%",
        height: "100%",
        p: 6,
        position: "relative",
        display: "flex",
        flexDirection: "column",
    }}> <Typography variant="body1" sx={{ mb: 2 }} fontWeight={800}>
    Registrar: Nuevo administrador
  </Typography> <form onSubmit={handleSubmit(handleNewAdministrador)} >
    <TextField
    disabled={loading}
    fullWidth
    type="text"
    placeholder="Ej Juan Daniel"
    label="Nombre"
    sx={{ mb: 2 }}
    error={!!errors.nombre}
    helperText={
      errors.nombre
        ? errors.nombre.message
        : "Escribe el nombre..."
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
  <Box 
    sx={{
      display: "flex",
      flexDirection: "column",
  }}
  >
    <TextField
    fullWidth
    type="text"
    placeholder="Ej Torres Silva"
    label="Apellido"
    sx={{ mb: 2 }}
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
  <Box 
    sx={{
      display: "flex",
      flexDirection: "column",
  }}
  >
    <TextField
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
  </Box>
  <Box 
    sx={{
      display: "flex",
      flexDirection: "column",
  }}
  >
    <TextField
    fullWidth
    type="text"
    placeholder="Ej JuanCastro123@gmail.com"
    label="Correo"
    sx={{ mb: 2 }}
    error={!!errors.correo}
    helperText={
      errors.correo
        ? errors.correo.message
        : "Escribe el correo..."
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
  </Box>
  <Box 
    sx={{
      display: "flex",
      flexDirection: "column",
  }}
  >
    <TextField
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
  </Box>
  <Button
          fullWidth
          type="submit"
          variant="contained"
          color="success"
          sx={{ mb: 2 }}
        >
          Registrar
        </Button>
  </form></Box>

  )
}

export {NewAdministrador}