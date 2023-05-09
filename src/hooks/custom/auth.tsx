import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../redux";
import { resetRequest, setRequest, newNotification } from "../../reducers";

// Services
import { logIn, twoFactor } from "../../services";

// Interfaces
import { ILogin, IUser } from "../../interfaces";

/**
 * @description Este hook administra el estado de la autenticación - administra el estado status
 * @returns { status, LogIn, LogOut, };
 */

interface AuthProps {
  error: boolean;
  message: string;
  twoFactor: boolean;
  user: IUser | null;
}

const useAuth = () => {
  const [status, setStatus] = useState<AuthProps>({
    error: false,
    message: "",
    twoFactor: false,
    user: null,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const LogIn = useCallback(async (loginData: ILogin) => {
    setStatus({ error: false, message: "", twoFactor: false, user: null });
    const { success, error, message, user } = await logIn(loginData);

    if (success && user) {
      const newUser: IUser = {
        id: user.idUsuario,
        name: user.nombre,
        lastname: user.apellido,
        email: user.correo,
        hierarchy: user.rol,
      };

      return setStatus({
        error: false,
        message:
          message ??
          "Se ha enviado un correo de verificación, por favor revisa tu bandeja de entrada ",
        twoFactor: true,
        user: newUser,
      });
    }

    setStatus({
      error: true,
      message: error ?? "Error al iniciar sesión",
      twoFactor: false,
      user: null,
    });
  }, []);

  const TwoFactor = useCallback(
    async (code: string, user: IUser) => {
      setStatus({ error: false, message: "", twoFactor: false, user });
      const { success, error, message, token } = await twoFactor(code, user.id);

      if (success && token) {
        localStorage.setItem("token-parkud", token);

        const notification = {
          id: uuid(),
          title: "Inicio de sesión exitoso",
          message: message ?? "Sesión iniciada correctamente",
          type: "success" as "success" | "error",
          autoDismiss: 5000,
        };
        dispatch(newNotification(notification));

        return setStatus({
          error: false,
          message: message ?? "Sesión iniciada correctamente",
          twoFactor: false,
          user,
        });
      }

      setStatus({
        error: true,
        message: error ?? "Error al iniciar sesión",
        twoFactor: true,
        user: null,
      });
    },
    [dispatch]
  );

  const LogOut = useCallback(async () => {
    dispatch(
      setRequest({
        loading: true,
        fullscreen: true,
        action: "Cerrando sesión",
      })
    );
    setStatus({ error: false, message: "", twoFactor: false, user: null });

    try {
      // const res = await logoutService();
      // if (!res.ok)
      //   setStatus({
      //     error: true,
      //     message: "Falló al cerrar sesión",
      //   });
    } catch (error) {
      console.error(error);
    }

    // await signOut({ redirect: false });
    dispatch(resetRequest());
    return navigate("/");
  }, [dispatch, navigate]);

  return {
    status,
    LogIn,
    LogOut,
    TwoFactor,
  };
};

export { useAuth };
