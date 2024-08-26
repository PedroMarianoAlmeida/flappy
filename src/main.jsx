import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './App.css';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { FirebaseProvider } from './context/FirebaseContext.jsx';
import { GameProvider } from './context/GameContext.jsx';
import "./i18n";
import ReactGA from 'react-ga4';

// Substitua pelo seu ID de medição do Google Analytics 4
const GA_MEASUREMENT_ID = 'G-5N3WGMEJGK';

// Inicialize o Google Analytics
ReactGA.initialize(GA_MEASUREMENT_ID);

// Função para enviar visualização de página
const PageViewTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search, title: document.title });
  }, [location]);

  return null;
};

// Enviar um evento personalizado (descomente e ajuste conforme necessário)
// const sendCustomEvent = () => {
//   ReactGA.event({
//     category: 'Category Name',
//     action: 'Action Name',
//     label: 'Label Name', // opcional
//     value: 99, // opcional, deve ser um número
//     nonInteraction: true, // opcional, true/false
//     transport: 'xhr', // opcional, 'beacon', 'xhr' ou 'image'
//   });
// };

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GameProvider>
        <FirebaseProvider>
          <PageViewTracker />
          <App />
        </FirebaseProvider>
      </GameProvider>
    </BrowserRouter>
  </StrictMode>,
);
