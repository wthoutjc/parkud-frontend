import { Box } from "@mui/material";

// Components
import { Sidebar } from "../../../components";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Sidebar />
      {children}
    </Box>
  );
};

export { AuthLayout };
