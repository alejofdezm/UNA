import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import TopicSubscription from "../components/notification/TopicSubscription";
import AppHeader from "../components/head/AppHeader";

const Notificaciones: React.FC = () => {
  return (
    <IonPage>
       <AppHeader title='Suscribir a Tema' showMenuButton={true} /> 
       
        <TopicSubscription /> 
    </IonPage>
  );
};

export default Notificaciones;
