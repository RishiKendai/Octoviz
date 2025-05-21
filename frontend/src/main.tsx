import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import Profile from './pages/Profile.tsx'
import Notfound from './pages/Notfound.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { initGA } from './analytics';
import Layout from './Layout.tsx';

initGA();


// Layout component moved to Layout.tsx

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "/profile/:github_user",
        element: <Profile />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ]
  },
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <div className="layer-wrapper">
        <div className="layer-blur"></div>
      </div>
      <Toaster position='bottom-left' />
    </QueryClientProvider>
  </StrictMode>,
)
