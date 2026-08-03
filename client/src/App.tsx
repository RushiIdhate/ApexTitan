import { Routes, Route } from 'react-router-dom'
import './style/App.css'
import AdminLayout from './layouts/AdminLayout'
import LoginForm from './components/forms/LoginForm'
import RegisterForm from './components/forms/RegisterForm'
import ProtectedRoute from './route/ProtectedRoute'

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='*' element={<AdminLayout />} />
        </Route>
          
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </>
  )
}

export default App
