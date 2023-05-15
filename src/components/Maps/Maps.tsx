import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// Components
import { MapsSkeleton } from ".";

interface Props {
  open: () => void;
}

const Maps = ({ open }: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const center = useMemo(() => ({ lat: 4.7335073, lng: -74.034314 }), []);

  if (!isLoaded) return <MapsSkeleton />;

  return (
    <GoogleMap zoom={14} center={center} mapContainerClassName="parkud__map">
      <Marker onClick={open} position={center} />
      <Marker onClick={open} position={center} />
      <Marker onClick={open} position={center} />
    </GoogleMap>
  );
};

export { Maps };
