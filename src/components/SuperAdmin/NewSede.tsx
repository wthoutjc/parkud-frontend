import { useState } from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";

// Interfaces
import { ISignUp, IPaySignUp } from "../../../interfaces";

// React Hook Form
import { useForm } from "react-hook-form";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
import { INewSede } from "../../interfaces";


const NewSede = () => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewSede>({
  });

const handleNewSede = async (data: INewSede) => {}

const [loading, setLoading] = useState(false);

  return (
    <Box sx={{
      width: "100%",
    }}>              <form onSubmit={handleSubmit(handleNewSede)} ><TextField
    disabled={loading}
    fullWidth
    type="text"
    placeholder="Ej 123456789"
    label="Cédula*"
    error={!!errors.nombre}
    helperText={
      errors.nombre
        ? errors.nombre.message
        : "Escibe tu número de cédula..."
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
  /></form></Box>

  )
}

export {NewSede}