import { useState } from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";

// Components
import { Maps, Table } from "../../components";

// Icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Client = () => {
  const [open, setOpen] = useState(true);

  return (
    <Box>
      {/* <Table
        to="xd"
        loading={false}
        page={1}
        setPage={() => {}}
        limit={20}
        setLimit={() => {}}
        totalData={1000}
        title="Parqueaderos"
        columns={["ID", "Nombre", "Costo"]}
        data={[
          { id: "1", name: "Parqueadero 1", cost: "1000" },
          { id: "2", name: "Parqueadero 2", cost: "2000" },
          { id: "3", name: "Parqueadero 3", cost: "3000" },
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
      /> */}
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
              <Box>
                <Box
                  sx={{
                    width: "100%",
                    p: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Tittle
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Paper elevation={10}>
            <Maps open={() => setOpen(true)} />
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
