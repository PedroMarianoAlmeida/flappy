import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './App.css';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { FirebaseProvider } from './context/FirebaseContext.jsx';
import { GameProvider } from './context/GameContext.jsx';
import "./i18n";
import { GA4React } from 'react-ga4';

// Substitua pelo seu ID de medição do Google Analytics 4
const ga4react = new GA4React('G-5N3WGMEJGK'); 

const PageViewTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (ga4react.ga) {
      ga4react.pageview(location.pathname + location.search);
    }
  }, [location]);

  return null;
};

// Inicialize o Google Analytics
ga4react.initialize().then(() => {
  console.log('GA4 Initialized');
}).catch((err) => {
  console.error('GA4 Initialization Error:', err);
});

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
