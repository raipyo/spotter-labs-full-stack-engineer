import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Map({ route }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!route) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [121.0, 14.6],
      zoom: 6
    });

    map.on("load", () => {

        const pickupRoute = route.to_pickup.geometry;
        const dropoffRoute = route.to_dropoff.geometry;

        map.addSource("pickup-route", {
            type: "geojson",
            data: {
            type: "Feature",
            geometry: pickupRoute
            }
        });

        map.addLayer({
            id: "pickupLine",
            type: "line",
            source: "pickup-route",
            paint: {
            "line-color": "blue",
            "line-width": 4
            }
        });

        map.addSource("dropoff-route", {
            type: "geojson",
            data: {
            type: "Feature",
            geometry: dropoffRoute
            }
        });

        map.addLayer({
            id: "dropoffLine",
            type: "line",
            source: "dropoff-route",
            paint: {
            "line-color": "green",
            "line-width": 4
            }
        });
    });

    return () => map.remove();
  }, [route]);

  return <div ref={mapContainer} style={{ height: 400, width: "100%" }} />;
}