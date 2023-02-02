import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Game from './pages/Game'
import Homepage from './pages/Homepage'
import Lobby from './pages/Lobby'
import ProtectedRoute from './pages/ProtectedRoute'
import GameProtectedRoute from './pages/GameProtectedRoute'
import {AuthProvider} from './hooks/useAuth'
import {globalCss} from './stitches.config'
import './index.css'
import RedirectToLobby from './pages/RedirectToLobby'
import Page404 from './pages/404'

const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    '@import': [
      'url("https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap")',
    ],
    fontFamily: 'Luckiest Guy, cursive',
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<RedirectToLobby />}>
            <Route path="/" element={<Homepage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="lobby" element={<Lobby />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="game/:id" element={<Game />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
