import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";

// Components
import { Table } from "../../components";

// Services
import { getSedes } from "../../services";
import { Link } from "react-router-dom";

// Icons
import AddIcon from "@mui/icons-material/Add";

const SuperAdmin = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [sedes, setSedes] = useState<{ idSede: string; nombre: string }[]>([]);
  const [totalSedes, setTotalSedes] = useState(0);

  useEffect(() => {
    const offset = (page - 1) * limit;
    getSedes(limit, offset).then(({ sedes, cuenta }) => {
      setSedes(
        sedes.map((sede) => ({
          ...sede,
          idSede: String(sede.idSede),
        }))
      );
      setTotalSedes(cuenta);
    });
  }, [limit, page]);

  return (
    <Box>
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        sx={{ mb: 2, mr: 2 }}
      >
        <Link
          to="/new-sede"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          Nueva sede
        </Link>
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
      >
        <Link
          to="/new-administrador"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          Registrar administrador
        </Link>
      </Button>
      <Table
        to="/sede"
        loading={false}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalData={totalSedes}
        title="Sedes en Par-KUD"
        columns={["#", "Sede"]}
        data={sedes}
        context={{
          delete: {
            enabled: false,
          },
          update: {
            enabled: false,
          },
          read: {
            enabled: false,
          },
        }}
      />
    </Box>
  );
};

export { SuperAdmin };
