// Components
import { Table } from "../../components";

const Client = () => {
  return (
    <div>
      Soy Client
      <Table
        to="xd"
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
        data={[
          ["1", "Juan", "@gmail.com", "123456789", "Calle 1"],
          ["1", "Juan", "@gmail.com", "123456789", "Calle 1"],
          ["1", "Juan", "@gmail.com", "123456789", "Calle 1"],
          ["1", "Juan", "@gmail.com", "123456789", "Calle 1"],
          ["1", "Juan", "@gmail.com", "123456789", "Calle 1"],
        ]}
      />
    </div>
  );
};

export { Client };
