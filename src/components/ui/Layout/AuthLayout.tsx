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
      }}
    >
      <Sidebar />
      {children}
    </Box>
  );
};

export { AuthLayout };
