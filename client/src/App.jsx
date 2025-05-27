import React from 'react'
import { Route,Routes } from 'react-router'
import Auth from './pages/Auth.jsx'
import Home from './pages/Home.jsx'
function App(){


  

  return (
    <div>

      <Routes>
        <Route path="/" element= {<Auth />} />
        <Route path="/home" element= {<Home />} />
      </Routes>
    
     
    </div>

  )
}

export default App