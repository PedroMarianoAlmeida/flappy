import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseProvider } from './context/FirebaseContext.jsx'
import { GameProvider } from './context/GameContext.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter >
      <GameProvider>
        <FirebaseProvider>
          <App />
        </FirebaseProvider>
      </GameProvider>
    </BrowserRouter>
  </StrictMode>,
)
