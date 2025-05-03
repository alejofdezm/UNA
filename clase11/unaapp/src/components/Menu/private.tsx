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
      {["admin"].includes(user?.rol || "") && (
        <IonTabButton tab='notificaciones' href='/notificaciones'>
          <IonIcon aria-hidden='true' icon={triangle} />
          <IonLabel>Notificaciones</IonLabel>
        </IonTabButton>
      )}
      {["admin", "user"].includes(user?.rol || "") && (
        <IonTabButton tab='perfil' href='/perfil'>
          <IonIcon aria-hidden='true' icon={ellipseOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      )}
    </IonTabBar>
  );
};
