import { useState } from 'react';
import './App.css';
import Home from './Pages/Home';
import DisasterCard from './Components/DisasterCard';
import Navbar from './Components/Navbar';
import Login from './Pages/Login'

function App() {

  return (
    <>
      <Navbar/>
      <Home/>
    </>
  )
}

export default App
