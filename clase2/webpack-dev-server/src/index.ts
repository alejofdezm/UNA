
import {saludar} from '../localModules/moduloParaSaludar';   

function initApp(): void {
    const appDiv = document.getElementById('app');
    if (appDiv) {
      appDiv.innerHTML = '<p>¡Hola! Esta es una aplicación sencilla con Webpack, TypeScript usando  webpack-dev-server. nuevo cambio</p>';
    }
  }
  
  // Llamada a la función de inicialización
  initApp();
  
   