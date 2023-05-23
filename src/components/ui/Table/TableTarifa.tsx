import { useState } from "react";
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
  title: string;
  columns: string[];
  data: ITableData[];
  loading: boolean;
}

const TableTarifa = ({ title, columns, data }: Props) => {
  const [dataEdit, setDataEdit] = useState(data);

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
            {columns?.map((column, index) => {
              return (
                <TableCell
                  key={index}
                  sx={{ color: "primary.contrastText" }}
                  align="left"
                >
                  {column}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => {
            return (
              <StyledTableRow
                key={index}
                tabIndex={-1}
                className="table__no-selected"
              >
                {columns?.map((column, _index) => (
                  <TableCell
                    key={index + _index}
                    style={{
                      padding: 0,
                    }}
                  >
                    {_index > 0 ? (
                      <input
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.028)",
                          border: "none",
                          padding: "1em",
                          width: "100%",
                        }}
                        value={row[column] || "No registra"}
                        onChange={(e) => {
                          const newData = [...dataEdit];
                          newData[index][_index] = e.target.value;
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
                        {row[column] || "No registra"}
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
