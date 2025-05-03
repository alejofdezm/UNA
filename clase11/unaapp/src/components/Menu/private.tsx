import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { ellipseOutline, homeOutline, triangle } from "ionicons/icons";

export const MenuLoggedIn = () => {
  return (
    <IonTabBar slot='bottom'>
      <IonTabButton tab='home' href='/'>
        <IonIcon aria-hidden='true' icon={homeOutline} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab='notificaciones' href='/notificaciones'>
        <IonIcon aria-hidden='true' icon={triangle} />
        <IonLabel>Notificaciones</IonLabel>
      </IonTabButton>
      <IonTabButton tab='perfil' href='/perfil'>
        <IonIcon aria-hidden='true' icon={ellipseOutline} />
        <IonLabel>Perfil</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};
