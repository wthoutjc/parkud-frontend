import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartData,
} from "chart.js";
import { useEffect, useState } from "react";
import {
  IResponseStatisticCupos,
  IResponseStatisticGanancia,
  IResponseStatisticReserva,
} from "../../interfaces";

// Utils
import { randomColor } from "../../utils";

ChartJS.register(CategoryScale, LinearScale, BarElement);

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
  datasets: stats.map((stat) => {
    if (type === "cupos") {
      const { porcentaje, tipoParqueadero } = stat as IResponseStatisticCupos;
      return {
        label: tipoParqueadero,
        data: [
          {
            x: tipoParqueadero,
            y: Number(porcentaje),
          },
        ],
        backgroundColor: randomColor(),
      };
    }
    if (type === "reservas") {
      const { cantidad, mes } = stat as IResponseStatisticReserva;
      return {
        label: mes,
        data: [
          {
            x: mes,
            y: Number(cantidad),
          },
        ],
        backgroundColor: randomColor(),
      };
    }
    if (type === "ganancias") {
      const { ganancias, mes } = stat as IResponseStatisticGanancia;
      return {
        label: mes,
        data: [
          {
            x: mes,
            y: Number(ganancias),
          },
        ],
        backgroundColor: randomColor(),
      };
    }
  }),
});

interface Props {
  stats: TypeStats;
  type: "cupos" | "reservas" | "ganancias" | "Seleccionar";
}

const BarChart = ({ stats, type }: Props) => {
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

  return (
    <Bar
      options={{
        responsive: true,
      }}
      data={
        data(labels, stats, type) as ChartData<
          "bar",
          { x: string; y: number }[],
          string
        >
      }
    />
  );
};

export { BarChart };
