import { useEffect, useState } from "react";

// React Router DOM
import { useParams } from "react-router-dom";

// Services
import { getSede } from "../../services";
import { SedeSkeleton } from ".";

const Sede = () => {
  const { idSede } = useParams<{ idSede: string }>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSede(Number(idSede)).then((sede) => {
      setLoading(false);
      console.log(sede);
    });
  }, [idSede]);

  if (loading) return <SedeSkeleton />;

  return <div>Soy sede {idSede} </div>;
};

export { Sede };
