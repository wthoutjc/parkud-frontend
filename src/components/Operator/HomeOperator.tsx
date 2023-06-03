import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

// Services
import { getStatusParqueaderos } from "../../services";

// Interfaces
import { IParqueaderos } from "../../interfaces";

// Icons
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import OutputIcon from '@mui/icons-material/Output';
import SendIcon from '@mui/icons-material/Send';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

// Components
import { Parkings, RegisterEntry, SendReserva } from "../../components";
import { RegisterOutput } from "./RegisterOutput";

type Value = "entry" | "output" | "send" | "parking";

const HomeOperator = () => {
  const [loading, setLoading] = useState(false);
  const [parqueaderos, setParqueaderos] = useState<IParqueaderos[]>([]);

  const [value, setValue] = useState<Value>("entry");

  const handleChange = (_: React.SyntheticEvent, newValue: Value) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(true);
    getStatusParqueaderos().then(({ parqueaderos }) => {
      setLoading(false);
      setParqueaderos(parqueaderos);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <BottomNavigation
        sx={{ width: "100%", backgroundColor: "background.paper" }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Registrar entrada"
          value="entry"
          icon={<AppRegistrationIcon />}
        />
        <BottomNavigationAction
          label="Registar salida"
          value="output"
          icon={<OutputIcon />}
        />
        <BottomNavigationAction
          label="Enviar correo"
          value="send"
          icon={<SendIcon />}
        />
        <BottomNavigationAction
          label="Parqueaderos"
          value="parking"
          icon={<LocalParkingIcon />}
        />
      </BottomNavigation>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
          {value === "entry" && "Registrar entrada"}
          {value === "output" && "Registrar salida"}
          {value === "send" && "Enviar correo"}
          {value === "parking" && "Parqueaderos"}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {value === "entry" && <RegisterEntry />}
        {value === "output" && <RegisterOutput />}
        {value === "send" && <SendReserva />}
        {value === "parking" && <Parkings parqueaderos={parqueaderos} />}
      </Box>
    </Box>
  );
};

export { HomeOperator };
