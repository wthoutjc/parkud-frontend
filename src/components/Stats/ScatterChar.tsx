import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import {
  IResponseStatisticCupos,
  IResponseStatisticGanancia,
  IResponseStatisticReserva,
} from "../../interfaces";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

type TypeStats =
  | IResponseStatisticCupos[]
  | IResponseStatisticReserva[]
  | IResponseStatisticGanancia[];

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const data = (
  stats: TypeStats,
  type: "cupos" | "reservas" | "ganancias" | "Seleccionar"
) => ({
  datasets: [
    {
      label: type,
      data: stats.map((stat) => {
        const x = [];
        if (type === "cupos") {
          const { porcentaje } = stat as IResponseStatisticCupos;
          x.push(Number(porcentaje));
        }
        if (type === "reservas") {
          const { cantidad } = stat as IResponseStatisticReserva;
          x.push(Number(cantidad));
        }
        if (type === "ganancias") {
          const { ganancias } = stat as IResponseStatisticGanancia;
          x.push(Number(ganancias));
        }
        return {
          x,
          y: Math.random() * 100,
        };
      }),
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ],
});

interface Props {
  stats: TypeStats;
  type: "cupos" | "reservas" | "ganancias" | "Seleccionar";
}

const ScatterChar = ({ stats, type }: Props) => {
  return <Scatter options={options} data={data(stats, type)} />;
};

export { ScatterChar };
