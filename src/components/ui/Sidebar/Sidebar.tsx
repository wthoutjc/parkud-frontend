import { styled } from "@mui/material/styles";

// StyledComponents
import { StyledSidebar } from "../../../components";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Sidebar = () => {
  return (
    <StyledSidebar open={true}>
      <DrawerHeader></DrawerHeader>
    </StyledSidebar>
  );
};

export { Sidebar };
