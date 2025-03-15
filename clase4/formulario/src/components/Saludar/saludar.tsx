import React , {useState, useEffect} from "react";
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar , IonInput} from "@ionic/react";

export const Saludar = () => { 



const [nombre, setNombre] = useState('');
const h = `hola ${nombre}`;
    return (

        <IonContent fullscreen>
            <IonInput placeholder="Nombre a saludas" onIonChange={(e) => setNombre(e.detail.value || "")} />
           
            <IonButton onClick={() => alert(`Hola ${nombre}`)}>Saludar</IonButton>
        </IonContent> 
    );
    }