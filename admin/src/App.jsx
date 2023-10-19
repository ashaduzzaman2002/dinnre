import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './screens/Dashboard/Dashboard'
import Signin from './screens/Signin/Signin'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/signin' element={<Signin />} />
    </Routes>
    </>
  )
}

export default App