import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './App.css';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { FirebaseProvider } from './context/FirebaseContext.jsx';
import { GameProvider } from './context/GameContext.jsx';
import "./i18n";

// Substitua pelo seu ID de medição do Google Analytics 4
const GA_MEASUREMENT_ID = 'G-5N3WGMEJGK';

// Função para carregar o script do Google Analytics e configurar o gtag
const loadGoogleAnalytics = () => {
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  };
};

const PageViewTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

loadGoogleAnalytics(); // Carrega e configura o Google Analytics

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
