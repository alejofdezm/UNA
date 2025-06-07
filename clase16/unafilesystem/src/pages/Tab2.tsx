import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, 
  IonButton, IonList, IonItem, IonLabel, IonItemSliding, 
  IonItemOptions, IonItemOption, IonIcon, 
  useIonAlert
} from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import { useDatabase, Tarea } from '../hooks/useDatabase';

const Tab2: React.FC = () => {
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [tareas, setTareas] = useState<Tarea[]>([]);

   const [presentAlert] = useIonAlert();
  const { getTareas, agregarTarea, eliminarTarea, actualizarTarea } = useDatabase();

  
  useEffect(() => {
    cargarTareas();
  }, []);

   
  const cargarTareas = async () => {
    const todasLasTareas = await getTareas();
    setTareas(todasLasTareas);
  };

  
  const handleAgregarTarea = async () => {
    if (nuevaTarea.trim().length === 0) return;
    await agregarTarea(nuevaTarea);
    setNuevaTarea('');    
    await cargarTareas();
  };

  
   const handleEditarTarea = (tarea: Tarea) => {
    presentAlert({
      header: 'Editar Tarea',
      inputs: [
        {
          name: 'nuevoNombre',
          type: 'text',
          value: tarea.nombre, // Pre-rellenamos con el nombre actual
          placeholder: 'Nuevo nombre de la tarea',
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (data.nuevoNombre.trim().length === 0) return;
            // Llamamos a la función de la DB y luego refrescamos la lista
            await actualizarTarea(tarea.id, data.nuevoNombre);
            await cargarTareas();
          },
        },
      ],
    });
  };

  
  const handleEliminarTarea = async (id: number) => {
    await eliminarTarea(id);  
    await cargarTareas();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>TODO List con SQLite</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ padding: '10px' }}>
          <IonInput
            value={nuevaTarea}
            placeholder="Escribe una nueva tarea"
            onIonChange={(e) => setNuevaTarea(e.detail.value!)}
          />
          <IonButton expand="block" onClick={handleAgregarTarea}>
            Agregar Tarea
          </IonButton>
        </div>

        <IonList>
          {tareas.map((tarea) => (
            <IonItemSliding key={tarea.id}>
              <IonItem>
                <IonLabel>{tarea.nombre}</IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                   <IonItemOption color="primary" onClick={() => handleEditarTarea(tarea)}>
                  <IonIcon slot="icon-only" icon={pencil} />
                </IonItemOption>
                <IonItemOption color="danger" onClick={() => handleEliminarTarea(tarea.id)}>
                  <IonIcon slot="icon-only" icon={trash} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;