import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// Components
import { MapsSkeleton } from "../../components";
import { Paper } from "@mui/material";

interface Props {
  setLocation: (location: { lat: number; lng: number } | undefined) => void;
  location?: { lat: number; lng: number };
}

const SelectLocation = ({ location, setLocation }: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  const center = useMemo(() => ({ lat: 4.7335073, lng: -74.034314 }), []);

  if (!isLoaded) return <MapsSkeleton />;

  return (
    <Paper elevation={10}>
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerClassName="parkud__map"
        onClick={(e) => e.latLng && setLocation(e.latLng.toJSON())}
      >
        {location && location.lat && location.lng && (
          <Marker position={location} />
        )}
      </GoogleMap>
    </Paper>
  );
};

export { SelectLocation };
