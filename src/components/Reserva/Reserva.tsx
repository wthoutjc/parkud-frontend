import { useEffect, useState } from "react";

// React Router DOM
import { useParams } from "react-router-dom";

// Services
import { getReserva } from "../../services";

// Interfaces
import { IStatusReserva } from "../../interfaces";
import { Box, Divider, Typography } from "@mui/material";

interface Props {
  statusReserva?: IStatusReserva;
}

const Reserva = ({ statusReserva }: Props) => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | IStatusReserva>(
    statusReserva ?? null
  );

  useEffect(() => {
    if (id && !statusReserva) {
      setLoading(true);
      getReserva(id).then((res) => {
        setLoading(false);
        setStatus(res);
      });
    }
  }, [id, statusReserva]);

  if (loading) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Typography variant="body1" fontWeight={600}>
        Estado de la reserva #{id}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {status?.error && (
        <Box
          sx={{
            p: 2,
            backgroundColor: "error.main",
            color: "error.contrastText",
            borderRadius: 1,
            mb: 2,
          }}
        >
          {status.error}
        </Box>
      )}
      {status?.reserva ? (
        <Box>
          <Typography variant="body2" fontWeight={400} sx={{ mb: 2 }}>
            Parqueadero: <strong>{status.reserva.idParqueadero}</strong> de tipo{" "}
            <strong>{status.reserva.tipoParqueadero}</strong>
          </Typography>
          <Typography variant="body2" fontWeight={400} sx={{ mb: 2 }}>
            Cliente:{" "}
            <strong>{`${status.reserva.nombreCliente} ${status.reserva.apellidoCliente}`}</strong>
          </Typography>
          <Typography variant="body2" fontWeight={400}>
            Fecha inicio: <strong>{status.reserva.horaInicio}</strong>
          </Typography>
          <Typography variant="body2" fontWeight={400}>
            Fecha salida: <strong>{status.reserva.horaSalida}</strong>
          </Typography>
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export { Reserva };
