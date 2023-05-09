import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useAppDispatch } from "../redux";
import { resetRequest, setRequest } from "../../reducers";

// Services
import { logIn } from "../../services";

// Interfaces
import { ILogin } from "../../interfaces";

/**
 * @description Este hook administra el estado de la autenticación - administra el estado status
 * @returns { status, LogIn, LogOut, };
 */

const useAuth = () => {
  const [status, setStatus] = useState({
    error: false,
    message: "",
    twoFactor: false,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const LogIn = useCallback(async (loginData: ILogin) => {
    setStatus({ error: false, message: "", twoFactor: false });
    const { success, error, message } = await logIn(loginData);

    // if (success && user && token) {
    //   localStorage.setItem("token-parkud", token);
    //   dispatch(setUser(user));
    //   return navigate("/home");
    // }

    if (success) {
      setStatus({
        error: false,
        message:
          message ??
          "Se ha enviado un correo de verificación, por favor revisa tu bandeja de entrada ",
        twoFactor: true,
      });
    }

    setStatus({
      error: true,
      message: error ?? "Error al iniciar sesión",
      twoFactor: false,
    });
  }, []);

  const LogOut = useCallback(async () => {
    dispatch(
      setRequest({
        loading: true,
        fullscreen: true,
        action: "Cerrando sesión",
      })
    );
    setStatus({ error: false, message: "", twoFactor: false });

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
  };
};

export { useAuth };
