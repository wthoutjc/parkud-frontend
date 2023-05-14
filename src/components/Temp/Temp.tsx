import { Box, Avatar } from "@mui/material";
import { red } from "@mui/material/colors";

// Components
import { Stat, PieChart, LineChart, UserChart } from "../../components";
import { IUser } from "../../interfaces";

const lineData = [
  {
    value: 92,
    percentValue: 60,
    name: "Parqueadero 1",
  },
  {
    value: 140,
    percentValue: 40,
    name: "Parqueadero 2",
  },
  {
    value: 80,
    percentValue: 30,
    name: "Parqueadero 3",
  },
  {
    value: 170,
    percentValue: 70,
    name: "Parqueadero 4",
  },
];

const user: IUser = {
  email: "email@email.com",
  hierarchy: "A",
  id: 100122,
  lastname: "Apellido",
  name: "Nombre",
};

const Temp = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Stat title="Doughtnut Chart" description="This is a doughnut chart">
          <PieChart />
        </Stat>
        <Stat title="Line Chart" description="This is a line chart">
          <LineChart data={lineData} />
        </Stat>
        <Stat
          title={`${user.name} ${user.lastname}`}
          description={user.email}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
        >
          <UserChart value={100} value2={200} />
        </Stat>
      </Box>
    </>
  );
};

export { Temp };
