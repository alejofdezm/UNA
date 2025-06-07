import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

import AppHeader from "../components/head/AppHeader";
import FirebaseStatus from "../components/cargarServicio";
import Acelerometro from "../components/acelerometro";
import BarCode from "../components/barCode/barCode";
import CapturaFotoPage from "../components/capturarFotos/CapturaFoto";
import QRCodeGenerator from "../components/QR/QRCodeGenerator";

import SimpleClock from "../components/SimpleClock";

const Home: React.FC = () => {
  return (
    <IonPage>
      <AppHeader title='Home - Notifaciones' showMenuButton={true} />
      <SimpleClock />
      <QRCodeGenerator />
      <CapturaFotoPage />
      <BarCode />
      <Acelerometro />
      <FirebaseStatus />
    </IonPage>
  );
};

export default Home;
