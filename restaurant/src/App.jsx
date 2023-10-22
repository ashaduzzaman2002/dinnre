import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './screens/dashboard/Dashboard'
import Menu from './screens/menu/Menu'
import Orders from './screens/orders/Orders'
import Register from './screens/Auth/Register'
import Login from './screens/Auth/Login'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/signup' element={<Register />} />
      <Route path='/signin' element={<Login />} />
    </Routes>
    </>
  )
}

export default App