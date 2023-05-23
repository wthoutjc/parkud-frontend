import { Box, Skeleton } from "@mui/material";

const MapsSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.paper",
      }}
    >
      <Skeleton variant="rounded" width={"100%"} height={750} />
    </Box>
  );
};

export { MapsSkeleton };
