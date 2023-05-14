import { useState } from "react";
import { Box, Avatar } from "@mui/material";
// Components
import {
  Table,
  DoughnutChart,
  Stat,
  LineChart,
  UserChart,
} from "../../components";

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

const LINE_DATA = [
  {
    percentValue: 60,
    value: 120,
    name: "Parqueadero 1",
  },
  {
    percentValue: 30,
    value: 50,
    name: "Parqueadero 2",
  },
  {
    percentValue: 90,
    value: 190,
    name: "Parqueadero 3",
  },
];

const Client = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  return (
    <div>
      Soy Client
      <Box sx={{ mb: 2, display: "flex" }}>
        <Stat title="Doughnut Chart" description="This is a doughnut chart">
          <DoughnutChart />
        </Stat>
        <Stat title="Line Chart" description="This is a line chart">
          <LineChart data={LINE_DATA} />
        </Stat>
        <Stat
          title="Doughnut Chart"
          description="This is a doughnut chart"
          avatar={<Avatar>H</Avatar>}
        >
          <UserChart value={100} value2={200} />
        </Stat>
      </Box>
      <Table
        to="xd"
        setPage={setPage}
        setLimit={setLimit}
        page={page}
        limit={limit}
        totalData={1000}
        loading={false}
        title="Clientes"
        context={{
          delete: {
            enabled: false,
          },
          read: {
            enabled: true,
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
