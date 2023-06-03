import { ISidebarData } from "../../../interfaces/ui/sidebarData";

// Icons
import BlockIcon from "@mui/icons-material/Block";
import GroupIcon from "@mui/icons-material/Group";
import QueryStatsIcon from '@mui/icons-material/QueryStats';

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
];

export { SUPER_ADMIN_LIST };
