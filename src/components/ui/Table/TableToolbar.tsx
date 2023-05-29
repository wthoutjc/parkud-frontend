import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Interfaces
import { IContextTable } from "../../../interfaces";

// Icons
import InfoIcon from "@mui/icons-material/Info";

interface Props {
  title: string;
  numSelected: number;
  selected: string;
  to: string;
  context: IContextTable;
}

const TableToolbar = ({ title, numSelected, to, selected, context }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: "primary.dark",
        color: "primary.contrastText",
      }}
    >
      {numSelected > 0 ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: numSelected === 1 ? 1.13 : 1.31,
          }}
        >
          <Box
            sx={{
              backgroundColor: "background.paper",
              color: "text.primary",
              p: 0.7,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" fontSize={14} fontWeight={600}>
              {numSelected === 1
                ? "1 seleccionado"
                : `${numSelected} seleccionados`}
            </Typography>
          </Box>
          {numSelected === 1 && (
            <Box
              sx={{
                display: "flex",
              }}
            >
              {context.read.enabled && (
                <Tooltip title="Ver">
                  <IconButton
                    size="small"
                    onClick={() => navigate(`${to}/${selected}`)}
                  >
                    <InfoIcon fontSize={"medium"} color="secondary" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            p: 2,
          }}
        >
          <Typography variant="body2" fontSize={14} fontWeight={600}>
            {title}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export { TableToolbar };
