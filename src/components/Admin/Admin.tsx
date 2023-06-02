import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

// Components
import { AdminSkeleton, SedeAdmin, Table } from "../../components";

// Services
import { getSedeAdmin } from "../../services";

// Interfaces
import { ISedeAdminAPI } from "../../interfaces";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [sedeAdmin, setSedeAdmin] = useState<null | ISedeAdminAPI>(null);

  const [render, setRender] = useState(1);

  useEffect(() => {
    setLoading(true);
    getSedeAdmin().then(({ sede }) => {
      setLoading(false);
      setSedeAdmin(sede);
    });
  }, []);

  if (loading || !sedeAdmin) return <AdminSkeleton />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1" fontWeight={800}>
          Sede
        </Typography>
        <Tooltip title="Editar">
          <Link to="/update-sede">
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Link>
        </Tooltip>
      </Box>
      <SedeAdmin render={render} setRender={setRender} sedeAdmin={sedeAdmin} />
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Box>
        <Typography variant="body1" fontWeight={800} sx={{ mb: 1 }}>
          Operarios
        </Typography>
        <Link to="/new-operator">
          <Button
            variant="contained"
            color="success"
            sx={{ mb: 1 }}
            startIcon={<AddIcon />}
          >
            Registrar operario
          </Button>
        </Link>

        <Table
          loading={false}
          to="/operator"
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
