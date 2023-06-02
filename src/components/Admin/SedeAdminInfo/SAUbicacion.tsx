import { Box, Divider, Typography } from "@mui/material";

// Interfaces
import { ICiudades, IRegional } from "../../../interfaces";

// Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface Props {
  ciudad: ICiudades;
  latitud: number;
  longitud: number;
  regional: IRegional;
}

const SAUbicacion = ({ ciudad, latitud, longitud, regional }: Props) => {
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
        <LocationOnIcon sx={{ mr: 1 }} />
        <Typography variant="body1" fontWeight={800}>
          Ubicación
        </Typography>
      </Box>
      <Divider flexItem sx={{ mb: 1 }} />
      <Typography variant="body1" fontWeight={400}>
        Ciudad #<strong>{ciudad.idUbicacion}</strong>:{" "}
        <strong>{ciudad.descripcion}</strong>
      </Typography>
      <Typography variant="body1">
        Regional #<strong>{regional.idUbicacion}</strong>:{" "}
        <strong>{regional.descripcion}</strong>
      </Typography>
      <Typography variant="body1" fontWeight={400}>
        Latitud: <strong>{latitud}</strong> Longitud:{" "}
        <strong>{longitud}</strong>
      </Typography>
    </Box>
  );
};

export { SAUbicacion };
