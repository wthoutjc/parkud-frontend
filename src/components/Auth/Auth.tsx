import { Box } from "@mui/material";

// Components
import { SignUp, LogIn } from "../../components";

interface Props {
  type: "signup" | "login";
}

const Auth = ({ type }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "70%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
          backgroundColor: "secondary.main",
          borderRadius: "1em",
        }}
      >
        {type === "signup" ? <SignUp /> : <LogIn />}
      </Box>
    </Box>
  );
};

export { Auth };
