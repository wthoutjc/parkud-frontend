import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";

// Services
import { getLogs, getAllUSers } from "../../services";

// React Hook Form
import { useForm } from "react-hook-form";

// Interfaces
import { ILog, IResponseAllUser } from "../../interfaces";

// Icons
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import SearchIcon from "@mui/icons-material/Search";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";

// Components
import { Table } from "../../components";

const UserTraceability = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<
    {
      id: number;
      ip: string;
      usuario: string;
      mensaje: string;
      fecha_hora: string;
    }[]
  >([]);
  const [totalLogs, setTotalLogs] = useState(0);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [users, setUsers] = useState<IResponseAllUser[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILog>({
    defaultValues: {
      id: "Seleccionar",
    },
  });

  const handleSearch = useCallback(
    async (data: ILog) => {
      const offset = (page - 1) * limit;
      setLoading(true);
      getLogs(limit, offset, data).then(({ cuenta, logs }) => {
        setLoading(false);
        if (!cuenta) {
          const notification = {
            id: uuid(),
            title: "Error",
            message: "Selecciona una ubicación para la sede",
            type: "error" as "success" | "error",
            autoDismiss: 5000,
          };
          dispatch(newNotification(notification));
          return;
        }
        setLogs(logs);
        setTotalLogs(cuenta);
      });
    },
    [limit, page, dispatch]
  );

  useEffect(() => {
    setLoading(true);
    getAllUSers().then(({ usuarios }) => {
      setLoading(false);
      setUsers(usuarios);
    });
  }, []);

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
        Consultar trazabilidad de usuario
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <form
        onSubmit={handleSubmit(handleSearch)}
        style={{
          marginBottom: 20,
        }}
      >
        <TextField
          disabled={loading}
          fullWidth
          select
          placeholder="Ej Pepito Pérez"
          label="Administrador*"
          error={!!errors.id}
          sx={{ mb: 2 }}
          helperText={
            errors.id
              ? errors.id.message
              : "Selecciona un administrador para esta sede"
          }
          {...register("id", {
            required: "El administrador es obligatorio",
            validate: (value) =>
              value !== "Seleccionar" || "Selecciona una administrador",
          })}
          value={watch("id")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SupervisedUserCircleIcon />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value={"Seleccionar"}>Seleccionar</MenuItem>
          {users.map(({ usuario, idUsuario }) => (
            <MenuItem key={idUsuario} value={idUsuario}>
              {usuario}
            </MenuItem>
          ))}
        </TextField>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <TextField
            fullWidth
            disabled={loading}
            type="datetime-local"
            placeholder="Ej 2023-06-03 22:43"
            autoComplete="parkud-startDate"
            label="Fecha de inicio*"
            sx={{ width: "49%" }}
            error={!!errors.startDate}
            helperText={
              errors.startDate
                ? errors.startDate.message
                : "Escribe la fecha de inicio..."
            }
            {...register("startDate", {
              required: "La fecha de inicio es requerida",
            })}
            value={watch("startDate") || ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HourglassTopIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            disabled={loading}
            type="datetime-local"
            placeholder="Ej 2023-06-03 22:44"
            autoComplete="parkud-endDate"
            label="Fecha de fin*"
            sx={{ width: "49%" }}
            error={!!errors.endDate}
            helperText={
              errors.endDate
                ? errors.endDate.message
                : "Escribe la fecha de fin..."
            }
            {...register("endDate", {
              required: "La fecha de fin es requerida",
            })}
            value={watch("endDate") || ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HourglassBottomIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          fullWidth
          type="submit"
          disabled={loading}
          variant="contained"
          color="success"
          startIcon={<SearchIcon />}
        >
          Buscar
        </Button>
      </form>
      <Table
        title="Logs"
        loading={loading}
        limit={limit}
        page={page}
        setLimit={setLimit}
        setPage={setPage}
        totalData={totalLogs}
        to="none"
        context={{
          delete: {
            enabled: false,
          },
          read: {
            enabled: false,
          },
          update: {
            enabled: false,
          },
        }}
        columns={["Fecha", "#", "IP", "Mensaje", "Usuario"]}
        data={logs}
      />
    </Box>
  );
};

export { UserTraceability };
