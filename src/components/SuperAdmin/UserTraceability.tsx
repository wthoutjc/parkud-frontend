import { useState, useCallback } from "react";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

// Services
import { getLogs } from "../../services";

// React Hook Form
import { useForm } from "react-hook-form";

// Interfaces
import { ILog } from "../../interfaces";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILog>();

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
          fullWidth
          disabled={loading}
          type="text"
          placeholder="Ej 1"
          autoComplete="parkud-id-user"
          label="ID Usuario*"
          sx={{ mb: 2 }}
          error={!!errors.id}
          helperText={
            errors.id ? errors.id.message : "Escribe el ID del usuario..."
          }
          {...register("id", {
            required: "El ID del usuario es requerido",
          })}
          value={watch("id") || ""}
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
                  <AccountCircleIcon />
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
                  <AccountCircleIcon />
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
