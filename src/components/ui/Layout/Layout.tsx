import { Box } from "@mui/material";

// Components
import { Navbar } from "../../../components";
import { Footer } from "../../../components";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1655px",
          }}
        >
          {children}
        </Box>
      </Box>
    </>

  );
};

export { Layout };
