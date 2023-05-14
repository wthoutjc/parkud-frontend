import {
  Card,
  CardContent,
  Box,
  IconButton,
  Typography,
  CardHeader,
} from "@mui/material";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
  avatar?: React.ReactNode;
}

const Stat = ({ title, description, children, avatar }: Props) => {
  return (
    <Card
      sx={{
        width: 275,
        height: "fit-content",
      }}
    >
      {avatar ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CardHeader
            sx={{
              p: 0,
              pl: 1,
            }}
            avatar={avatar}
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 0,
              pt: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="body1" fontWeight={800}>
                {title}
              </Typography>
              <Typography variant="body2">{description}</Typography>
            </Box>
            <Box sx={{ mr: 2 }}>
              <IconButton
                aria-label="settings"
                sx={{
                  display: "flex",
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Box>
      ) : (
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="body1" fontWeight={800}>
              {title}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </Box>
          <Box sx={{ mr: 0.2 }}>
            <IconButton
              aria-label="settings"
              sx={{
                display: "flex",
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </CardContent>
      )}

      <CardContent>{children}</CardContent>
    </Card>
  );
};

export { Stat };
