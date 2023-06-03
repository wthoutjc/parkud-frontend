import { useEffect, useState } from "react";
import { Box, IconButton, Paper } from "@mui/material";

// Components
import { FindParking, Maps } from "../../components";

// Icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Interfaces
import { ILocation, IResponseSedeClient } from "../../interfaces";

const Client = () => {
  const [open, setOpen] = useState(true);

  const [sedes, setSedes] = useState<IResponseSedeClient[]>([]);
  const [locations, setLocations] = useState<ILocation[]>([]);

  const [sede, setSede] = useState<null | IResponseSedeClient>(null);

  const handleSelectSede = (idSede: number) => {
    setOpen(true);
    const sede = sedes.find((sede) => sede.idSede === idSede);
    if (sede) setSede(sede);
  };

  useEffect(() => {
    if (sedes.length > 0) {
      setOpen(false);
      setLocations(
        sedes.map(({ idSede, latitud, longitud }) => ({
          idSede,
          lat: latitud,
          lng: longitud,
        }))
      );
    }
  }, [sedes]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          position: "relative",
        }}
      >
        {open && (
          <Box
            sx={{
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
              display: "flex",
              overflow: "hidden",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Box
              sx={{
                width: "60%",
              }}
            />
            <Box
              sx={{
                backgroundColor: "primary.light",
                width: "40%",
                display: "flex",
              }}
              className="animate__animated animate__slideInRight"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "primary.dark",
                }}
              >
                <IconButton onClick={() => setOpen(false)}>
                  <ArrowForwardIosIcon
                    sx={{
                      fill: "white",
                    }}
                  />
                </IconButton>
              </Box>
              <FindParking setSedes={setSedes} sede={sede} />
            </Box>
          </Box>
        )}
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Paper elevation={10}>
            <Maps open={handleSelectSede} zoom={13} locations={locations} />
          </Paper>
        </Box>
        <Box
          sx={{
            width: "45px",
            backgroundColor: "primary.dark",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={() => setOpen(true)}>
            <ArrowBackIosIcon
              sx={{
                fill: "white",
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export { Client };
