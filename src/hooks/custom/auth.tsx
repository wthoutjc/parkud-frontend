import { useCallback, useState } from "react";

// Redux
import { useAppDispatch } from "../redux";
import { resetRequest, setRequest } from "../../reducers";

// Services
// import { logoutService } from "../../services";

interface LoginProps {
  username: string;
  password: string;
}

/**
 * @description Este hook administra el estado de la autenticación - administra el estado status
 * @returns {boolean} status
 */

const useAuth = () => {
  const [status, setStatus] = useState({
    error: false,
    message: "",
  });

  const dispatch = useAppDispatch();

  const LogIn = useCallback(
    async ({ username, password }: LoginProps) => {
      console.log(username, password);
      dispatch(
        setRequest({
          loading: true,
          fullscreen: false,
          action: "Iniciando sesión",
        })
      );
      setStatus({ error: false, message: "" });

      // const res = await signIn("credentials", {
      //   username,
      //   password,
      //   redirect: false,
      // });

      // if (res) {
      //   dispatch(resetRequest());
      //   if (res.ok) return console.log("reload");
      //   setStatus({
      //     error: true,
      //     message: "Usuario o contraseña incorrectos",
      //   });
      // }
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
    setStatus({ error: false, message: "" });

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
    return console.log("reload");
  }, [dispatch]);

  return {
    status,
    LogIn,
    LogOut,
  };
};

export { useAuth };
