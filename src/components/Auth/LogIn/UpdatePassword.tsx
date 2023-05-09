import { useState } from "react";
import { Box, InputAdornment, Typography } from "@mui/material";

// Interfaces
import { IUpdatePassword } from "../../../interfaces";

// Icons
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

// React Hook Form
import { useForm } from "react-hook-form";

// Styled Components & Components
import { StyledTextField, StyledButton } from "../../../components";

interface Props {
  updatePassword: (token: string) => Promise<void>;
}

const UpdatePassword = ({ updatePassword }: Props) => {
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUpdatePassword>();

  const handleUpdatePassword = async (data: IUpdatePassword) => {
    setLoading(true);
    await updatePassword(data.password);
    reset();
    setLoading(false);
  };

  return (
    <Box className={"login__container"}>
      <Box
        className={"login__left login__animation-toRight"}
        sx={{
          backgroundColor: "primary.dark",
          color: "secondary.contrastText",
        }}
      >
        <Typography variant="h4">Actualizar contraseña</Typography>
        <Box display={"flex"}>
          <Box sx={{ boxSizing: "border-box", padding: "1em", width: "100%" }}>
            <form onSubmit={handleSubmit(handleUpdatePassword)}>
              <StyledTextField
                disabled={loading}
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                label="Contraseña*"
                autoComplete="parkud-oldpassword"
                error={!!errors.password}
                helperText={
                  errors.password
                    ? errors.password.message
                    : "Escibe tu contraseña..."
                }
                sx={{ mb: 2 }}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                  endAdornment: !loading && (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <VisibilityOffIcon
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <VisibilityIcon
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                disabled={loading}
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Contraseña"
                label="Contraseña*"
                autoComplete="parkud-newpassword"
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword
                    ? errors.confirmPassword.message
                    : "Escibe tu contraseña..."
                }
                sx={{ mb: 2 }}
                {...register("confirmPassword", {
                  required: "La contraseña es obligatoria",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                  endAdornment: !loading && (
                    <InputAdornment position="end">
                      {showConfirmPassword ? (
                        <VisibilityOffIcon
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <VisibilityIcon
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          style={{ cursor: "pointer" }}
                        />
                      )}
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
                {loading ? "Actualizando..." : "Actualizar contraseña"}
              </StyledButton>
            </form>
          </Box>
        </Box>
      </Box>
      <Box
        className={"login__right login__animation-toLeft"}
        sx={{
          backgroundColor: "primary.light",
        }}
      >
        <Typography variant="h4" className="fade-animation">
          Primer inicio de sesión
        </Typography>
        <Typography variant="body1" className="fade-animation">
          Es tu primer inicio de sesión, por favor, actualiza tu contraseña.
        </Typography>
      </Box>
    </Box>
  );
};

export { UpdatePassword };
