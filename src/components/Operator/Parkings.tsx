import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
// Interfaces
import { IParqueaderos } from "../../interfaces";
import { Link } from "react-router-dom";

interface Props {
  parqueaderos: IParqueaderos[];
}
const Parkings = ({ parqueaderos }: Props) => {
  return (
    <>
      {parqueaderos.map(({ idParqueadero, reservas, tipoParqueadero }) => (
        <Card key={idParqueadero} sx={{ mb: 2 }}>
          <CardHeader
            title={`Parqueadero #${idParqueadero}`}
            subheader={`Tipo: ${tipoParqueadero}`}
          />
          <CardContent>
            <Box>
              <Typography variant="body2" fontWeight={400}>
                Reservas:
              </Typography>
              {reservas.length > 0 ? (
                reservas.map(({ idReserva, horaInicio, horaSalida }) => {
                  return (
                    <Box key={idReserva}>
                      <Typography variant="body2" fontWeight={400}>
                        Hora inicio: <strong>{horaInicio}</strong>
                      </Typography>
                      <Typography variant="body2" fontWeight={400}>
                        Hora salida: <strong>{horaSalida}</strong>
                      </Typography>
                      <CardActions disableSpacing>
                        <Link
                          to={`/reserva/${idReserva}`}
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          <Typography variant="body2" fontWeight={400}>
                            Ver reserva
                          </Typography>
                        </Link>
                      </CardActions>
                    </Box>
                  );
                })
              ) : (
                <Typography variant="body2" fontWeight={400}>
                  <i>Sin reservas programadas</i>
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export { Parkings };
