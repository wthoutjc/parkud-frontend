import { ISidebarData } from "../../../interfaces/ui/sidebarData";

// Icons
import BlockIcon from "@mui/icons-material/Block";
import GroupIcon from "@mui/icons-material/Group";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SettingsIcon from "@mui/icons-material/Settings";

const SUPER_ADMIN_LIST: ISidebarData[] = [
  {
    message: "Usuarios bloqueados",
    icon: <BlockIcon />,
    link: "/blocked-users",
  },
  {
    message: "Trazabilidad de usuarios",
    icon: <GroupIcon />,
    link: "/user-traceability",
  },
  {
    message: "Reportes",
    icon: <QueryStatsIcon />,
    link: "/reports",
  },
  {
    message: "Configuración",
    icon: <SettingsIcon />,
    link: "/settings",
  },
];

export { SUPER_ADMIN_LIST };
