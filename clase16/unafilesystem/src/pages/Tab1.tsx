import React, { useState } from 'react';
import { 
  IonContent, IonPage, IonInput, IonItem, IonLabel, IonToggle, 
  IonButton, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent 
} from '@ionic/react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [username, setUsername] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loadedData, setLoadedData] = useState('');

  const saveSettings = async () => {
    try {
      const settings = {
        user: username,
        theme: darkMode ? 'dark' : 'light',
      };

      await Filesystem.writeFile({
        path: 'settings.json',
        data: JSON.stringify(settings),
        directory: Directory.Data, 
        encoding: Encoding.UTF8,
      });

      alert('¡Preferencias guardadas!');

    } catch (e) {
      console.error('No se pudo guardar el archivo', e);
      alert('Error al guardar preferencias.');
    }
  };

  const loadSettings = async () => {
    try {
      const file = await Filesystem.readFile({
        path: 'settings.json',
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });

      const settings = JSON.parse(file.data as string);

      // Actualizamos el estado de la UI con los datos cargados
      setUsername(settings.user);
      setDarkMode(settings.theme === 'dark');

      // Mostramos el JSON crudo en el área de texto
      setLoadedData(JSON.stringify(settings, null, 2));

    } catch (e) {
      console.error('No se pudo leer el archivo', e);
      alert('No se encontraron preferencias guardadas.');
      setLoadedData('');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Demo de Filesystem</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Nombre de Usuario</IonLabel>
              <IonInput value={username} onIonChange={e => { setUsername(e.detail.value!);  }} />
            </IonItem>
            <IonItem>
              <IonLabel>Modo Oscuro</IonLabel>
              <IonToggle checked={darkMode} onIonChange={e => setDarkMode(e.detail.checked)} />
            </IonItem>
            <IonButton expand="block" onClick={saveSettings}>
              Guardar Preferencias
            </IonButton>
            {/* AQUÍ ESTÁ LA CORRECCIÓN */}
            <IonButton expand="block" color="secondary" onClick={loadSettings}>
              Cargar Preferencias
            </IonButton>
          </IonCardContent>
        </IonCard>
        
        {loadedData && (
          <IonCard>
            <IonCardContent>
              <IonLabel>Datos Cargados:</IonLabel>
              <pre>{loadedData}</pre>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;