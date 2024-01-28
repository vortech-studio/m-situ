import { useMemo } from "react";
import SideBar from "../components/layouts/sideBar";
import { useLoadScript, GoogleMap } from "@react-google-maps/api";

export default function Page() {
  const libraries = useMemo(() => ["places"], []);

  const mapCenter = useMemo(() => ({ lat: -0.609559, lng: 35.7354353 }), []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA0PO4lopgu3pLhFhgptyByuG9jAQQDsuM",
    libraries: libraries,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-screen w-full">
      <GoogleMap
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.HYBRID}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={() => console.log("Map Component Loaded...")}
      />
    </div>
  );
}

Page.layout = SideBar;
Page.auth = true;
