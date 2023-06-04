// Interfaces
import { Box, Button, Typography } from "@mui/material";
import {
  IExportCiudadJSON,
  IExportClienteJSON,
  IGenerateReports,
} from "../../interfaces";

// Icons
import DownloadIcon from "@mui/icons-material/Download";

interface Props {
  prev: IExportCiudadJSON[] | IExportClienteJSON[];
  export: (data: IGenerateReports) => void;
  type: "cliente" | "ciudad" | "Seleccionar";
  data: IGenerateReports;
  loading: boolean;
}

const Preview = ({ prev, type, export: download, data, loading }: Props) => {
  return (
    <Box sx={{ m: 1 }}>
      <Typography variant="body1" fontWeight={600}>
        Vista previa de {type === "ciudad" ? "ciudades" : "clientes"}
      </Typography>
      <Button
        sx={{ mt: 1, mb: 1 }}
        size={"small"}
        disabled={loading}
        variant="contained"
        onClick={() => download(data)}
        color="success"
        startIcon={<DownloadIcon fontSize="small" />}
      >
        {loading ? "Descargando..." : "Descargar"}
      </Button>
      {type === "ciudad" &&
        prev.map((item, index) => {
          const { ciudad, idReserva, region, sede } = item as IExportCiudadJSON;
          return (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>Reserva: {idReserva}</strong>
              </Typography>
              <Typography variant="body2">Sede: {sede}</Typography>
              <Typography variant="body2">Region: {region}</Typography>
              <Typography variant="body2">Ciudad: {ciudad}</Typography>
            </Box>
          );
        })}
      {type === "cliente" &&
        prev.map((item, index) => {
          const {
            cliente,
            fechaFin,
            fechaInicio,
            idReserva,
            tipoParqueadero,
            total,
          } = item as IExportClienteJSON;
          return (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>Reserva: {idReserva}</strong>
              </Typography>
              <Typography variant="body2">Cliente: {cliente}</Typography>
              <Typography variant="body2">Inicio: {fechaInicio}</Typography>
              <Typography variant="body2">Fin: {fechaFin}</Typography>
              <Typography variant="body2">
                Tipo parqueadero: {tipoParqueadero}
              </Typography>
              <Typography variant="body2">Total: {total}</Typography>
            </Box>
          );
        })}
    </Box>
  );
};

export { Preview };
