import {
  Box,
  CircularProgress,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";

const SettingsSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        width: "100%",
      }}
    >
      <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
        Configuración
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          display: "flex",
          mb: 2,
        }}
      >
        <CircularProgress size={25} sx={{ mr: 2 }} />
        <Typography variant="body2">
          <i>Cargando configuración...</i>
        </Typography>
      </Box>
      <Skeleton variant="rectangular" width="100%" height={118} />
    </Box>
  );
};

export { SettingsSkeleton };
