
import { RouterProvider } from 'react-router-dom'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { router } from './routes'
import './assets/config.css'
import { ToastContainer } from 'react-toastify';
function App() {
  

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  )
}

export default App
