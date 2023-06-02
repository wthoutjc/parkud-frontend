import { Box, Divider, Typography } from "@mui/material";

// Interfaces
import { ICupoAPI } from "../../../interfaces";

// Icons
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";

interface Props {
  cupos: ICupoAPI[];
  operarios: [];
  tiempoCompleto: 1 | 0;
  horaInicio: string;
  horaFin: string;
}

const SACapOp = ({
  cupos,
  horaFin,
  horaInicio,
  operarios,
  tiempoCompleto,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          mb: 1,
        }}
      >
        <ReduceCapacityIcon sx={{ mr: 1 }} />
        <Typography variant="body1" fontWeight={800}>
          Capacidad y operación
        </Typography>
      </Box>
      <Divider flexItem sx={{ mb: 1 }} />
      <Typography variant="body1" fontWeight={400}>
        <strong>Cupos</strong>
      </Typography>
      {cupos.map(({ cuenta, idTipo_Parqueadero }) => (
        <Typography key={idTipo_Parqueadero} variant="body1" fontWeight={400}>
          - <strong>{idTipo_Parqueadero}</strong>: {cuenta}
        </Typography>
      ))}
      <Typography variant="body1" fontWeight={400}>
        <strong>Horario</strong>
      </Typography>
      {tiempoCompleto ? (
        <Typography variant="body1" fontWeight={400}>
          Esta sede opera las 24 horas del día
        </Typography>
      ) : (
        <Typography variant="body1" fontWeight={400}>
          Esta sede opera desde las <strong>{horaInicio}</strong> hasta las{" "}
          <strong>{horaFin}</strong>
        </Typography>
      )}
      <Typography variant="body1" fontWeight={400}>
        <strong>Operarios</strong>
      </Typography>
      {operarios.length > 0 ? (
        operarios.map(({ idOperario, nombre }) => (
          <Typography key={idOperario} variant="body1" fontWeight={400}>
            - <strong>{nombre}</strong>
          </Typography>
        ))
      ) : (
        <Typography variant="body1" fontWeight={400}>
          - No hay operarios registrados
        </Typography>
      )}
    </Box>
  );
};

export { SACapOp };
