import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { ellipseOutline, homeOutline, triangle } from "ionicons/icons";
import { useAuth } from "../../contexts/authContext";


export const MenuLoggedIn = () => {
  const { user } = useAuth();
  return (
    <IonTabBar slot='bottom'>
      <IonTabButton tab='home' href='/'>
        <IonIcon aria-hidden='true' icon={homeOutline} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab='tab2' href='/tab2'>
        <IonIcon aria-hidden='true' icon={ellipseOutline} />
        <IonLabel>Perfil</IonLabel>
      </IonTabButton>
      {['admin'].includes(user?.rol || "") && (
      <IonTabButton tab='tab3' href='/tab3'>
        <IonIcon aria-hidden='true' icon={triangle} />
        <IonLabel>Tab 3</IonLabel>
      </IonTabButton>
      )}
    </IonTabBar>
  );
};
