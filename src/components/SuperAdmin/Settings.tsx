import { useState, useEffect } from "react";
import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";

// Services
import { getSettings } from "../../services";

// Interfaces
import { IConfiguracion } from "../../interfaces";

// Components
import { Setting, SettingsSkeleton } from ".";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<IConfiguracion[]>([]);

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSettings().then(({ configuraciones }) => {
      setLoading(false);
      setSettings(configuraciones);
    });
  }, []);

  if (loading) return <SettingsSkeleton />;

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
        Configuración
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ mb: 2 }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => setEdit(!edit)}>
            {edit ? <CancelIcon /> : <EditIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      {settings.map((setting, i) => (
        <Setting key={i} setting={setting} edit={edit} />
      ))}
    </Box>
  );
};

export { Settings };
