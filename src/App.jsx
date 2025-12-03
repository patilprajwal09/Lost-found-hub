import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Addfounditem from './pages/addFoundItem.jsx';
import Addlostitem from './pages/addLostItem.jsx';



function App() {
 

  return (
    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path='/' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/addFoundItem' element={<Addfounditem/>} />
      <Route path='/addLostItem' element={<Addlostitem/>} />
     </Routes>
  )
}

export default App
