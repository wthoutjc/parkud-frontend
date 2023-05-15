import { Box, Typography, Divider } from "@mui/material";

// Redux
import { useAppSelector } from "../../../hooks";

// Date
import moment from "moment";

// Images
import logo from "../../../styles/img/logo.png";

interface Props {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const { name, lastname } = user;

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: 1,
        }}
      >
        <Typography variant="h6" fontWeight={800}>
          Bienvenid@, {name} {lastname}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" fontWeight={400}>
            <i>{moment().format("DD/MM/YYYY")}</i>
          </Typography>
          <Box
            sx={{
              width: "40px",
              ml: 2,
            }}
          >
            <img
              src={logo}
              alt="logo"
              width="100px"
              style={{
                width: "100%",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          borderColor: "secondary.light",
          mb: 1,
        }}
      />
      {children}
    </Box>
  );
};

export { HomeLayout };
