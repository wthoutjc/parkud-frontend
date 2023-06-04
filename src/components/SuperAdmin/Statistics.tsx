import { useMemo, useEffect, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// Components
import { BarChart, MapsSkeleton, PieChart } from "../../components";

// Services
import { findSedes, getRegionales, getStats } from "../../services";

// Interfaces
import {
  IRegional,
  IResponseStatisticCupos,
  IStatistics,
  IResponseStatisticReserva,
  IResponseStatisticGanancia,
  ILocation,
} from "../../interfaces";

// React Hook Form
import { useForm } from "react-hook-form";
// Icons
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { ScatterChar } from "../Stats/ScatterChar";

type TypeStats =
  | IResponseStatisticCupos[]
  | IResponseStatisticReserva[]
  | IResponseStatisticGanancia[];

const Statistics = () => {
  const [loading, setLoading] = useState(false);
  const [regionales, setRegionales] = useState<IRegional[]>([]);
  const [locations, setLocations] = useState<ILocation[]>([]);

  const [stats, setStats] = useState<TypeStats>([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  const center = useMemo(() => ({ lat: 4.7335073, lng: -74.034314 }), []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<IStatistics>({
    defaultValues: {
      regional: "",
      typeStat: "Seleccionar",
    },
  });

  const idSede = watch("idSede", "");

  const handleSearch = (data: IStatistics) => {
    setLoading(true);
    getStats(data).then(({ estadistica }) => {
      setLoading(false);
      setStats(estadistica);
    });
  };

  useEffect(() => {
    setLoading(true);
    getRegionales().then(({ regionales }) => {
      setRegionales(regionales);
      findSedes().then(({ sedes }) => {
        setLoading(false);
        setLocations(
          sedes.map(({ idSede, latitud, longitud }) => ({
            idSede,
            lat: latitud,
            lng: longitud,
          }))
        );
      });
    });
  }, []);

  useEffect(() => {
    if (idSede) {
      setLoading(true);
      getStats({
        idSede,
        regional: watch("regional"),
        typeStat: watch("typeStat"),
      }).then(({ estadistica, success, error, message }) => {
        console.log({ success, error, message });
        setLoading(false);
        setStats(estadistica);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idSede]);

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
        Consultar estadísticas
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <form
        onSubmit={handleSubmit(handleSearch)}
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          select
          disabled={loading}
          label="Regional*"
          error={!!errors.regional}
          sx={{ mb: 2, width: "47%" }}
          helperText={
            errors.regional
              ? errors.regional.message
              : "Selecciona la regional a la que pertenece la sede..."
          }
          {...register("regional", {
            validate: (value) =>
              value !== "Seleccionar" || "Selecciona una regional",
          })}
          value={watch("regional")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FmdGoodIcon />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value={""}>Seleccionar</MenuItem>
          {regionales.map(({ idUbicacion, descripcion }) => (
            <MenuItem key={idUbicacion} value={idUbicacion}>
              {descripcion}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          select
          disabled={loading}
          label="Tipo de estadística*"
          error={!!errors.typeStat}
          sx={{ mb: 2, width: "47%" }}
          helperText={
            errors.typeStat
              ? errors.typeStat.message
              : "Selecciona el tipo de estadística..."
          }
          {...register("typeStat", {
            required: "El tipo de estadística es obligatorio",
            validate: (value) =>
              value !== "Seleccionar" ||
              "El tipo de estadística es obligatorio",
          })}
          value={watch("typeStat")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AutoGraphIcon />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value={"Seleccionar"}>Seleccionar</MenuItem>
          <MenuItem value={"cupos"}>Cupos</MenuItem>
          <MenuItem value={"reservas"}>Reservas</MenuItem>
          <MenuItem value={"ganancias"}>Ganancias</MenuItem>
        </TextField>
        <Box
          sx={{
            backgroundColor: "primary.main",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <Tooltip title="Buscar">
            <IconButton
              type="submit"
              disabled={loading}
              sx={{
                color: "white",
              }}
            >
              <TravelExploreIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </form>
      {!isLoaded ? (
        <MapsSkeleton />
      ) : (
        <GoogleMap
          zoom={11}
          center={center}
          mapContainerClassName="parkud__map_small"
        >
          {locations.map(({ idSede, lat, lng }) => (
            <Marker
              key={idSede}
              onClick={() => {
                setValue("idSede", idSede);
              }}
              position={{ lat, lng }}
            />
          ))}
        </GoogleMap>
      )}
      {stats.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            p: 2,
          }}
          className="animate__animated animate__fadeIn"
        >
          <Box>
            <Typography variant="body1">Diagrama de torta</Typography>
            <PieChart stats={stats} type={watch("typeStat")} />
          </Box>
          <Box>
            <Typography variant="body1">Diagrama de barras</Typography>
            {stats.length > 0 && (
              <BarChart stats={stats} type={watch("typeStat")} />
            )}
          </Box>
          <Box>
            <Typography variant="body1">Diagrama de dispersión</Typography>
            <ScatterChar stats={stats} type={watch("typeStat")} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export { Statistics };
