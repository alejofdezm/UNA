import React, { useEffect, useRef, useState } from "react";

// --- INICIO: ESTILOS CSS EMBEBIDOS ---
// Se mueven los estilos aquí para evitar errores de importación en el entorno de previsualización.
const styles = `
  .map-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .map-element {
    width: 100%;
    height: 100%;
  }
  .map-overlay-status {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.85);
    z-index: 10;
    backdrop-filter: blur(2px);
  }
  .map-overlay-status.error {
    background-color: rgba(255, 240, 240, 0.9);
  }
  .map-overlay-controls {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    padding: 8px 16px;
    width: 90%;
    max-width: 400px;
  }
  .radius-item {
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #333;
  }
  .radius-item label {
    white-space: nowrap;
  }
  .radius-item input[type="range"] {
    width: 100%;
    accent-color: #3880ff;
  }
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #3880ff;
    animation: spin 1s ease infinite;
    margin-bottom: 16px;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
// --- FIN: ESTILOS CSS EMBEBIDOS ---


// Interfaz para las canchas (sin cambios)
interface FavoriteCourt {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
}

// Función para cargar el script de Google Maps de forma dinámica
const loadGoogleMapsScript = (apiKey: string, callback: () => void) => {
  const existingScript = document.getElementById('googleMapsScript');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps`;
    script.id = 'googleMapsScript';
    document.body.appendChild(script);
    script.onload = () => {
      callback();
    };
  } else {
    callback();
  }
};


const MapaCanchas: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  
  // Usamos Refs para los objetos del mapa para poder manipularlos directamente.
  const circleRef = useRef<google.maps.Circle | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  // Estados para el Debouncing del slider
  const [radiusKm, setRadiusKm] = useState(5);
  const [debouncedRadiusKm, setDebouncedRadiusKm] = useState(radiusKm);

  // Estados de datos y carga
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [favoriteCourts, setFavoriteCourts] = useState<FavoriteCourt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Efecto para cargar los datos y la API de Google Maps
  useEffect(() => {
    loadGoogleMapsScript(apiKey, () => {
      setMapApiLoaded(true);
    });

    setTimeout(() => {
      setUserLocation({ lat: 9.9358, lng: -84.1039 }); // San José, Costa Rica
    }, 1000);

    setTimeout(() => {
      const dummyCourts: FavoriteCourt[] = [
        { id: 'c1', name: 'Canchas Polideportivo Aranjuez', location: { lat: 9.9413, lng: -84.0694 } },
        { id: 'c2', name: 'Plaza de Deportes Cleto González Víquez', location: { lat: 9.9236, lng: -84.0817 } },
        { id: 'c3', name: 'Canchas de Tenis La Sabana', location: { lat: 9.9350, lng: -84.1012 } },
        { id: 'c4', name: 'Centro Deportivo de Hatillo', location: { lat: 9.9145, lng: -84.1001 } },
      ];
      setFavoriteCourts(dummyCourts);
    }, 1500);
  }, [apiKey]);
  
  // Efecto para el "Debounce" del slider
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedRadiusKm(radiusKm);
    }, 300);
    return () => clearTimeout(handler);
  }, [radiusKm]);

  // Efecto para la CREACIÓN del mapa y MARCadores
  useEffect(() => {
    if (!mapApiLoaded || !userLocation || favoriteCourts.length === 0 || mapInstanceRef.current) {
      return;
    }
    if (!mapRef.current) return;

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 12,
        disableDefaultUI: true,
        styles: [ { "featureType": "poi", "stylers": [ { "visibility": "off" } ] } ]
      });
      mapInstanceRef.current = map;

      // Limpia marcadores anteriores
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Crea marcadores de las canchas
      favoriteCourts.forEach(cancha => {
        const marker = new window.google.maps.Marker({
          position: cancha.location,
          map: map,
          title: cancha.name,
        });
        markersRef.current.push(marker);
      });
      
      // Crea marcador del usuario
      const userMarker = new window.google.maps.Marker({
        position: userLocation,
        map: map,
        title: "Tu Ubicación (Simulada)",
        icon: {
            url: "https://mt.google.com/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png",
            scaledSize: new window.google.maps.Size(32, 32)
        }
      });
      markersRef.current.push(userMarker);

      setLoading(false); // Deja de mostrar el spinner principal

    } catch (e: any) {
      console.error("Error al crear el mapa:", e);
      setError(e.message);
      setLoading(false);
    }
  }, [mapApiLoaded, userLocation, favoriteCourts]);

  // Efecto para la ACTUALIZACIÓN del círculo
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !userLocation) return;

    // Borra el círculo anterior
    if (circleRef.current) {
      circleRef.current.setMap(null);
    }

    // Dibuja el nuevo círculo
    circleRef.current = new window.google.maps.Circle({
      map: map,
      center: userLocation,
      radius: debouncedRadiusKm * 1000,
      strokeColor: '#3880ff',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#3880ff',
      fillOpacity: 0.2,
    });
  }, [debouncedRadiusKm, userLocation]);

  return (
    <>
      <style>{styles}</style>
      <div className="map-container">
        <div ref={mapRef} className="map-element" />

        {loading && (
          <div className="map-overlay-status">
            <div className="spinner"></div>
            <span>Cargando mapa...</span>
          </div>
        )}

        {error && (
          <div className="map-overlay-status error">
            <span style={{ color: 'red' }}>Error: {error}</span>
          </div>
        )}

        {!loading && !error && (
          <div className="map-overlay-controls">
            <div className="radius-item">
              <label htmlFor="radius-range">
                Radio: <strong>{radiusKm} km</strong>
              </label>
              <input
                id="radius-range"
                type="range"
                min="1"
                max="20"
                value={radiusKm}
                onChange={e => setRadiusKm(parseInt(e.target.value, 10))}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MapaCanchas;
