import { Box, Divider, Typography } from "@mui/material";

// Interfaces
import { ICaracteristica } from "../../../interfaces";

// Icons
import FeedIcon from "@mui/icons-material/Feed";

interface Props {
  idSede: number;
  nombre: string;
  caracteristicas: ICaracteristica[];
}

const SAInfoGeneral = ({ idSede, nombre, caracteristicas }: Props) => {
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
        <FeedIcon sx={{ mr: 1 }} />
        <Typography variant="body1" fontWeight={800}>
          Información general
        </Typography>
      </Box>
      <Divider flexItem sx={{ mb: 1 }} />
      <Typography variant="body1" fontWeight={400} sx={{ mb: 2 }}>
        Sede: <strong>{nombre}</strong> - # <strong>{idSede}</strong>
      </Typography>
      <Typography variant="body1" fontWeight={400}>
        Características:
      </Typography>
      {caracteristicas.map(({ idCaracteristica, nombre }) => (
        <Typography key={idCaracteristica} variant="body1" fontWeight={400}>
          - <strong>{nombre}</strong>
        </Typography>
      ))}
    </Box>
  );
};

export { SAInfoGeneral };
