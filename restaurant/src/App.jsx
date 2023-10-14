import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './screens/dashboard/Dashboard'
import Menu from './screens/menu/Menu'
import Orders from './screens/orders/Orders'

const App = () => {
  return (
    <>
    <h1>Hello</h1>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/orders' element={<Orders />} />
    </Routes>
    </>
  )
}

export default App