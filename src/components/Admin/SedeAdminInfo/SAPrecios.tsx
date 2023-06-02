import { Box, Divider, Typography } from "@mui/material";

// Interfaces
import { ITarifaAPI } from "../../../interfaces";

// Icons
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";

interface Props {
  fidelizacion: 1 | 0;
  tarifas: ITarifaAPI[];
}

const SAPrecios = ({ fidelizacion, tarifas }: Props) => {
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
          Precios y promociones
        </Typography>
      </Box>
      <Divider flexItem sx={{ mb: 1 }} />
      <Typography variant="body1" fontWeight={400} sx={{ mb: 2 }}>
        {fidelizacion
          ? "Esta sede promueve programas de fidelización"
          : "Esta sede no promueve programas de fidelización"}
      </Typography>
      <Typography variant="body1" fontWeight={400}>
        <strong>Tarifas</strong>
      </Typography>
      {tarifas.map(({ idTarifa, idTipo_Parqueadero, valor }) => (
        <Typography key={idTarifa} variant="body1" fontWeight={400}>
          - {idTipo_Parqueadero} : <strong>{valor}</strong>
        </Typography>
      ))}
    </Box>
  );
};

export { SAPrecios };
