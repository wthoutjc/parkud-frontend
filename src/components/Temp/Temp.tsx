// Components
import { Table } from "../../components";

// Interfaces
import { ITableData } from "../../interfaces";

const DATA: ITableData[] = [
  {
    Cédula: "1",
    Nombre: "John Doe",
    Correo: "johndoe@emai.com",
  },
  {
    Cédula: "2",
    Nombre: "Jane Doe 2",
    Correo: "johndoe2@emai.com",
  },
  {
    Cédula: "3",
    Nombre: "John Doe 3",
    Correo: "",
  },
];

const Temp = () => {
  return (
    <Table
      title="Clientes"
      columns={["Cédula", "Nombre", "Correo"]}
      data={DATA}
      loading={false}
      page={1}
      limit={20}
      totalData={1000}
      setLimit={() => 1}
      setPage={() => 2}
      context={{
        read: {
          enabled: true,
        },
        update: {
          enabled: false,
        },
        delete: {
          enabled: false,
        },
      }}
    />
  );
};

export { Temp };
