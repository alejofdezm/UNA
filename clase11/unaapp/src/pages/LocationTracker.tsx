import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import LocationTrackerComponent from "../components/location/locationTracker";
import "../theme/location/tracker.css";
import AppHeader from "../components/head/AppHeader";

const LocationTracker: React.FC = () => {
  return (
    <IonPage>
    
      <AppHeader title='Location Tracker' showMenuButton={true} /> 
      
      <IonContent fullscreen>
    <LocationTrackerComponent />
        
      </IonContent>
    </IonPage>
  );
};

export default LocationTracker;
