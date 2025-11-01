import appRouter from './router/AppRouter.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <RouterProvider router={appRouter} />
)
