import { useState } from "react";

// React Hook Form
import { useForm } from "react-hook-form";

// Interfaces
import { IConfiguracion } from "../../interfaces";
import { Button, InputAdornment, TextField } from "@mui/material";

// Icons
import SettingsIcon from "@mui/icons-material/Settings";
import UpdateIcon from "@mui/icons-material/Update";

// Services
import { updateSetting } from "../../services";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";

// React Router DOM
import { useNavigate } from "react-router-dom";

interface Props {
  setting: IConfiguracion;
  edit: boolean;
}

const Setting = ({ setting, edit }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id, valor } = setting;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IConfiguracion>({
    defaultValues: {
      id,
      valor,
    },
  });

  const handleUpdate = (data: IConfiguracion) => {
    setLoading(true);
    updateSetting(data).then(({ success, error, message }) => {
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

  return (
    <form
      onSubmit={handleSubmit(handleUpdate)}
      style={{
        marginBottom: 20,
      }}
    >
      <TextField
        fullWidth
        type="text"
        placeholder={`Editar ${id}`}
        autoComplete="parkud-edit-setting"
        label={id}
        sx={{ mb: 1 }}
        error={!!errors.valor}
        helperText={errors.valor ? errors.valor.message : "Escribe el valor..."}
        {...register("valor", {
          required: "Este campo es requerido",
        })}
        value={watch("valor") || ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SettingsIcon />
            </InputAdornment>
          ),
          readOnly: !edit,
        }}
      />
      {edit && (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ mb: 2 }}
          color="success"
          startIcon={<UpdateIcon />}
        >
          {loading ? "Actualizando..." : "Actualizar"}
        </Button>
      )}
    </form>
  );
};

export { Setting };
