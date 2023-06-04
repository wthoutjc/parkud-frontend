import { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

// Components
import { GenerateReports, Statistics } from "../../components";

// Icons
import InsightsIcon from "@mui/icons-material/Insights";
import Inventory2Icon from "@mui/icons-material/Inventory2";

type Value = "export" | "stats";

const Reports = () => {
  const [value, setValue] = useState<Value>("export");

  const handleChange = (_: React.SyntheticEvent, newValue: Value) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <BottomNavigation
        sx={{ width: "100%", backgroundColor: "background.paper" }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Exportación"
          value="export"
          icon={<Inventory2Icon />}
        />
        <BottomNavigationAction
          label="Estadísticas"
          value="stats"
          icon={<InsightsIcon />}
        />
      </BottomNavigation>
      {value === "export" && <GenerateReports />}
      {value === "stats" && <Statistics />}
    </Box>
  );
};

export { Reports };
