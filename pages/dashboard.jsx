import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";
import SideBar from "../components/layouts/sideBar";
import { markers } from "../lib/data";

export default function Page() {
  const libraries = useMemo(() => ["places"], []);

  const mapCenter = useMemo(() => ({ lat: -0.609559, lng: 35.7354353 }), []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA0PO4lopgu3pLhFhgptyByuG9jAQQDsuM",
    libraries: libraries,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  if (!isLoaded) return;

  const handleMarkerClick = (marker) => {};

  const handleMarkerHover = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex h-48 w-1/4 flex-col p-4"></div>
      <div className="flex-1">
        <GoogleMap
          zoom={14}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.HYBRID}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {markers.map((marker, index) => (
            <MarkerF
              key={index}
              position={marker.position}
              title={marker.title}
              onClick={() => handleMarkerClick(marker)}
              onMouseOver={() => handleMarkerHover(marker)}
              onMouseOut={() => handleInfoWindowClose}
            >
              {selectedMarker === marker && (
                <InfoWindow onCloseClick={handleInfoWindowClose}>
                  <div>
                    <p>{marker.title}</p>
                  </div>
                </InfoWindow>
              )}
            </MarkerF>
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}

Page.layout = SideBar;
Page.auth = true;
