import React, { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText,
  isPlatform,
} from '@ionic/react';
import { locateOutline, checkmarkCircleOutline, warningOutline } from 'ionicons/icons';
import { Geolocation, Position } from '@capacitor/geolocation';

const ElegantLocationDisplay: React.FC = () => {
  const [position, setPosition] = useState<Position | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentPosition = async () => {
    setIsLoading(true);
    setError(null);
    setPosition(null);

    try {
      if (!isPlatform('capacitor')) {
        console.warn("Capacitor Geolocation no está disponible. Usando datos simulados.");
        setTimeout(() => {
          setPosition({
            timestamp: Date.now(),
            coords: {
              latitude: 10.0000,
              longitude: -84.0000,
              accuracy: 50,
              altitudeAccuracy: null,
              altitude: null,
              speed: null,
              heading: null,
            },
          });
          setIsLoading(false);
        }, 1500);
        return;
      }

      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });
      setPosition(coordinates);
    } catch (e: any) {
      console.error("Error al obtener la ubicación", e);
      let errorMessage = "No se pudo obtener la ubicación.";
      if (e.message && e.message.toLowerCase().includes('permission denied')) {
        errorMessage = "Permiso de ubicación denegado.";
      } else if (e.message && e.message.toLowerCase().includes('location unavailable')) {
        errorMessage = "Ubicación no disponible en el dispositivo.";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <IonSpinner name="crescent" color="primary" style={{ transform: 'scale(1.5)' }} />
            <p style={{ marginTop: '10px', color: 'var(--ion-color-medium)' }}>Obteniendo coordenadas...</p>
          </div>
        )}

        {error && !isLoading && (
          <IonItem lines="none" style={{ '--background': 'var(--ion-color-danger-tint)', borderRadius: '8px', marginBottom: '20px', padding: '10px' }}>
            <IonIcon icon={warningOutline} slot="start" color="danger" style={{ marginRight: '10px', fontSize: '1.5em' }} />
            <IonLabel color="danger" style={{ whiteSpace: 'normal', fontWeight: '500' }}>
              {error}
            </IonLabel>
          </IonItem>
        )}

        {position && !isLoading && !error && (
          <>
            <IonItem lines="full" style={{ '--min-height': '50px', marginBottom: '10px' }}>
              <IonLabel color="medium" style={{ fontWeight: '500' }}>Latitud:</IonLabel>
              <IonText color="dark" slot="end" style={{ fontSize: '1.1em', fontWeight: 'bold' }}>
                {position.coords.latitude.toFixed(5)}
              </IonText>
            </IonItem>
            <IonItem lines="full" style={{ '--min-height': '50px', marginBottom: '15px' }}>
              <IonLabel color="medium" style={{ fontWeight: '500' }}>Longitud:</IonLabel>
              <IonText color="dark" slot="end" style={{ fontSize: '1.1em', fontWeight: 'bold' }}>
                {position.coords.longitude.toFixed(5)}
              </IonText>
            </IonItem>
            <IonItem lines="none" style={{ marginTop: '10px' }}>
                <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" style={{ marginRight: '8px' }}/>
                <IonLabel color="medium" style={{ fontSize: '0.9em'}}>
                    Precisión: {position.coords.accuracy.toFixed(1)} metros
                </IonLabel>
            </IonItem>
          </>
        )}

        {!isLoading && (
          <IonButton
            expand="block"
            onClick={getCurrentPosition}
            style={{ marginTop: '25px', '--border-radius': '8px', '--box-shadow': '0 2px 6px rgba(0,0,0,0.15)' }}
            color="primary"
          >
            <IonIcon slot="start" icon={locateOutline} />
            {position ? 'Actualizar Ubicación' : 'Obtener Ubicación'}
          </IonButton>
        )}
      </> 
  );
};

export default ElegantLocationDisplay;