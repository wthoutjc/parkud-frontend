import {
  TableCell,
  Skeleton,
  Table,
  TableHead,
  TableRow,
  TableBody,
  CircularProgress,
} from "@mui/material";

const TableSkeleton = () => {
  return (
    <Table aria-label="simple table">
      <TableHead
        sx={{
          backgroundColor: "primary.dark",
        }}
      >
        <TableRow>
          <TableCell
            padding="checkbox"
            size={"medium"}
            color="secondary"
            sx={{
              p: 2,
            }}
          >
            <CircularProgress size={25} />
          </TableCell>
          <TableCell sx={{ color: "primary.contrastText" }} align="left">
            Cargando datos, espere por favor...
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell size={"small"} color="secondary">
            <CircularProgress size={25} color="warning" />
          </TableCell>
          <TableCell size={"small"} color="secondary">
            <Skeleton variant="rectangular" width={"100%"} height={40} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell size={"small"} color="secondary">
            <CircularProgress size={25} />
          </TableCell>
          <TableCell size={"small"} color="secondary">
            <Skeleton variant="rectangular" width={"100%"} height={40} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell size={"small"} color="secondary">
            <CircularProgress size={25} color="error" />
          </TableCell>
          <TableCell size={"small"} color="secondary">
            <Skeleton variant="rectangular" width={"100%"} height={40} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export { TableSkeleton };
