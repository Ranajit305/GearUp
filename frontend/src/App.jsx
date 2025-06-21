import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { useAuthStore } from './stores/useAuthStore'
import AddProduct from './pages/AddProduct'

const App = () => {
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/add' element={user ? <AddProduct /> : <Navigate to='/'/>} />
      </Routes>
    </div>
  )
}

export default App