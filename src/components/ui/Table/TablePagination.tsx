import {
  Box,
  FormControl,
  MenuItem,
  Pagination,
  Typography,
  Skeleton,
} from "@mui/material";

// Styled Components
import { StyledSelect } from "../../../components";

interface Props {
  page: number;
  limit: number;
  totalData: number;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  loading: boolean;
}

const TablePagination = ({
  page,
  limit,
  totalData,
  setPage,
  setLimit,
  loading,
}: Props) => {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "primary.dark",
        color: "primary.contrastText",
        borderTop: "0.5px solid #d6efed",
        display: "flex",
        position: "sticky",
        left: 0,
        p: 1,
      }}
    >
      {loading && totalData > 0 ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="circular"
            width={20}
            height={18}
            sx={{ bgcolor: "grey.300", mr: 1 }}
          />
          <Skeleton variant="text" width={"50%"} sx={{ bgcolor: "grey.300" }} />
          <Skeleton
            variant="text"
            width={"50%"}
            sx={{ bgcolor: "grey.300", ml: 2 }}
          />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              width: "60%",
              display: "flex",
              alignItems: "center",
              pl: 1,
            }}
          >
            <Typography
              variant="body2"
              color="primary.contrastText"
              sx={{
                mr: 2,
              }}
              fontSize={"0.85em"}
            >
              Página {page}
            </Typography>
            <FormControl
              variant="standard"
              size="small"
              sx={{
                fontSize: "14px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mr: 3,
              }}
            >
              <Typography
                variant="body2"
                color="primary.contrastText"
                sx={{
                  mr: 1,
                }}
                fontSize={"0.85em"}
              >
                Filas
              </Typography>
              <StyledSelect
                size={"small"}
                defaultValue={limit}
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value as string))}
              >
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </StyledSelect>
            </FormControl>
            <Typography
              variant="body2"
              color="primary.contrastText"
              sx={{
                mr: 1,
              }}
              fontSize={"0.85em"}
            >
              {(page - 1) * limit === 0 ? 1 : (page - 1) * limit} -{" "}
              {limit * page} de {totalData}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "40%",
              justifyContent: "flex-end",
              overflow: "auto",
            }}
          >
            <Pagination
              size="small"
              count={Math.ceil(totalData / limit)}
              showFirstButton
              showLastButton
              page={page}
              siblingCount={1}
              boundaryCount={2}
              onChange={handleChange}
              color="primary"
              sx={{
                backgroundColor: "background.paper",
                p: 0.6,
                borderRadius: 2,
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export { TablePagination };
