import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";

// React Hook Form
import { Controller, useForm } from "react-hook-form";

// Services
import { findSedes, getRegional, getRegionales } from "../../services";

// Icons
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import SearchIcon from "@mui/icons-material/Search";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import FactCheckIcon from "@mui/icons-material/FactCheck";

// Interfaces
import {
  ICaracteristica,
  ICharacteristic,
  ICiudades,
  IFindSede,
  IRegional,
  IResponseSedeClient,
  ITiposParqueaderos,
} from "../../interfaces";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";
import { ReservarSede, SkeletonFindParking } from ".";

interface Props {
  setSedes: React.Dispatch<React.SetStateAction<IResponseSedeClient[]>>;
  sede: IResponseSedeClient | null;
}

const FindParking = ({ setSedes, sede }: Props) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [loadingFind, setLoadingFind] = useState(false);
  const [loadingRegionales, setLoadingRegionales] = useState(false);

  const [regionales, setRegionales] = useState<IRegional[]>([]);
  const [ciudades, setCiudades] = useState<ICiudades[]>([]);
  const [caracteristicas, setCaracteristicas] = useState<ICaracteristica[]>([]);
  const [tiposParqueaderos, setTiposParqueaderos] = useState<
    ITiposParqueaderos[]
  >([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
    control,
  } = useForm<IFindSede>({
    defaultValues: {
      regional: "Seleccionar",
      city: "Seleccionar",
      loyalty: false,
      startTime: "00:00",
      endTime: "00:00",
    },
  });

  const idRegional = watch("regional");

  const handleFindParking = (data: IFindSede) => {
    setLoadingFind(true);
    findSedes(data).then(({ sedes }) => {
      console.log(sedes);
      setLoadingFind(false);
      if (sedes.length === 0) {
        const notification = {
          id: uuid(),
          title: "Error",
          message: "No se encontraron sedes con los criterios de búsqueda",
          type: "error" as "success" | "error",
          autoDismiss: 5000,
        };
        dispatch(newNotification(notification));
        reset();
        return;
      }
      setSedes(sedes);
    });
  };

  useEffect(() => {
    setLoading(true);
    getRegionales().then(({ regionales }) => {
      setLoading(false);
      setRegionales(regionales);
    });
  }, []);

  useEffect(() => {
    if (idRegional !== "Seleccionar") {
      setValue("city", "Seleccionar");
      setValue("characteristics", []);
      setValue("typesParking", []);
      setValue("loyalty", false);
      setValue("startTime", "00:00");
      setValue("endTime", "00:00");

      setLoadingRegionales(true);
      getRegional(String(idRegional)).then(
        ({ caracteristicas, ciudades, tiposParqueaderos }) => {
          setCaracteristicas(caracteristicas);
          setCiudades(ciudades);
          setLoadingRegionales(false);
          setTiposParqueaderos(tiposParqueaderos);
        }
      );
    }
  }, [idRegional, setValue]);

  if (sede) return <ReservarSede sede={sede} />;
  if (loadingFind) return <SkeletonFindParking />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        p: 2,
      }}
    >
      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
        Encuentra una sede PAR-KUD
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <form onSubmit={handleSubmit(handleFindParking)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            fullWidth
            select
            disabled={loading}
            label="Regional*"
            error={!!errors.regional}
            sx={{ mb: 2, width: "49%" }}
            helperText={
              errors.regional
                ? errors.regional.message
                : "Selecciona la regional a la que pertenece la sede..."
            }
            {...register("regional", {
              required: "La regional es obligatoria",
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
            <MenuItem value={"Seleccionar"}>Seleccionar</MenuItem>
            {regionales.map(({ idUbicacion, descripcion }) => (
              <MenuItem key={idUbicacion} value={idUbicacion}>
                {descripcion}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            disabled={loadingRegionales}
            label="Ciudad*"
            error={!!errors.city}
            sx={{ mb: 2, width: "50%" }}
            helperText={
              errors.city
                ? errors.city.message
                : `Selecciona la ciudad de ${
                    watch("regional") === "Seleccionar"
                      ? "la regional"
                      : watch("regional")
                  }`
            }
            {...register("city", {
              required: "La regional es obligatoria",
              validate: (value) =>
                value !== "Seleccionar" || `Selecciona una ciudad`,
            })}
            value={watch("city")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {loadingRegionales ? (
                    <CircularProgress size={25} />
                  ) : (
                    <FmdGoodIcon />
                  )}
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value={"Seleccionar"}>Seleccionar</MenuItem>
            {ciudades.map(({ idUbicacion, descripcion }) => (
              <MenuItem key={idUbicacion} value={idUbicacion}>
                {descripcion}{" "}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {idRegional !== "Seleccionar" ? (
          <>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Características opcionales*
            </Typography>
            <Box>
              <FormControlLabel
                sx={{ mb: 2 }}
                control={
                  <Checkbox
                    checked={watch("loyalty")}
                    {...register("loyalty")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={14}
                  >
                    Ofrece programa de fidelización
                  </Typography>
                }
              />
            </Box>
            <Controller
              control={control}
              name="characteristics"
              defaultValue={[]}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                >
                  <InputLabel
                    id="characteristic-select"
                    error={!!errors.characteristics}
                  >
                    Características de la sede*
                  </InputLabel>
                  <Select
                    labelId="characteristic-select"
                    multiple
                    disabled={loadingRegionales}
                    startAdornment={
                      <InputAdornment position="start">
                        {loadingRegionales ? (
                          <CircularProgress size={25} />
                        ) : (
                          <FactCheckIcon />
                        )}
                      </InputAdornment>
                    }
                    {...field}
                    defaultValue={[]}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value, index) => {
                          const { nombre } = JSON.parse(
                            value
                          ) as ICharacteristic;
                          return (
                            <Chip key={index} label={nombre} color="primary" />
                          );
                        })}
                      </Box>
                    )}
                    {...register("characteristics")}
                    error={!!errors.characteristics}
                    input={
                      <OutlinedInput label="Seleccione las características" />
                    }
                  >
                    {caracteristicas.map(
                      ({ idCaracteristica, nombre }, index) => (
                        <MenuItem
                          key={index}
                          value={JSON.stringify({ idCaracteristica, nombre })}
                        >
                          <Checkbox
                            checked={field.value.some((item) => {
                              const { idCaracteristica: id } = JSON.parse(
                                item
                              ) as ICharacteristic;
                              return id === idCaracteristica;
                            })}
                          />
                          <ListItemText primary={nombre} />
                        </MenuItem>
                      )
                    )}
                  </Select>
                  <FormHelperText error={!!errors.characteristics}>
                    {errors.characteristics
                      ? errors.characteristics.message
                      : "Selecciona una o varias características..."}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="typesParking"
              defaultValue={[]}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                >
                  <InputLabel
                    id="characteristic-select"
                    error={!!errors.typesParking}
                  >
                    Tipos de parqueadero*
                  </InputLabel>
                  <Select
                    labelId="typesParking-select"
                    multiple
                    disabled={loadingRegionales}
                    startAdornment={
                      <InputAdornment position="start">
                        {loadingRegionales ? (
                          <CircularProgress size={25} />
                        ) : (
                          <LocalParkingIcon />
                        )}
                      </InputAdornment>
                    }
                    {...field}
                    defaultValue={[]}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value, index) => {
                          const { nombre } = JSON.parse(
                            value
                          ) as ITiposParqueaderos;
                          return (
                            <Chip key={index} label={nombre} color="primary" />
                          );
                        })}
                      </Box>
                    )}
                    {...register("typesParking")}
                    error={!!errors.typesParking}
                    input={
                      <OutlinedInput label="Seleccione los tipos de parqueadero" />
                    }
                  >
                    {tiposParqueaderos.map(
                      ({ idTipo_Parqueadero, nombre }, index) => (
                        <MenuItem
                          key={index}
                          value={JSON.stringify({ idTipo_Parqueadero, nombre })}
                        >
                          <Checkbox
                            checked={field.value.some((item) => {
                              const { idTipo_Parqueadero: id } = JSON.parse(
                                item
                              ) as ITiposParqueaderos;
                              return id === idTipo_Parqueadero;
                            })}
                          />
                          <ListItemText primary={nombre} />
                        </MenuItem>
                      )
                    )}
                  </Select>
                  <FormHelperText error={!!errors.characteristics}>
                    {errors.characteristics
                      ? errors.characteristics.message
                      : "Selecciona una o varios tipos de parqueaderos..."}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              className="animate__animated animate__fadeInDown"
            >
              <TextField
                fullWidth
                type="text"
                placeholder="Ej 06:00"
                autoComplete="parkud-start-time"
                label="Hora Inicio*"
                sx={{ mb: 1, width: "49%" }}
                error={!!errors.startTime}
                helperText={
                  errors.startTime
                    ? errors.startTime.message
                    : "Escribe la hora de inicio..."
                }
                {...register("startTime", {
                  validate: (value) =>
                    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) ||
                    "Formato de hora incorrecto",
                })}
                value={watch("startTime")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HourglassTopIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                type="text"
                placeholder="Ej 23:00"
                autoComplete="parkud-end-time"
                label="Hora Fin*"
                sx={{ mb: 1, width: "50%" }}
                error={!!errors.endTime}
                helperText={
                  errors.endTime
                    ? errors.endTime.message
                    : "Escribe la hora de fin..."
                }
                {...register("endTime", {
                  validate: (value) =>
                    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) ||
                    "Formato de hora incorrecto",
                })}
                value={watch("endTime")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HourglassBottomIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </>
        ) : (
          <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {loadingRegionales
                ? "Cargando características opcionales..."
                : "Selecciona una de nuestras regionales para poder cargar características opcionales que te permitirán optimizar tu búsqueda."}
            </Typography>
          </Box>
        )}
        <Button
          disabled={loadingRegionales || loading}
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          startIcon={<SearchIcon />}
        >
          Buscar mi sede
        </Button>
      </form>
    </Box>
  );
};

export { FindParking };
