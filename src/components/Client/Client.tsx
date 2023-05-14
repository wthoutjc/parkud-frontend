// Components
import { Box } from "@mui/material";
import { Table, DoughnutChart, Stat } from "../../components";

const data = [
  {
    id: "1",
    name: "Juan",
    email: "@gmail.com",
    phone: "123456789",
    address: "Calle 1",
  },
  {
    id: "2",
    name: "Juan 2",
    email: "@gmail.com",
    phone: "123456789",
    address: "Calle 2",
  },
  {
    id: "3",
    name: "Juan 3",
    email: "@gmail.com",
    phone: "123456789",
    address: "Calle 3",
  },
  {
    id: "4",
    name: "Juan 4",
    email: "@gmail.com",
    phone: "123456789",
    address: "Calle 4",
  },
];

const Client = () => {
  return (
    <div>
      Soy Admin
      <Box sx={{ mb: 2, display: "flex" }}>
        <Stat title="Doughnut Chart" description="This is a doughnut chart">
          <DoughnutChart />
        </Stat>
        <Stat title="Doughnut Chart" description="This is a doughnut chart">
          <DoughnutChart />
        </Stat>
        <Stat title="Doughnut Chart" description="This is a doughnut chart">
          <DoughnutChart />
        </Stat>
      </Box>
      <Table
        to="xd"
        loading={false}
        title="Clientes"
        context={{
          delete: {
            enabled: false,
          },
          read: {
            enabled: false,
          },
          update: {
            enabled: false,
          },
        }}
        columns={["id", "name", "email", "phone", "address"]}
        data={data}
      />
    </div>
  );
};

export { Client };
