import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// Components
import { MapsSkeleton } from ".";
import { ILocation } from "../../interfaces";

interface Props {
  open: (idSede: number) => void;
  zoom?: number;
  locations: ILocation[];
}

const Maps = ({ open, zoom = 14, locations }: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const center = useMemo(() => ({ lat: 4.7335073, lng: -74.034314 }), []);

  if (!isLoaded) return <MapsSkeleton />;

  return (
    <GoogleMap zoom={zoom} center={center} mapContainerClassName="parkud__map">
      {locations.map(({ idSede, lat, lng }, i) => (
        <Marker key={i} onClick={() => open(idSede)} position={{ lat, lng }} />
      ))}
    </GoogleMap>
  );
};

export { Maps };
