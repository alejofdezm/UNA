
import React ,{useState, useEffect} from "react";
import { IonContent,IonCol,IonRow,IonInput,IonButton } from "@ionic/react";

export const Saludar = () => {

    const [nombre, setNombre] = useState<string>('');

useEffect(() => {

    console.log('Hola ' + nombre);

}, [nombre]);

return (
    <IonContent>
        <IonRow>
        <IonCol sizeSm="2" sizeXs="6">
             <IonInput placeholder="Escribe tu nombre"  onIonChange={(e) => setNombre(e.detail.value!)}>
                </IonInput>   
        </IonCol>
        <IonCol sizeSm="6" sizeXs="6">
            <IonButton onClick={()=>{alert(`Hola: ${nombre}`)}}>Saludar</IonButton>
        </IonCol>
        <IonCol sizeSm="4" sizeXs="12">

        </IonCol>
        </IonRow>
    </IonContent>
);

};
 //export default Saludar;