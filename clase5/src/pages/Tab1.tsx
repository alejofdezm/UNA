import React , {useState, useEffect} from 'react';
import { IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import Detalle from '../components/Producto/Detalle';
import { obtenerProducto } from '../constantes/producto';
const Tab1: React.FC = () => {
   
  const [producto, setProducto] = useState<any>(null);
  const [idProducto, setIdProducto] = useState<number>(-1);

  useEffect(() => {
      obtenerProducto(idProducto).then(data => setProducto(data));
  }, [idProducto]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
          <IonInput value={idProducto} onIonChange={(e) => setIdProducto(parseInt(e.detail.value!))}></IonInput>
         <Detalle   title={producto?.title || "hola mundo"} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
