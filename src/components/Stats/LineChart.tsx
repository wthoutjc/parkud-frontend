import { Box, LinearProgress, Typography } from "@mui/material";

interface ILine {
  percentValue: number;
  value: number;
  name: string;
}

interface Props {
  data: ILine[];
}

const LineChart = ({ data }: Props) => {
  return (
    <Box
      sx={{
        height: 220,
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {data.map(({ percentValue, name, value }, index) => (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" fontWeight={800}>
              {name}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {value} M
            </Typography>
          </Box>
          <LinearProgress
            key={index}
            variant="determinate"
            value={percentValue}
          />
        </Box>
      ))}
    </Box>
  );
};

export { LineChart };
