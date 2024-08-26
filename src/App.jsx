import { Route, Routes } from 'react-router-dom'
import './App.css'
import Highscores from './pages/Highscores'
import PageBasic from './pages/PageBasic'
import Game from './pages/Game'
import NotFound from './pages/NotFound';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PageBasic />} >
          <Route index element={<Game />} />
          <Route path='/game' element={<Game />} />
          <Route path='/highscores' element={<Highscores />} />
          <Route path="*" element={<NotFound />} />
          </Route>
          </Routes>
    </>
  )
}
export default App
