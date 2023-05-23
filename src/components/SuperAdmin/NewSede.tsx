// TODO: Tiempo Completo FLAG - HoraInicio - HoraFin
// TODO: Multi ComboBox - Características múltiples
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Tooltip,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Select,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
  ListItemText,
  FormHelperText,
} from "@mui/material";

// Interfaces
import { ICharacteristic, ISede } from "../../interfaces";

// React Hook Form
import { Controller, useForm } from "react-hook-form";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocalParkingIcon from "@mui/icons-material/LocalParking";

// React Router DOM
// import { Link, useNavigate } from "react-router-dom";

// Services
// import { getRegionales } from "../../services";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";

// Components
import { SelectLocation, TableTarifa } from "../../components";

const NewSede = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);

  const [location, setLocation] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);
  // const [regionales, setRegionales] = useState([]);
  // const [ciudades, setCiudades] = useState([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ISede>({
    defaultValues: {
      regional: "Seleccionar",
      city: "Seleccionar",
      fullTime: false,
    },
  });

  const registeredLocation = {
    lat: watch("lat"),
    lng: watch("lng"),
  };

  const handleNewSede = async (data: ISede) => {
    if (!registeredLocation.lat || !registeredLocation.lng) {
      const notification = {
        id: uuid(),
        title: "Error",
        message: "Selecciona una ubicación para la sede",
        type: "error" as "success" | "error",
        autoDismiss: 5000,
      };
      dispatch(newNotification(notification));
      return;
    }

    setLoading(true);
    console.log(data);
    setLoading(false);
  };

  const registerLocation = () => {
    if (location && location.lat && location.lng) {
      setValue("lat", location.lat);
      setValue("lng", location.lng);
      setRender(false);
      const notification = {
        id: uuid(),
        title: "Éxito",
        message: "Ubicación registrada correctamente",
        type: "success" as "success" | "error",
        autoDismiss: 5000,
      };
      dispatch(newNotification(notification));
    }
  };

  const cleanLocation = () => {
    if (location && location.lat && location.lng) {
      setValue("lat", 0);
      setValue("lng", 0);
      setLocation(undefined);
      const notification = {
        id: uuid(),
        title: "Éxito",
        message: "Ubicación eliminada correctamente",
        type: "success" as "success" | "error",
        autoDismiss: 5000,
      };
      dispatch(newNotification(notification));
    }
  };

  const handleSetLocation = (
    location: { lat: number; lng: number } | undefined
  ) => {
    setLocation(location);
  };

  useEffect(() => {
    // getRegionales().then((res) => {
    //   console.log(res);
    // });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="body1" sx={{ mb: 2 }} fontWeight={800}>
        Registrar: Nueva sede
      </Typography>
      <form onSubmit={handleSubmit(handleNewSede)}>
        <TextField
          disabled={loading}
          fullWidth
          type="text"
          placeholder="Ej 1234567890"
          autoComplete="parkud-id-administrador"
          label="Cédula Administrador*"
          sx={{ mb: 2 }}
          error={!!errors.idAdmin}
          helperText={
            errors.idAdmin
              ? errors.idAdmin.message
              : "Escribe la cédula del Administrador encargado..."
          }
          {...register("idAdmin", {
            required: `La cédula del Administrador encargado de ${
              watch("name") || "Sin nombre"
            } es obligatoria`,
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            fullWidth
            type="text"
            placeholder="Ej Sede Principal"
            autoComplete="parkud-name-sede"
            label="Nombre sede*"
            sx={{ mb: 1 }}
            error={!!errors.name}
            helperText={
              errors.name
                ? errors.name.message
                : "Escribe el nombre de la sede..."
            }
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
            value={watch("name")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />

          <Box
            sx={{
              display: "flex",
            }}
          >
            {registeredLocation.lat && registeredLocation.lng ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  backgroundColor: "secondary.light",
                  alignItems: "center",
                  p: 1,
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <Typography>
                  Latitud: <strong>{registeredLocation.lat}</strong>
                </Typography>
                <Typography>
                  Longitud: <strong>{registeredLocation.lng}</strong>
                </Typography>
                <Tooltip title="Borrar ubicación">
                  <IconButton color="error" onClick={cleanLocation}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Button
                variant="contained"
                onClick={() => setRender(true)}
                size="small"
                sx={{ mb: 1 }}
              >
                Seleccionar ubicación
              </Button>
            )}
          </Box>

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
              <MenuItem value={"pedidos"}>Pedidos</MenuItem>
              <MenuItem value={"bodegas"}>Bodegas</MenuItem>
            </TextField>

            <TextField
              fullWidth
              select
              disabled={loading}
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
                  value !== "Seleccionar" ||
                  `Selecciona una ciudad de ${watch("regional")}`,
              })}
              value={watch("city")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FmdGoodIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value={"Seleccionar"}>Seleccionar</MenuItem>
              <MenuItem value={"pedidos"}>Pedidos</MenuItem>
              <MenuItem value={"bodegas"}>Bodegas</MenuItem>
            </TextField>
          </Box>
        </Box>

        <Box sx={{ mb: watch("fullTime") ? 0 : 2 }}>
          <FormControlLabel
            sx={{ mb: 2 }}
            control={
              <Checkbox
                checked={watch("fullTime")}
                {...register("fullTime")}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={
              <Typography variant="body2" color="text.secondary" fontSize={14}>
                Tiempo completo
              </Typography>
            }
          />
          {!watch("fullTime") && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              className="animate__animated animate__fadeInDown"
            >
              <TextField
                fullWidth
                type="datetime-local"
                placeholder="Ej "
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
                  required: "La hora de inicio es obligatoria...",
                })}
                value={watch("startTime")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                type="datetime"
                placeholder="Ej Sede Principal"
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
                  required: "La hora de fin es obligatoria...",
                })}
                value={watch("endTime")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}
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
                startAdornment={
                  <InputAdornment position="start">
                    <LocalParkingIcon />
                  </InputAdornment>
                }
                {...field}
                defaultValue={[]}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value, index) => {
                      const { name } = JSON.parse(value) as ICharacteristic;
                      return <Chip key={index} label={name} color="primary" />;
                    })}
                  </Box>
                )}
                {...register("characteristics", {
                  required: "Este campo es obligatorio",
                })}
                error={!!errors.characteristics}
                input={<OutlinedInput label="Seleccione las características" />}
              >
                {[
                  {
                    id: 1,
                    name: "ok1",
                  },
                  {
                    id: 2,
                    name: "ok2",
                  },
                  {
                    id: 3,
                    name: "ok3",
                  },
                ].map((characteristic, index) => (
                  <MenuItem key={index} value={JSON.stringify(characteristic)}>
                    <Checkbox
                      checked={field.value.some((item) => {
                        const { id } = JSON.parse(item) as ICharacteristic;
                        return id === characteristic.id;
                      })}
                    />
                    <ListItemText primary={characteristic.name} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={!!errors.characteristics}>
                {errors.characteristics
                  ? errors.characteristics.message
                  : "Selecciona una o varias características..."}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Box sx={{ mb: 2 }}>
          <TableTarifa
            loading={loading}
            title="Digita las tarifas"
            columns={["Tipo", "Tarifa", "Cupos"]}
            data={[
              {
                Tipo: "Carro",
              },
            ]}
          />
        </Box>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="success"
          sx={{ mb: 2 }}
        >
          Registrar
        </Button>
      </form>
      {render && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 1,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            top: 0,
            left: 0,
            display: "flex",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "30%",
            }}
          />
          <Box
            sx={{
              position: "relative",
              width: "70%",
              display: "flex",
              flexDirection: "column",
            }}
            className="animate__animated animate__slideInRight"
          >
            <Button
              variant="contained"
              onClick={() => {
                setRender(false);
                handleSetLocation(undefined);
              }}
              color="error"
            >
              Cancelar
            </Button>
            <SelectLocation
              location={location}
              setLocation={handleSetLocation}
            />
            {location ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    backgroundColor: "primary.light",
                    p: 1,
                    justifyContent: "space-evenly",
                  }}
                >
                  <Typography variant="body1">
                    Latitud: <strong>{location.lat}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Longitud: <strong>{location.lng}</strong>
                  </Typography>
                </Box>
                {location.lat && location.lng && (
                  <Button variant="contained" onClick={registerLocation}>
                    Seleccionar ubicación
                  </Button>
                )}
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "primary.light",
                  p: 1,
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1" fontWeight={800}>
                  Selecciona una ubicación en el mapa
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export { NewSede };
