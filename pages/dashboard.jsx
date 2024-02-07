import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import SideBar from "../components/layouts/sideBar";
import { markers } from "../lib/data";
import { useRouter } from "next/router";
import { getAlerts } from "../services/devices";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [devices, setDevices] = useState([]);
  const libraries = useMemo(() => ["places"], []);

  const mapCenter = useMemo(() => ({ lat: -1.2505813, lng: 36.8465876 }), []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA0PO4lopgu3pLhFhgptyByuG9jAQQDsuM",
    libraries: libraries,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (device) => {
    router.push({
      pathname: "/devices/[id]",
      query: {
        id: device.id,
      },
    });
  };

  const handleMarkerHover = (device) => {
    setSelectedMarker(device);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  useEffect(() => {
    if (!isLoaded) return;
    setLoading(true);
    getAlerts()
      .then((data) => {
        setAlerts(data.alerts);
        setDevices(data.devices);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [isLoaded]);

  if (!isLoaded) return null;
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="w-96 space-y-2 p-4">
          <h2 className="text-xl font-bold text-primary">Alerts</h2>
          <div className="space-y-4">
            {alerts.map((alert, i) => (
              <div key={i}>
                <div className="w-full rounded border border-slate-100 p-4 shadow-md">
                  <p className="font-semibold text-blue-800">
                    {alert.id} Device
                  </p>
                  <h3>{alert.timestamp.toDate().toLocaleString()}</h3>
                  <p>{alert.sensor_type}</p>
                  <p>{alert.sensor_value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-full grow pb-12">
          <GoogleMap
            zoom={14}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.HYBRID}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            {devices.map((device, index) => (
              <MarkerF
                key={index}
                position={device.position}
                title={device.name}
                onClick={() => handleMarkerClick(device)}
                onMouseOver={() => handleMarkerHover(device)}
                onMouseOut={handleInfoWindowClose}
              >
                {selectedMarker === device && (
                  <InfoWindow onCloseClick={handleInfoWindowClose}>
                    <div>
                      <p>{device.name}</p>
                    </div>
                  </InfoWindow>
                )}
              </MarkerF>
            ))}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}

Page.layout = SideBar;
Page.auth = true;
