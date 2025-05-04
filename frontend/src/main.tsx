import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Profile from './pages/Profile.tsx'
import Notfound from './pages/Notfound.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/profile/:github_user' element={<Profile />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
        <div className="layer-blur"></div>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
