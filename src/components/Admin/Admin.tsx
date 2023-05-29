import { Box, Divider, Typography } from "@mui/material";

// Components
import { Table } from "../../components";

const Admin = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="body1" fontWeight={800}>
        Sede
      </Typography>
      <Box sx={{ mb: 1 }}>
        <Typography variant="body2">Algunos datos aquí</Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box>
        <Typography variant="body1" fontWeight={800} sx={{ mb: 2 }}>
          Operarios
        </Typography>
        <Table
          loading={false}
          to="/temp-operator"
          title="Operarios"
          columns={["Cédula", "Nombre"]}
          data={[
            {
              cedula: "123456789",
              nombre: "Juan",
            },
          ]}
          context={{
            delete: {
              enabled: false,
            },
            update: {
              enabled: false,
            },
            read: {
              enabled: true,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export { Admin };
