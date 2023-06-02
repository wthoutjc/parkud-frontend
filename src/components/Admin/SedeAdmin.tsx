import { Box, Button, ButtonGroup } from "@mui/material";

// Icons
import FeedIcon from "@mui/icons-material/Feed";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import PriceChangeIcon from "@mui/icons-material/PriceChange";

// Interfaces
import { ISedeAdminAPI } from "../../interfaces";

// Components
import {
  SAInfoGeneral,
  SAUbicacion,
  SACapOp,
  SAPrecios,
} from "../../components";

interface Props {
  render: number;
  setRender: React.Dispatch<React.SetStateAction<number>>;
  sedeAdmin: ISedeAdminAPI;
}

const SedeAdmin = ({ render, setRender, sedeAdmin }: Props) => {
  const {
    idSede,
    nombre,
    caracteristicas_sel,
    ciudad,
    latitud,
    longitud,
    regional,
    cupos,
    operarios,
    tiempoCompleto,
    horaInicio,
    horaFin,
    fidelizacion,
    tarifas,
  } = sedeAdmin;

  const handleChange = (
    _: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    newValue: number
  ) => {
    setRender(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        sx={{ mr: 2 }}
      >
        {[
          { value: 1, icon: <FeedIcon />, label: "Información general" },
          { value: 2, icon: <LocationOnIcon />, label: "Ubicación" },
          {
            value: 3,
            icon: <ReduceCapacityIcon />,
            label: "Capacidad y operación",
          },
          {
            value: 4,
            icon: <PriceChangeIcon />,
            label: "Precios y promociones",
          },
        ].map(({ label, value, icon }) => (
          <Button
            key={value}
            onClick={(event) => handleChange(event, value)}
            variant={render === value ? "contained" : "outlined"}
            startIcon={icon}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          backgroundColor: "background.paper",
          borderRadius: 1,
          p: 2,
        }}
      >
        {render === 1 && (
          <SAInfoGeneral
            idSede={idSede}
            nombre={nombre}
            caracteristicas={caracteristicas_sel}
          />
        )}
        {render === 2 && (
          <SAUbicacion
            ciudad={ciudad}
            latitud={latitud}
            longitud={longitud}
            regional={regional}
          />
        )}
        {render === 3 && (
          <SACapOp
            cupos={cupos}
            operarios={operarios}
            tiempoCompleto={tiempoCompleto}
            horaInicio={horaInicio}
            horaFin={horaFin}
          />
        )}
        {render === 4 && (
          <SAPrecios fidelizacion={fidelizacion} tarifas={tarifas} />
        )}
      </Box>
    </Box>
  );
};

export { SedeAdmin };
