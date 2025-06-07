import React, { useState, useEffect } from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonText,
} from '@ionic/react';
import { timeOutline } from 'ionicons/icons';

import { Device } from '@capacitor/device';

const SimpleClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [deviceId, setDeviceId] = useState<string | null>(null);
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);    
    return () => {
      clearInterval(timerId);
    };
  }, []); 

   useEffect(() => {
    const getDeviceId = async () => {
      try {
        const idInfo = await Device.getId();
        setDeviceId(idInfo.identifier || "Desconocido");
      } catch (error) {
        console.error("Error al obtener el ID del dispositivo:", error);
        setDeviceId("Error al obtener ID");
      }  
    };

    getDeviceId();
  }, []);

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const CargarDatosDelServicio = () => <>
   <IonCard style={{ margin: '20px auto', maxWidth: '350px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <IonCardHeader style={{ background: 'var(--ion-color-light)', borderBottom: '1px solid var(--ion-color-medium-tint)', display: 'flex', 
                                alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
        <IonIcon icon={timeOutline} color="primary" style={{ fontSize: '1.8em', marginRight: '10px' }} />
        <IonCardTitle style={{ color: 'var(--ion-color-primary)', fontWeight: 'bold', fontSize: '1.4em', margin: '0' }}>
          Mi servicio - <b>{deviceId}</b>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent style={{ padding: '25px', textAlign: 'center' }}>
        <IonText color="dark" style={{ fontSize: '3em', fontWeight: '500', letterSpacing: '0.05em', display: 'block' }}>
          {formatTime(currentTime)}
        </IonText>
      </IonCardContent>
    </IonCard></>

  return (<CargarDatosDelServicio />);
};

export default SimpleClock;