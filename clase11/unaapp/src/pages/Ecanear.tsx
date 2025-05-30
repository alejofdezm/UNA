import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

import AppHeader from "../components/head/AppHeader"; 
import QRCodeValidator from "../components/QR/QRCodeValidator";

const Ecanear: React.FC = () => {
  return (
    <IonPage>
      <AppHeader title='Home - Notifaciones' showMenuButton={true} />
      
      <QRCodeValidator /> 
    </IonPage>
  );
};

export default Ecanear;
