import { Box, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, ArcElement } from "chart.js";
ChartJS.register(ArcElement, Tooltip);

const DATA = {
  labels: ["Falta", "Alcanzado"],
  datasets: [
    {
      data: [100 - 80, 80],
      backgroundColor: ["#85c3dd", "#144e84"],
      hoverBackgroundColor: ["#85c3dd", "#144e84"],
      borderRadius: 3,
      zIndex: 1,
      borderColor: ["#85c3dd", "#009432"],
      hoverOffset: 3,
    },
  ],
};

const PieChart = () => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: 0,
          left: 0,
          bottom: 35,
          right: 0,
          margin: "auto",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          color="text.disabled"
          sx={{
            backgroundColor: "primary.dark",
            p: 3,
            pt: 3.7,
            pb: 3.7,
            borderRadius: 50,
          }}
        >
          80%
        </Typography>
      </Box>
      <Doughnut
        data={DATA}
        options={{
          cutout: 95,
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          p: 1,
          mt: 1,
          justifyContent: "space-around",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 2,
          }}
        >
          <Box
            sx={{
              width: "15px",
              height: "15px",
              backgroundColor: "primary.dark",
              borderRadius: "50%",
              mr: 1,
            }}
          />
          <Typography variant="body2" fontSize={12} color="text.secondary">
            Alcanzado
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "15px",
              height: "15px",
              backgroundColor: "secondary.main",
              borderRadius: "50%",
              mr: 1,
            }}
          />
          <Typography variant="body2" fontSize={12} color="text.secondary">
            Falta
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { PieChart };
