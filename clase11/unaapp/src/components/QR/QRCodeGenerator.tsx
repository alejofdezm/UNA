import React, { useState, useEffect, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  IonCard,  
  IonCardContent, 
  IonItem, 
  IonLabel, 
  IonSelect, 
  IonSelectOption, 
  IonSpinner, 
  IonText 
} from '@ionic/react';
import { useAuth } from '../../contexts/authContext';

 
const intervalOptions = [
  { label: '20 segundos', value: 20 },
  { label: '1 minuto', value: 60 },
  { label: '5 minutos', value: 300 },
  { label: '15 minutos', value: 900 },
  { label: '25 minutos', value: 1500 },
];
  const QRCodeGenerator: React.FC = () => {
  const { user } = useAuth();  
  const [qrData, setQrData] = useState<string>(''); 
  const [selectedInterval, setSelectedInterval] = useState<number>(intervalOptions[0].value);
  const [currentTimerId, setCurrentTimerId] = useState<NodeJS.Timeout | null>(null);
 

  useEffect(() => {
    
    if (currentTimerId) {
      clearInterval(currentTimerId);
    }

    if (user && user?.email) {
      const generateQR = () => {
        const timestamp = Date.now();
        const dataToEncode = JSON.stringify({
          userId: user.uid, 
          email: user.email, 
          timestamp: timestamp, 
          selectedInterval: selectedInterval, 
        });
        setQrData(dataToEncode);
        console.log(`QR Regenerated at ${new Date(timestamp).toLocaleTimeString()}:`, dataToEncode);
      };

      generateQR(); 

      const timerId = setInterval(generateQR, selectedInterval * 1000);
      setCurrentTimerId(timerId);
    } else {
      setQrData('');  
    } 
    return () => {
      if (currentTimerId) {
        clearInterval(currentTimerId);
      }
    };
  }, [user, selectedInterval]); 
 
  if (!user?.uid) {
    return (
      <IonCard className="rounded-lg shadow-xl">
        <IonCardContent className="ion-text-center ion-padding">
          <IonText color="medium">
            <p>Por favor, inicia sesión para generar tu código QR.</p>
          </IonText>
        </IonCardContent>
      </IonCard>
    );
  }

  // Si hay un usuario pero aún no se han cargado los datos (currentUser podría ser null brevemente)
  if (!user) {
     return (
      <IonCard className="rounded-lg shadow-xl">
        <IonCardContent className="ion-text-center ion-padding">
          <IonSpinner name="crescent" />
          <p>Cargando datos de usuario...</p>
        </IonCardContent>
      </IonCard>
    );
  }
 
  const renderQRCodeUI = () => <><IonItem>
  <IonLabel>Intervalo</IonLabel>
  <IonSelect
    value={selectedInterval}
    onIonChange={(e) => setSelectedInterval(parseInt(e.detail.value, 10))}
    placeholder='Selecciona el intervalo'
  >
    {intervalOptions.map(option => (
      <IonSelectOption key={option.value} value={option.value}>
        {option.label}
      </IonSelectOption>
    ))}
  </IonSelect>
</IonItem>

    <IonCard className="rounded-lg shadow-xl m-4"> 
           

        {qrData ? (
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-inner">
              <QRCodeSVG value={qrData} size={256} level="H" />
            <p className="mt-3 text-xs text-gray-500 break-all">
              Datos: {qrData}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Se regenera cada: {intervalOptions.find(opt => opt.value === selectedInterval)?.label || `${selectedInterval}s`}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
            <IonSpinner name="dots" color="primary" />
            <p className="mt-2 text-gray-600">Generando QR...</p>
          </div>
        )} 
    </IonCard></>

  return (
    <> 
    {renderQRCodeUI()}
   </>
  );
};

export default QRCodeGenerator;