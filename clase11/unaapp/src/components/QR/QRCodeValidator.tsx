import React, { useState } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { IonButton, IonCard, IonCardContent, IonText } from '@ionic/react';

interface QRData {
  userId: string;
  email: string;
  timestamp: number;
  selectedInterval: number; 
}

const QRCodeValidator: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [valid, setValid] = useState<boolean | null>(null);
  const [VALID_DURATION_MS, setValidDuration] = useState<number>(60 * 1000); // 1 minuto
 // const VALID_DURATION_MS = 60 * 1000; // 1 minuto

  const startScan = async () => {
    try { 
      await BarcodeScanner.checkPermission({ force: true }); 
      BarcodeScanner.hideBackground();

      setScanning(true);

      const result = await BarcodeScanner.startScan();  

      if (result.hasContent) {
        const raw = result.content || '';
        const data: QRData = JSON.parse(raw);
        const now = Date.now();
        const elapsed = now - data.timestamp;
        setValidDuration(data.selectedInterval || 50); 

        setResult(`QR de ${data.email}, generado hace ${Math.floor(elapsed / 1000)} segundos`);
        setValid(elapsed < VALID_DURATION_MS);
      } else {
        setResult('No se detectó contenido válido.');
        setValid(null);
      }
    } catch (err) {
      console.error('Error escaneando:', err);
      setResult('Error al escanear.');
      setValid(null);
    } finally {
      setScanning(false);
      BarcodeScanner.showBackground();
      await BarcodeScanner.stopScan();
    }
  };

  return (
    <IonCard className="rounded-lg shadow-xl m-4">
      <IonCardContent className="ion-text-center">
        <h2>Validador de QR</h2>
        <IonButton onClick={startScan} disabled={scanning}>
          {scanning ? 'Escaneando...' : 'Iniciar Escaneo'}
        </IonButton>

        {result && <IonText color={valid ? 'success' : 'danger'}><p>{result}</p></IonText>}
        {valid === false && <IonText color="warning"><p>❌ QR Expirado</p></IonText>}
        {valid === true && <IonText color="success"><p>✅ QR Válido</p></IonText>}
      </IonCardContent>
    </IonCard>
  );
};

export default QRCodeValidator;
