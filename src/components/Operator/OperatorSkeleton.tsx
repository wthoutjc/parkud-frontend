import { Box, Skeleton } from "@mui/material";

const OperatorSkeleton = () => {
  return (
    <Box
      sx={{
        p: 2,
        width: "100%",
      }}
    >
      <Skeleton variant="rounded" width={"100%"} height={60} />
      <form>
        <Skeleton variant="rounded" width={"100%"} height={60} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Skeleton variant="rounded" width={"100%"} height={60} />
          <Skeleton variant="rounded" width={"100%"} height={60} />
        </Box>
        <Skeleton variant="rounded" width={"100%"} height={60} />
        <Skeleton variant="rounded" width={"100%"} height={60} />
        <Skeleton variant="rounded" width={"100%"} height={60} />
      </form>
    </Box>
  );
};

export { OperatorSkeleton };
