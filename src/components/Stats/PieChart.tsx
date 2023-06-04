import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Interfaces
import {
  IResponseStatisticCupos,
  IResponseStatisticGanancia,
  IResponseStatisticReserva,
} from "../../interfaces";

// Utils
import { randomColor } from "../../utils";

ChartJS.register(ArcElement, Tooltip, Legend);

type TypeStats =
  | IResponseStatisticCupos[]
  | IResponseStatisticReserva[]
  | IResponseStatisticGanancia[];

const data = (
  labels: string[],
  stats: TypeStats,
  type: "cupos" | "reservas" | "ganancias" | "Seleccionar"
) => ({
  labels,
  datasets: [
    {
      label: type,
      data: stats.map((stat) => {
        if (type === "cupos") {
          const { porcentaje } = stat as IResponseStatisticCupos;
          return Number(porcentaje);
        }
        if (type === "reservas") {
          const { cantidad } = stat as IResponseStatisticReserva;
          return Number(cantidad);
        }
        if (type === "ganancias") {
          const { ganancias } = stat as IResponseStatisticGanancia;
          return Number(ganancias);
        }
      }),
      backgroundColor: stats.map(() => randomColor(true)),
      borderWidth: 1,
    },
  ],
});

interface Props {
  stats: TypeStats;
  type: "cupos" | "reservas" | "ganancias" | "Seleccionar";
}

const PieChart = ({ stats, type }: Props) => {
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    if (stats.length > 0) {
      let labels: string[] = [];
      switch (type) {
        case "cupos":
          labels = stats.map((item) => {
            const { tipoParqueadero } = item as IResponseStatisticCupos;
            return tipoParqueadero;
          });
          setLabels(labels);
          break;
        case "reservas":
          labels = stats.map((item) => {
            const { mes } = item as IResponseStatisticReserva;
            return mes;
          });
          setLabels(labels);
          break;
        case "ganancias":
          labels = stats.map((item) => {
            const { mes } = item as IResponseStatisticGanancia;
            return mes;
          });
          setLabels(labels);
          break;
        default:
          break;
      }
    }
  }, [stats, type]);

  return <Pie data={data(labels, stats, type)} />;
};

export { PieChart };
