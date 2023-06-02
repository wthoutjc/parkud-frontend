import {
  Typography,
  Box,
  TableHead,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";

// Interfaces
import { ITableData } from "../../../interfaces";
import { StyledTableRow } from "..";

interface Props {
  quitIdTariff?: boolean;
  title: string;
  columns: string[];
  data: ITableData[];
  loading: boolean;
  dataEdit: ITableData[];
  setDataEdit: (data: ITableData[]) => void;
}

const TableTarifa = ({
  title,
  columns,
  data,
  dataEdit,
  setDataEdit,
  quitIdTariff,
}: Props) => {
  const allKeys = data.reduce((acc, item) => {
    return new Set([...acc, ...Object.keys(item)]);
  }, new Set<keyof ITableData>());
  const columnsData = Array.from(allKeys).map((key) => ({
    key,
    label: key,
  }));

  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          left: 0,
          zIndex: 1,
          backgroundColor: "primary.dark",
          color: "primary.contrastText",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            p: 2,
          }}
        >
          <Typography variant="body2" fontSize={14} fontWeight={600}>
            {title}
          </Typography>
        </Box>
      </Box>
      <Table>
        <TableHead
          sx={{
            backgroundColor: "primary.main",
          }}
        >
          <TableRow>
            {columns?.map((value, index) => {
              return (
                <TableCell
                  key={index}
                  sx={{ color: "primary.contrastText" }}
                  align="left"
                >
                  {value}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataEdit?.map((row, index) => {
            return (
              <StyledTableRow
                key={index}
                tabIndex={-1}
                className="table__no-selected"
              >
                {quitIdTariff
                  ? columnsData?.slice(0, 3).map(({ label }, _index) => (
                      <TableCell
                        key={index + _index}
                        style={{
                          padding: 0,
                        }}
                      >
                        {_index > 1 ? (
                          <input
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.028)",
                              border: "none",
                              padding: "1em",
                              width: "100%",
                            }}
                            type="number"
                            value={row[label]}
                            onChange={(e) => {
                              const newData = [...dataEdit];
                              newData[index][label] = e.target.value;
                              setDataEdit(newData);
                            }}
                          />
                        ) : (
                          <Typography
                            variant="body2"
                            fontSize={14}
                            fontWeight={600}
                            sx={{ p: 2 }}
                          >
                            {row[label]}
                          </Typography>
                        )}
                      </TableCell>
                    ))
                  : columnsData?.map(({ label }, _index) => (
                      <TableCell
                        key={index + _index}
                        style={{
                          padding: 0,
                        }}
                      >
                        {_index > 1 ? (
                          <input
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.028)",
                              border: "none",
                              padding: "1em",
                              width: "100%",
                            }}
                            type="number"
                            value={row[label]}
                            onChange={(e) => {
                              const newData = [...dataEdit];
                              newData[index][label] = e.target.value;
                              setDataEdit(newData);
                            }}
                          />
                        ) : (
                          <Typography
                            variant="body2"
                            fontSize={14}
                            fontWeight={600}
                            sx={{ p: 2 }}
                          >
                            {row[label]}
                          </Typography>
                        )}
                      </TableCell>
                    ))}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export { TableTarifa };
