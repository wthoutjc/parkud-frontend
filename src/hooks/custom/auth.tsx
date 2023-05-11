import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

// uuid
import { v4 as uuid } from "uuid";

// Redux
import { useAppDispatch } from "../redux";
import {
  resetRequest,
  setRequest,
  newNotification,
  login,
  logout,
  setUser,
} from "../../reducers";

// Services
import { logIn, twoFactor, updatePassword, getUser } from "../../services";

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
  updatePassword: 1 | 0;
}

const useAuth = () => {
  const [status, setStatus] = useState<AuthProps>({
    error: false,
    message: "",
    twoFactor: false,
    user: null,
    updatePassword: 0,
  });

  const resetStatus = () => {
    setStatus({
      error: false,
      message: "",
      twoFactor: false,
      user: null,
      updatePassword: 0,
    });
  };

  const setError = (message: string) => {
    setStatus({
      twoFactor: false,
      user: null,
      updatePassword: 0,
      error: true,
      message,
    });
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const LogIn = useCallback(async (loginData: ILogin) => {
    resetStatus();
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
        updatePassword: 0,
      });
    }

    setError(error ?? "Error al iniciar sesión");
  }, []);

  const TwoFactor = useCallback(
    async (code: string, user: IUser) => {
      resetStatus();
      const { success, error, message, token, cambiarContrasena } =
        await twoFactor(code, user.id);

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
        dispatch(setUser(user));
        setStatus({
          error: false,
          message: message ?? "Sesión iniciada correctamente",
          twoFactor: false,
          user,
          updatePassword: cambiarContrasena,
        });

        return dispatch(login());
      }

      setError(error ?? "Error al iniciar sesión");
    },
    [dispatch]
  );

  const UpdatePassword = useCallback(
    async (password: string) => {
      const { success, error, message } = await updatePassword(password);
      const notification = {
        id: uuid(),
        title: success ? "Registro exitoso" : "Error al registrarse",
        message: success
          ? message ?? "Usuario registrado correctamente"
          : error ?? "Error al registrarse",
        type: success ? "success" : ("error" as "success" | "error"),
        autoDismiss: 5000,
      };
      dispatch(newNotification(notification));

      if (success) {
        setStatus({
          ...status,
          updatePassword: 0,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  const GetUser = useCallback(async () => {
    dispatch(
      setRequest({
        loading: true,
        message: "Cargando usuario",
      })
    );

    const { success, user, error, message } = await getUser();
    if (success && user) {
      const newUser: IUser = {
        id: user.idUsuario,
        name: user.nombre,
        lastname: user.apellido,
        email: user.correo,
        hierarchy: user.rol,
      };
      return dispatch(setUser(newUser));
    }

    if (!success) {
      const notification = {
        id: uuid(),
        title: "Error al obtener usuario",
        message: message ?? error ?? "Error al obtener usuario",
        type: "error" as "success" | "error",
        autoDismiss: 5000,
      };
      dispatch(newNotification(notification));
      dispatch(logout());
      localStorage.removeItem("token-parkud");
    }

    return dispatch(
      setRequest({
        loading: false,
        message: "",
      })
    );
  }, [dispatch]);

  const LogOut = useCallback(async () => {
    dispatch(
      setRequest({
        loading: true,
        message: "Cerrando sesión",
      })
    );
    resetRequest();

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
    UpdatePassword,
    GetUser,
  };
};

export { useAuth };
