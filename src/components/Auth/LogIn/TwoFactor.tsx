import { useState } from "react";
import { Box, InputAdornment, Typography } from "@mui/material";

// React Hook Form
import { useForm } from "react-hook-form";

// Styled Components && Components
import { StyledTextField, StyledButton } from "../../../components";

// Icons
import KeyIcon from "@mui/icons-material/Key";

// Interfaces
import { IUser } from "../../../interfaces";

// Images
import logo from "../../../styles/img/logo.png";

interface ITwoFactor {
  token: string;
}

interface Props {
  user: IUser;
  TwoFactor: (
    code: string,
    user: IUser
  ) => Promise<
    | {
        payload: undefined;
        type: "[AUTH]/login";
      }
    | undefined
  >;
}

const TwoFactor = ({ user, TwoFactor: twoFactor }: Props) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITwoFactor>();

  const handleTwoFactor = async ({ token }: ITwoFactor) => {
    setLoading(true);
    await twoFactor(token, user);
    setLoading(false);
  };

  return (
    <Box className={"signup__container"}>
      <Box
        className={"signup__right signup__animation-toLeft"}
        sx={{
          backgroundColor: "primary.dark",
          color: "secondary.contrastText",
        }}
      >
        <Typography variant="h4">Doble factor</Typography>
        <Box display={"flex"}>
          <Box sx={{ boxSizing: "border-box", padding: "1em", width: "100%" }}>
            <form onSubmit={handleSubmit(handleTwoFactor)}>
              <StyledTextField
                fullWidth
                disabled={loading}
                color="secondary"
                sx={{ marginBottom: "1em", color: "white" }}
                placeholder="Código de verificación"
                label="Código de verificación*"
                error={!!errors.token}
                helperText={
                  errors.token
                    ? errors.token.message
                    : "Escribe tu código de verificación..."
                }
                {...register("token", {
                  required: "El código de verificación es requerido",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                {loading ? "Verificando..." : "Verificar"}
              </StyledButton>
            </form>
          </Box>
        </Box>
      </Box>
      <Box
        className={"signup__left signup__animation-toRight"}
        sx={{
          backgroundColor: "primary.light",
        }}
      >
        <Box
          sx={{
            width: "100px",
            mr: 3,
          }}
        >
          <img
            src={logo}
            alt="Parkud"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Typography variant="h4" className="fade-animation">
          ¡Ya casi estás dentro!
        </Typography>
        <Typography variant="body1" className="fade-animation">
          Ingresa el código de verificación que te enviamos a tu correo
        </Typography>
      </Box>
    </Box>
  );
};

export { TwoFactor };
