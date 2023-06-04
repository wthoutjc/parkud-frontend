import { useState } from "react";
import {
  Checkbox,
  TableCell,
  TableContainer,
  Table as MuiTable,
  Paper,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";

// React Router DOM
import { useNavigate } from "react-router-dom";

// Components
import {
  TablePagination,
  TableToolbar,
  TableSkeleton,
  StyledCheckbox,
  StyledTableRow,
} from "../../../components";

// Interfaces
import { IContextTable, ITableData } from "../../../interfaces";

interface Props {
  title: string;
  columns: string[];
  data: ITableData[];
  context: IContextTable;
  loading: boolean;
  limit?: number;
  setLimit?: (limit: number) => void;
  page?: number;
  setPage?: (page: number) => void;
  totalData?: number;
  to: string;
}

export function Table({
  title,
  columns,
  data,
  context,
  to,
  page,
  limit,
  setPage,
  setLimit,
  totalData,
  loading,
}: Props) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([] as string[]);

  const allKeys = data.reduce((acc, item) => {
    return new Set([...acc, ...Object.keys(item)]);
  }, new Set<string>());

  const itemsData = Array.from(allKeys).map((key) => ({ key, label: key }));

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data?.map((row) => row[itemsData[0].key]);
      setSelected(newSelecteds.map((item) => String(item)));
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <TableContainer component={Paper}>
      {selected && (
        <TableToolbar
          title={title}
          to={to}
          numSelected={selected?.length}
          selected={selected[0]}
          context={context}
        />
      )}
      {!!page && !!setPage && !!limit && !!setLimit && !!totalData && (
        <TablePagination
          loading={loading}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalData={totalData}
        />
      )}
      {loading ? (
        <TableSkeleton />
      ) : (
        <MuiTable aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: "primary.main",
            }}
          >
            <TableRow>
              {(context.update.enabled ||
                context.delete.enabled ||
                context.read.enabled) && (
                <TableCell padding="checkbox" size={"medium"} color="secondary">
                  <StyledCheckbox
                    size={"medium"}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              {columns.map((column, index) => (
                <TableCell
                  key={`th-${index}-${column}`}
                  sx={{ color: "primary.contrastText" }}
                  align="left"
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => {
              const isItemSelected = isSelected(String(row[itemsData[0].key]));

              return (
                <StyledTableRow
                  key={index}
                  onClick={(event) =>
                    (context.update.enabled ||
                      context.delete.enabled ||
                      context.read.enabled) &&
                    handleClick(event, String(row[itemsData[0].key]))
                  }
                  onDoubleClick={() =>
                    context.read.enabled &&
                    to &&
                    navigate(`${to}/${String(row[itemsData[0].key])}`)
                  }
                  tabIndex={-1}
                  className={isItemSelected ? "MUITableSelected" : ""}
                >
                  {(context.update.enabled ||
                    context.delete.enabled ||
                    context.read.enabled) && (
                    <TableCell
                      padding="checkbox"
                      sx={{
                        borderBottom: "1px solid #e0e0e0",
                      }}
                      size={"medium"}
                    >
                      <Checkbox
                        color="primary"
                        size={"medium"}
                        checked={isItemSelected}
                      />
                    </TableCell>
                  )}
                  {itemsData.map(({ label }, index) => (
                    <TableCell key={`td-${index}-${label}`} align="left">
                      {row[label] || "No registra"}
                    </TableCell>
                  ))}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      )}
      {!!page && !!setPage && !!limit && !!setLimit && !!totalData && (
        <TablePagination
          loading={loading}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalData={totalData}
        />
      )}
    </TableContainer>
  );
}
